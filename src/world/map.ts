import type { MapSource } from "@/engine/types";
import { LANDMARKS, LEGEND, SPAWN_CHAR } from "./tileset";

/**
 * Hong Kong, 60x56 tiles. Kowloon to the north, Victoria Harbour across the
 * middle, Hong Kong Island to the south, joined by the pier you walk across.
 *
 * One character is one tile; see LEGEND in tileset.ts. Digits 1-5 are the
 * landmark shopfronts, '@' is where the player starts. Every row must be
 * exactly 60 characters -- the parser and map.test.ts both enforce it.
 */
const ART = [
  "GGGGGGGGGGG.GGGGGGGGGGGGGG.GGGGGGGGGGGGGGGGGG.GGGGGGGGGGGGGG",
  "WWWWWWWWWWW.MMMMMMMMMMMMMM.WWWWWWWWWWWWWWWWWW.MMMMMMMMMMMMMM",
  "KKKKKKKKKKK.NNNNNNNNNNNNNN.KKKKKKKKKKKKKKKKKK.NNNNNNNNNNNNNN",
  "............................................................",
  "GGGGG.XXXXXX.GGGGGGGGGGGGG.XXXXXX.GGGGGGGGGGGGG.XXXXXX.GGGGG",
  "WWWWW.XXXXXX.MMMMMMMMMMMMM.XXXXXX.WWWWWWWWWWWWW.XXXXXX.MMMMM",
  "KKKaK.XXXXXX.NNNNNNNNNNNNN.XXXXXX.KKKKaKKKKKKaK.XXXXXX.NNNNN",
  "KKKKK.XXXXXX.NNNNNNNNNNNNN.XXXXXX.KKKKKKKKKKKKK.XXXXXX.NNNNN",
  "KKKKK.XXXXXX.NNNNNNNNNNNNN.XXXXXX.KKKKLKKKKKKKK.XXXXXX.NNNNN",
  "KKKKK.XXXXXX.NNNNNNNNNNNNN.XXXXXX.KKKKKKKKKKKKK.XXXXXX.NNNNN",
  "KKKKK.XXXXXX.NNNNNNNNNNNNN.XXXXXX.KKKKKKKKKKKKK.XXXXXX.NNNNN",
  "KKKKK.XXX3XX.NNNNNNNNNNNNN.XXX4XX.KKKKKKKKKKKKK.XXX5XX.NNNNN",
  "....l.............................l.....................l...",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "============================================================",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "............................................................",
  "GGGGGGGGGGGGGGGGGG.GGGGGGGGGGGGGGGGGGGG.GGGGGGGGGGGGGGGGGGGG",
  "MMMMMMMMMMMMMMMMMM.WWWWWWWWWWWWWWWWWWWW.MMMMMMMMMMMMMMMMMMMM",
  "NNNNNNNNNNNNNNNNNN.KKKKKKKKKKKKKKKKKKKK.NNNNNNNNNNNNNNNNNNNN",
  "NNNNNNNNNNNNNNNNNN.KKKKKKKKKKKKKKKKKKKK.NNNNNNNNNNNNNNNNNNNN",
  "NNNNNNNNNNNNNNNNNN.KKKKKKKKKKKKKKKKKKKK.NNNNNNNNNNNNNNNNNNNN",
  "..h.....................................h...............h...",
  "......v.............U..u..U..u..U..u........v.......v.......",
  ".............................@..............................",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~w,,,,~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "~~~w~~~~~~~~~~~~~~~~~~~~~~~~,,,,~~~~w~~~~~~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~w~~~~~~~~~~~~~~~,,,,~~~~~~~~~~~~~w~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~~~~w~~~~~~,,,,~~~~~~~~~~~~~~~~~~~~~~w~~~~~",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~,,,,~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "~~~~~~w~~~~~~~~~~~~~~~~~~~~~,,,,~~~~~~~w~~~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~w~~~~~~~~~~~~,,,,~~~~~~~~~~~~~~~~w~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~~~~~~~w~~~,,,,~~~~~~~~~~~~~~~~~~~~~~~~~w~~",
  "..............v...................................v.........",
  "............................................................",
  "......l...................l.................l...........l...",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "============================================================",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "....m.............................m...................m.....",
  "GGGGGGGGGGGGG.XXXXXX.GGGGGGGGGGGGGGGGGG.XXXXXX.GGGGGGGGGGGGG",
  "BBBBBBBBBBBBB.XXXXXX.bbbbbbbbbbbbbbbbbb.XXXXXX.BBBBBBBBBBBBB",
  "BBBBBBBBBBBBB.XXXXXX.bbbbbbbbbbbbbbbbbb.XXXXXX.BBBBBBBBBBBBB",
  "BBBBBBBBBBBBB.XXXXXX.bbbbbbbbbbbbbbbbbb.XXXXXX.BBBBBBBBBBBBB",
  "BBBBBBBBBBBBB.XXXXXX.bbbbbbbbbbbbbbbbbb.XXXXXX.BBBBBBBBBBBBB",
  "BBBBBBBBBBBBB.XXXXXX.bbbbbbbbbbbbbbbbbb.XXXXXX.BBBBBBBBBBBBB",
  "BBBBBBBBBBBBB.XXXXXX.bbbbbbbbbbbbbbbbbb.XXXXXX.BBBBBBBBBBBBB",
  "BBBBBBBBBBBBB.XXX1XX.bbbbbbbbbbbbbbbbbb.XXX2XX.BBBBBBBBBBBBB",
  "............................................................",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "============================================================",
  "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
  "..................f...........................f.............",
  "GGGGGGGGGGG.........ggggggggggggggggggggggggg...GGGGGGGGGGGG",
  "MMMMMMMMMMM.........ggggggggggggggggggggggggg...MMMMMMMMMMMM",
  "NNNNNNNNNNN.........ggggggggggggggggggggggggg...NNNNNNNNNNNN",
].join("\n");

export const HONG_KONG: MapSource = {
  art: ART,
  legend: LEGEND,
  landmarks: LANDMARKS,
  spawnChar: SPAWN_CHAR,
};

export const MAP_W = 60;
export const MAP_H = 56;
