import { clampCamera } from "./camera";
import { Input } from "./input";
import { facedTile, initMove, tickMove, renderOffset, type MoveState } from "./grid";
import { landmarkAt, parseMap } from "./mapParser";
import { Renderer, type Assets } from "./renderer";
import type { MapSource, ParsedMap } from "./types";
import { SCALE, TILE } from "@/world/tileset";
import { STRUCT_H } from "@/world/structures";

/** Simulation step. Fixed so speed does not vary with refresh rate. */
const STEP_MS = 1000 / 60;
/** Guard against the huge dt a backgrounded tab produces. */
const MAX_FRAME_MS = 250;

export interface EngineOptions {
  onPrompt?: (key: string | null) => void;
  onOpen?: (key: string) => void;
  /** Fired when the player lands on a new tile. Drives the minimap. */
  onMove?: (x: number, y: number) => void;
  /** Landmark key -> short label drawn on the sign above the building. */
  signs?: Record<string, string>;
  signFont?: string;
}

export class Engine {
  readonly map: ParsedMap;
  private ctx: CanvasRenderingContext2D;
  private renderer: Renderer;
  private input: Input;
  private move: MoveState;
  private stepCount = 0;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private paused = false;
  private prompt: string | null = null;

  constructor(
    private canvas: HTMLCanvasElement,
    assets: Assets,
    source: MapSource,
    private opts: EngineOptions = {},
  ) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2d canvas context unavailable");
    this.ctx = ctx;
    this.map = parseMap(source);
    this.renderer = new Renderer(ctx, assets, this.map);
    this.move = initMove(this.map.spawn.x, this.map.spawn.y, "down");
    this.input = new Input(() => this.interact(), () => this.opts.onOpen && void 0);
  }

  /** Inspect movement and input state. Used by tests and dev debugging. */
  debugState() {
    return { move: this.move, pressed: this.input.direction, paused: this.paused };
  }

  /** Place the player next to a landmark, for ?panel= deep links. */
  placeAt(key: string) {
    const l = this.map.landmarks.find((m) => m.key === key);
    if (!l) return;
    for (const [dx, dy, facing] of [
      [0, 1, "up"], [0, -1, "down"], [1, 0, "left"], [-1, 0, "right"],
    ] as const) {
      const x = l.x + dx;
      const y = l.y + dy;
      if (x >= 0 && y >= 0 && x < this.map.width && y < this.map.height && !this.map.solid[y][x]) {
        this.move = initMove(x, y, facing);
        return;
      }
    }
  }

  start() {
    this.opts.onMove?.(this.move.x, this.move.y);
    this.input.attach(window);
    this.last = performance.now();
    this.loop(this.last);
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.input.detach();
  }

  /** Called while a panel is open: the world freezes and stops eating keys. */
  setPaused(paused: boolean) {
    this.paused = paused;
    if (paused) this.input.suspend();
  }

  private interact() {
    if (this.paused) return;
    const { x, y } = facedTile(this.move);
    const l = landmarkAt(this.map, x, y);
    if (l) this.opts.onOpen?.(l.key);
  }

  private loop = (now: number) => {
    this.raf = requestAnimationFrame(this.loop);
    const frameMs = Math.min(now - this.last, MAX_FRAME_MS);
    this.last = now;

    if (!this.paused) {
      this.acc += frameMs;
      while (this.acc >= STEP_MS) {
        this.acc -= STEP_MS;
        const before = this.move.progress;
        this.move = tickMove(
          this.move,
          this.input.direction,
          this.input.running,
          STEP_MS,
          (x, y) => x >= 0 && y >= 0 && x < this.map.width && y < this.map.height
            && !this.map.solid[y][x],
        );
        if (before !== null && this.move.progress === null) {
          this.stepCount++;
          this.opts.onMove?.(this.move.x, this.move.y);
        }
      }
      this.updatePrompt();
    }

    this.render();
  };

  private updatePrompt() {
    const { x, y } = facedTile(this.move);
    const key = landmarkAt(this.map, x, y)?.key ?? null;
    if (key !== this.prompt) {
      this.prompt = key;
      this.opts.onPrompt?.(key);
    }
  }

  private render() {
    const dpr = window.devicePixelRatio || 1;
    const cssW = this.canvas.clientWidth;
    const cssH = this.canvas.clientHeight;
    const w = Math.round(cssW * dpr);
    const h = Math.round(cssH * dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }

    const viewW = cssW / SCALE;
    const viewH = cssH / SCALE;
    const [px, py] = renderOffset(this.move, TILE);
    const cam = clampCamera(
      px + TILE / 2, py + TILE / 2, viewW, viewH,
      this.map.width * TILE, this.map.height * TILE,
    );

    const ctx = this.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#1d2b3a";
    ctx.fillRect(0, 0, w, h);
    ctx.setTransform(dpr * SCALE, 0, 0, dpr * SCALE, -cam.x * dpr * SCALE, -cam.y * dpr * SCALE);

    this.renderer.draw(cam, viewW, viewH, this.move, this.stepCount);
    this.drawSigns();
  }

  /** Small labelled boards above each shopfront, so the map is self-explaining. */
  private drawSigns() {
    const signs = this.opts.signs;
    if (!signs) return;
    const ctx = this.ctx;
    ctx.font = `6px ${this.opts.signFont ?? "monospace"}`;
    ctx.textBaseline = "middle";
    for (const l of this.map.landmarks) {
      const label = signs[l.key];
      if (!label) continue;
      const w = ctx.measureText(label).width + 8;
      const x = l.x * TILE + TILE / 2 - w / 2;
      const y = (l.y + 1 - STRUCT_H) * TILE - 14;
      ctx.fillStyle = "#f8f4e6";
      ctx.fillRect(x, y, w, 11);
      ctx.fillStyle = "#3b4a63";
      ctx.fillRect(x, y, w, 1);
      ctx.fillRect(x, y + 10, w, 1);
      ctx.fillRect(x, y, 1, 11);
      ctx.fillRect(x + w - 1, y, 1, 11);
      ctx.fillStyle = "#3b4a63";
      ctx.fillText(label, x + 4, y + 6);
    }
  }
}

export async function loadAssets(): Promise<Assets> {
  const load = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`failed to load ${src}`));
      img.src = src;
    });
  const [sheet, character, landmarks] = await Promise.all([
    load("/assets/tileset.png"),
    load("/assets/character.png"),
    load("/assets/landmarks.png"),
  ]);
  return { sheet, character, landmarks };
}
