import type { MapSource } from "@/engine/types";
import { LANDMARKS, LEGEND, SPAWN_CHAR } from "./tileset";

/**
 * Hong Kong, 60x44 tiles. Kowloon to the north, Victoria Harbour across the
 * middle, Hong Kong Island to the south, joined by the pier you walk across.
 *
 * One character is one tile; see LEGEND in tileset.ts. Digits 1-5 are the
 * landmark shopfronts, '@' is where the player starts. Every row must be
 * exactly 60 characters -- the parser and map.test.ts both enforce it.
 */
const ART = [
  "GGGGGGG.GGGGGGr=rGGGGGGGG.GGGGGGGGGGG.r=rGGGGGGG.GGGGGGGGGGG",
  "WWWWWWW.MMMMMMr=rWWWWWWWW.MMMMMMMMMMM.r=rWWWWWWW.WWWWWWWWWWW",
  "KKKKKKK.NNNNNNr=rKKKKKKKK.NNNNNNNNNNN.r=rKKKKKKK.KKKKKKKKKKK",
  "KKaKKxK.NNNNNNr=rKKKaKKKK.NNNNNNNNNNN.r=rKKKaKKK.KaKKKKqaKKK",
  "KKKKL3K.NNNNNNr=rKKKKKLKK.NNNNNNNNNNN.r=rKKKKKKK.LKKKKK5KKLK",
  "..............r=r.....................r=r...................",
  "rrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrr",
  "==============zzz=====================zzz===================",
  "rrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrr",
  "..............r=r.....................r=r...................",
  "GGGGGGGGGGGGG.r=rGGGGGGGGGG.GGGGGGGGG.r=rGGGGGGGGGGG.GGGGGGG",
  "MMMMMMMMMMMMM.r=rWWWWWWWWWW.MMMMMMMMM.r=rWWWWWWWWWWW.MMMMMMM",
  "NNNNNNNNNNNNN.r=rKKKKKKKKKK.NNNNNpNNN.r=rKKKKKKKKKKK.NNNNNNN",
  "NNNNNNNNNNNNN.r=rKKKKKKKKKK.NNNNN4NNN.r=rKKKKKKKKKKK.NNNNNNN",
  "..h...............................h.....................h...",
  "......v.............U..u..U..u..U..u........v.....v.........",
  ".............................@..............................",
  "~~~~~~~~~~~~~~~~~~~~~w~~~~~~,,,,~~~~~~~~~~~~~~~~~~~~~~w~~~~~",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~,,,,~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "~~~~~~w~~~~~~~~~~~~~~~~~~~~~,,,,~~~~~~~w~~~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~w~~~~~~~~~~~~,,,,~~~~~~~~~~~~~~~~w~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~~~~~~~w~~~,,,,~~~~~~~~~~~~~~~~~~~~~~~~~w~~",
  "w~~~~~~~~~~~~~~~~~~~~~~~~~~~,,,,~w~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~w~~~~~~~~~~~~~~~~~~,,,,~~~~~~~~~~w~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~w~~~~~~~~~,,,,~~~~~~~~~~~~~~~~~~~w~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~w,,,,~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "..........r=r.v...............................v.r=r.........",
  "..........r=r...................................r=r.........",
  "....l.....r=r.......l.............l.........l...r=r.....l...",
  "rrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrr",
  "==========zzz===================================zzz=========",
  "rrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrr",
  "......m...r=r.............m...............m.....r=r.........",
  "GGGGGGGGG.r=r.GGGGGGGGGG.GGGGGGGGGGG.GGGGGGGGGG.r=r.GGGGGGGG",
  "BBBBBBBBB.r=r.bbbbbbbbbb.BBBBBBBBBBB.bbbbbbbbbb.r=r.BBBBBBBB",
  "BBBBBBBBB.r=r.bbbbbbbbbb.BBBBBBBBBBB.bbbbbbbbbb.r=r.BBBBBBBB",
  "BBBBBBBBB.r=r.bbbbbbbbbb.BBBBByBBBBB.bbbbbbbbbb.r=r.BBBBqBBB",
  "BBBBBBBBB.r=r.bbbbbbbbbb.BBBBB1BBBBB.bbbbbbbbbb.r=r.BBBB2BBB",
  "..........r=r...f.......................f.......r=r...f.....",
  "rrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrr",
  "==========zzz===================================zzz=========",
  "rrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrr",
  "GGGGGGGGG.r=r.......ggggggggggggggggggggggggg...r=r.GGGGGGGG",
  "MMMMMMMMM.r=r.......ggggggggggggggggggggggggg...r=r.MMMMMMMM",
].join("\n");

export const HONG_KONG: MapSource = {
  art: ART,
  legend: LEGEND,
  landmarks: LANDMARKS,
  spawnChar: SPAWN_CHAR,
};

export const MAP_W = 60;
export const MAP_H = 44;
