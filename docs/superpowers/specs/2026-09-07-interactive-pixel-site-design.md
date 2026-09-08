# Interactive Pixel-Art Personal Site — Design

Date: 2026-09-07
Repo: danielk927/doyoonkim.dev (public)

## Goal

A personal website you navigate by walking a 2D pixel-art character with WASD or
arrow keys. Five islands hold the content: Experience, Education, Projects,
About + Contact, Misc. Notes. Standing next to an object and pressing `E` opens a
panel with the real content.

Success criteria:

1. A visitor lands, sees a character, and moves it with WASD/arrows without being told.
2. Every island is reachable on foot from the spawn island.
3. Every content section from the resume is readable in-game and on `/plain`.
4. Phones get `/plain`, a clean static resume page, not a broken canvas.
5. Movement stays at the same speed on a 60Hz and a 144Hz display.

## Non-goals

No NPCs, quests, inventory, save state, combat, audio, minimap, or multiplayer.
This is a walking sim over a resume. Adding any of the above is a new request.

## Architecture

Next.js static export deployed to Vercel. A single `<canvas>` runs a hand-written
engine. React does not re-render per frame: the engine is a plain class that emits
events (`promptChanged`, `openPanel`, `roomChanged`) which React subscribes to for
overlay UI only.

```
src/
  engine/     Engine.ts input.ts physics.ts camera.ts renderer.ts mapParser.ts types.ts
  world/      rooms/*.ts  tileset.ts
  content/    experience.ts education.ts projects.ts about.ts notes.ts
  components/ GameCanvas.tsx Panel.tsx Prompt.tsx PlainPage.tsx
  app/        page.tsx  plain/page.tsx
public/assets/  tileset.png character.png
```

### Rooms as ASCII

Rooms are authored as template strings, not in a map editor. A legend in
`world/tileset.ts` maps each character to a tile index and a `solid` flag.

```
#########################
#..T....~~~~~~~~....T...#
#.......~~~~~~~~........#
#...[work1]......[work2]#
####........####..#######
```

`#` wall, `.` grass, `~` water, `T` tree, `[key]` an interactable bound to a
content entry by key. Rationale: readable in a diff, editable without tooling,
~40-line parser. Rejected Tiled + `.tmj` as an external editor for five small rooms.

### Engine

- Tiles 16px, drawn at 3x scale, `image-rendering: pixelated`.
- `requestAnimationFrame` with a fixed-timestep accumulator so speed is
  refresh-rate independent.
- Collision: axis-separated AABB (resolve X, then Y) to avoid corner sticking.
  Player hitbox is a foot-box, ~1 tile wide and 3/4 tall, so the character can
  overlap the tops of objects.
- Camera follows the player, clamped to room bounds; centers when the room is
  smaller than the viewport.
- Input: WASD + arrows to move, `E`/`Space` to interact, `Esc` to close a panel.
- Interaction: each frame, nearest interactable within radius wins; a floating
  prompt renders above it.
- Transitions: bridge tiles link to a `(room, spawnPoint)` pair. Fade out, swap
  room, fade in.
- Sprites: 4-directional walk cycle, 4 frames, ~8fps, idle frame when still.

## Content: one source, two renderers

All copy lives once in `src/content/*.ts`. Two consumers read it: the in-game
overlay panels, and `/plain`, a static scrollable resume page.

`/plain` is what phones get, what `<noscript>` points to, and what search and AI
crawlers can read — canvas content is invisible to all of them. A single data
module keeps the two from drifting.

Opening a panel pushes `?panel=<key>` so a section is directly linkable. Loading
such a URL spawns the player in the matching room with the panel already open.

### Privacy

The source resume carries a phone number. It is deliberately excluded from the
repo and the site, which are public. Contact is email, LinkedIn, and GitHub.

## Art

Kenney 16x16 CC0 packs, no attribution required. First implementation step
verifies the pack contains the needed terrain tiles and a 4-direction character;
Sprout Lands is the fallback if not. Swapping tilesets touches `tileset.ts` and
two PNGs only.

## Mobile

Detected with `matchMedia('(pointer: coarse)')` plus a width check, not
user-agent sniffing. Coarse pointers render `PlainPage` instead of the canvas,
with a link to play anyway.

## Testing

Vitest over pure logic, written before implementation:

- ASCII map parser: dimensions, legend lookup, interactable extraction, ragged input.
- AABB resolution: axis separation, the corner case, wall sliding.
- Camera clamping: all four edges, and rooms smaller than the viewport.
- Proximity: nearest-wins, radius boundary.
- World integrity: every exit targets a room and spawn point that exist.

Rendering is verified in a browser, not unit-tested.
