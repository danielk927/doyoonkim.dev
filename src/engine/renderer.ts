import type { MoveState } from "./grid";
import { renderOffset } from "./grid";
import type { ParsedMap } from "./types";
import { FOAM, SHEET_COLS, TILE, WATER_TILES } from "@/world/tileset";
import { DOOR_COL, STRUCTURES, STRUCT_H, STRUCT_W, type Structure } from "@/world/structures";

const CH_W = 16;
const CH_H = 20;
const DIR_ROW = { down: 0, right: 1, up: 2, left: 3 } as const;

export interface Assets {
  sheet: HTMLImageElement;
  character: HTMLImageElement;
  landmarks: HTMLImageElement;
}

export class Renderer {
  /** Structures indexed by the row they stand on, so they draw in row order. */
  private byRow = new Map<number, Structure[]>();

  constructor(
    private ctx: CanvasRenderingContext2D,
    private assets: Assets,
    private map: ParsedMap,
  ) {
    for (const s of STRUCTURES) {
      const list = this.byRow.get(s.bottom) ?? [];
      list.push(s);
      this.byRow.set(s.bottom, list);
    }
  }

  private drawStructure(s: Structure) {
    this.ctx.drawImage(
      this.assets.landmarks,
      s.sprite * STRUCT_W * TILE, 0, STRUCT_W * TILE, STRUCT_H * TILE,
      s.x * TILE, (s.bottom + 1 - STRUCT_H) * TILE, STRUCT_W * TILE, STRUCT_H * TILE,
    );
  }

  private blit(index: number, x: number, y: number) {
    const sx = (index % SHEET_COLS) * TILE;
    const sy = Math.floor(index / SHEET_COLS) * TILE;
    this.ctx.drawImage(this.assets.sheet, sx, sy, TILE, TILE, x, y, TILE, TILE);
  }

  private isWater(x: number, y: number) {
    if (x < 0 || y < 0 || x >= this.map.width || y >= this.map.height) return true;
    return WATER_TILES.has(this.map.ground[y][x]);
  }

  /** Foam is drawn on the water side of any water/land boundary. */
  private shoreline(x: number, y: number) {
    if (!this.isWater(x, y)) return;
    const px = x * TILE;
    const py = y * TILE;
    if (!this.isWater(x, y - 1)) this.blit(FOAM.N, px, py);
    if (!this.isWater(x, y + 1)) this.blit(FOAM.S, px, py);
    if (!this.isWater(x - 1, y)) this.blit(FOAM.W, px, py);
    if (!this.isWater(x + 1, y)) this.blit(FOAM.E, px, py);
  }

  draw(
    cam: { x: number; y: number },
    viewW: number,
    viewH: number,
    player: MoveState,
    stepCount: number,
  ) {
    const { ctx, map } = this;
    const x0 = Math.max(0, Math.floor(cam.x / TILE));
    const y0 = Math.max(0, Math.floor(cam.y / TILE));
    const x1 = Math.min(map.width - 1, Math.ceil((cam.x + viewW) / TILE));
    const y1 = Math.min(map.height - 1, Math.ceil((cam.y + viewH) / TILE));

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        this.blit(map.ground[y][x], x * TILE, y * TILE);
        this.shoreline(x, y);
      }
    }

    const [px, py] = renderOffset(player, TILE);

    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const o = map.overlay[y][x];
        if (o !== null) this.blit(o, x * TILE, y * TILE);
      }
      for (const s of this.byRow.get(y) ?? []) this.drawStructure(s);
      // The player is drawn between overlay rows so tall props in front of it
      // occlude correctly, the way they do in a 3/4 top-down game.
      if (y === player.y) this.drawPlayer(px, py, player, stepCount);
    }
  }

  private drawPlayer(px: number, py: number, s: MoveState, stepCount: number) {
    const frame = s.progress === null ? 0 : stepCount % 2 === 0 ? 1 : 3;
    this.ctx.drawImage(
      this.assets.character,
      frame * CH_W,
      DIR_ROW[s.facing] * CH_H,
      CH_W,
      CH_H,
      px,
      py - (CH_H - TILE),
      CH_W,
      CH_H,
    );
  }
}
