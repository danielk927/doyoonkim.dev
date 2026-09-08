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
  "GGGGGGGGGGGGGGGGGGr=rGGGGGGGGGGGGGGGGGGGGr=rGGGGGGGGGGGGGGGG",
  "KKKKKKKKKKKKKKKKKKr=rKKKKKKKKKKKKKKKKKKKKr=rKKKKKKKKKKKKKKKK",
  "KKaKKLKKKaKKKKLKaKr=rKKLKKKKKKaKLKKKKaKKKr=raKKKKKLaKKKKKKaL",
  "KKKKKKKK3KKKKKKKKKr=rKKKKKKKKKKKKKKKKKKKKr=rKKKKKK5KKKKKKKKK",
  "................l.r=r.l.............l....r=r.l..............",
  "rrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrr",
  "==================zzz====================zzz================",
  "rrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrr",
  "........v.........rrr.........v..........rrr........v.......",
  "GGGGGGGGGGGGGGGGGGr=rGGGGGGGGGGGGGGGGGGGGr=rGGGGGGGGGGGGGGGG",
  "NNNNNNNNNNNNNNNNNNr=rNNNNNNNNNNNNNNNNNNNNr=rNNNNNNNNNNNNNNNN",
  "NNNNNNNNNNNNNNNNNNr=rNNNNNNNNNNNNNNNNNNNNr=rNNNNNNNNNNNNNNNN",
  "NNNNNNNNNNNNNNNNNNr=rNNNNNNNNN4NNNNNNNNNNr=rNNNNNNNNNNNNNNNN",
  "rrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrr",
  "==================zzz====================zzz================",
  "rrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrrrrrrr",
  "..........h.............S.s.S.s.S.h.S.............h.........",
  ".............................@..............................",
  "............................................................",
  "~~~~~~w~~~~~~~~~~~~~~w~~~~~~,,,,~~~~w~~~~~~~~~~~~~~w~~~~~~~~",
  "w~~~~~~~~~~~~~~w~~~~~~~~~~~~,,,,~~~~~~~~~~~~~w~~~~~~~~~~~~~~",
  "~~~~~~~~~w~~~~~~~~~~~~~~w~~~,,,,~~~~~~~w~~~~~~~~~~~~~~w~~~~~",
  "~~~w~~~~~~~~~~~~~~w~~~~~~~~~,,,,~w~~~~~~~~~~~~~~w~~~~~~~~~~~",
  "~~~~~~~~~~~~w~~~~~~~~~~~~~~w,,,,~~~~~~~~~~w~~~~~~~~~~~~~~w~~",
  "~~~~~~w~~~~~~~~~~~~~~w~~~~~~,,,,~~~~w~~~~~~~~~~~~~~w~~~~~~~~",
  "............r=r...............................r=r...........",
  "............r=r...............................r=r...........",
  "............r=r.l.....l.............l........lr=r...........",
  "rrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrr",
  "============zzz===============================zzz===========",
  "rrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrr",
  "......m.....r=r...........m.................m.r=r...........",
  "GGGGGGGGGGGGr=rGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGr=rGGGGGGGGGGG",
  "BBBBBBBBBBBBr=rBBBBBbbbbbbbbBBBBBBBBBBBBBBBBBBr=rBBBbbbbbbBB",
  "BBBBBBBBBBBBr=rBBBBBbbbbbbbbBBBBBBBBBBBBBBBBBBr=rBBBbbbbbbBB",
  "BBBBBBBBBBBBr=rBBBBBbbbbbbbbBBBBBBBBBBBBBBBBBBr=rBBBbbbbbbBB",
  "BBBBBBBBBBBBr=rBBBBBbbbb1bbbBBBBBBBBBBBBBBBBBBr=rBBBbb2bbbBB",
  "............r=r...............................r=r...........",
  "rrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrr",
  "============zzz===============================zzz===========",
  "rrrrrrrrrrrrzzzrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrzzzrrrrrrrrrrr",
  ".....f......r=r..........f....................r=r......f....",
  "GGGGGGGGGGGGr=rGGGGGGGGGGGGGGGgggggggggggggggGr=rGGGGGGGGGGG",
  "NNNNNNNNNNNNr=rNNNNNNNNNNNNNNNgggggggggggggggNr=rNNNNNNNNNNN",
].join("\n");

export const HONG_KONG: MapSource = {
  art: ART,
  legend: LEGEND,
  landmarks: LANDMARKS,
  spawnChar: SPAWN_CHAR,
};

export const MAP_W = 60;
export const MAP_H = 44;
