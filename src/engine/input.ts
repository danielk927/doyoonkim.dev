import type { Dir } from "./types";

const KEYS: Record<string, Dir> = {
  KeyW: "up", ArrowUp: "up",
  KeyS: "down", ArrowDown: "down",
  KeyA: "left", ArrowLeft: "left",
  KeyD: "right", ArrowRight: "right",
};

const INTERACT = new Set(["KeyE", "Space", "Enter"]);
const CANCEL = new Set(["Escape"]);

/**
 * Tracks held keys. The most recently pressed direction wins, so pressing a
 * second key without releasing the first turns immediately rather than
 * fighting over priority.
 */
export class Input {
  private held: Dir[] = [];
  running = false;
  private onInteract: () => void;
  private onCancel: () => void;
  private target: Window | null = null;

  constructor(onInteract: () => void, onCancel: () => void) {
    this.onInteract = onInteract;
    this.onCancel = onCancel;
  }

  get direction(): Dir | null {
    return this.held.length ? this.held[this.held.length - 1] : null;
  }

  private keydown = (e: KeyboardEvent) => {
    if (e.repeat) {
      if (KEYS[e.code]) e.preventDefault();
      return;
    }
    const dir = KEYS[e.code];
    if (dir) {
      e.preventDefault();
      if (!this.held.includes(dir)) this.held.push(dir);
      return;
    }
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") this.running = true;
    else if (INTERACT.has(e.code)) { e.preventDefault(); this.onInteract(); }
    else if (CANCEL.has(e.code)) this.onCancel();
  };

  private keyup = (e: KeyboardEvent) => {
    const dir = KEYS[e.code];
    if (dir) this.held = this.held.filter((d) => d !== dir);
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") this.running = false;
  };

  /** Held keys must be cleared on blur or the player walks off on their own. */
  private blur = () => { this.held = []; this.running = false; };

  attach(target: Window) {
    this.target = target;
    target.addEventListener("keydown", this.keydown);
    target.addEventListener("keyup", this.keyup);
    target.addEventListener("blur", this.blur);
  }

  detach() {
    this.target?.removeEventListener("keydown", this.keydown);
    this.target?.removeEventListener("keyup", this.keyup);
    this.target?.removeEventListener("blur", this.blur);
    this.target = null;
  }

  suspend() { this.blur(); }
}
