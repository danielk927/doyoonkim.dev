"""Build public/assets from assets-src.

Kenney's Roguelike Modern City (CC0) is the base. Three transforms move it
toward the Gen 4 DS look, then Hong Kong tiles and the player are generated:

  1. deoutline()      strip the hard black keylines Kenney puts on everything
  2. gen4_palette()   lift shadows, warm and enrich hues, keep greys neutral
  3. extra tiles      harbour water, foam shoreline, hanging neon signs
  4. character.png    Gen-4-proportioned walk cycle, 4 directions x 4 frames

Run: python3 scripts/build_assets.py
"""
from __future__ import annotations
import colorsys, collections
from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src" / "kenney_modern_city.png"
OUT = ROOT / "public" / "assets"
S = 16
CH_W, CH_H = 16, 20


# ---------------------------------------------------------------- gen 4 look

def deoutline(im: Image.Image, passes=2, thresh=72, min_bright=4) -> Image.Image:
    """Replace thin dark keylines with a darkened neighbour colour.

    A dark pixel only counts as an outline when most of its neighbourhood is
    bright. Without that test, large dark fills (asphalt) get eaten too.
    """
    for _ in range(passes):
        px = im.load()
        w, h = im.size
        isdark = lambda p: p[3] > 0 and sum(p[:3]) / 3 < thresh
        new = {}
        for y in range(h):
            for x in range(w):
                if not isdark(px[x, y]):
                    continue
                cand = collections.Counter()
                for dx in (-1, 0, 1):
                    for dy in (-1, 0, 1):
                        if dx == dy == 0:
                            continue
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < w and 0 <= ny < h:
                            p = px[nx, ny]
                            if p[3] > 0 and not isdark(p):
                                cand[p[:3]] += 1
                if sum(cand.values()) >= min_bright:
                    r, g, b = cand.most_common(1)[0][0]
                    new[(x, y)] = (int(r * .66), int(g * .66), int(b * .70), 255)
        for k, v in new.items():
            px[k] = v
    return im


WARM = (1.03, 1.00, 0.94)


def gen4_palette(im: Image.Image, hue_pull=0.10, sat=1.18, lift=0.10) -> Image.Image:
    """Warm, enrich and lift the palette. DS-era art is hazy, not inky."""
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if not a:
                continue
            hh, ss, vv = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            vv = lift + (1 - lift) * vv
            if ss < 0.14:
                # Near-neutral stays neutral. Saturating greys turns pavement mint.
                r, g, b = colorsys.hsv_to_rgb(hh, ss, vv)
                r, g, b = (min(1, c * k) for c, k in zip((r, g, b), WARM))
            else:
                hh = (hh + (0.09 - hh) * hue_pull) % 1.0
                r, g, b = colorsys.hsv_to_rgb(hh, min(1.0, ss * sat), vv)
            px[x, y] = (int(r * 255), int(g * 255), int(b * 255), a)
    return im


# ------------------------------------------------------------ hong kong tiles

WATER_DEEP = (0x2c, 0x5f, 0x8a)
WATER_LIT = (0x4a, 0x8c, 0xb8)
FOAM = (0xd8, 0xe4, 0xe8)


def water_tile(dashes) -> Image.Image:
    t = Image.new("RGBA", (S, S), (*WATER_DEEP, 255))
    px = t.load()
    for y, x0, ln in dashes:
        for x in range(x0, x0 + ln):
            px[x % S, y] = (*WATER_LIT, 255)
    return t


def foam_tile(side: str) -> Image.Image:
    """Transparent overlay for a water tile that touches land on `side`."""
    t = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    px = t.load()
    for i in range(S):
        run = 2 if (i // 3) % 2 == 0 else 1
        for d in range(run):
            if side == "N":
                px[i, d] = (*FOAM, 255)
            elif side == "S":
                px[i, S - 1 - d] = (*FOAM, 255)
            elif side == "W":
                px[d, i] = (*FOAM, 255)
            else:
                px[S - 1 - d, i] = (*FOAM, 255)
    return t


def neon_tile(body, glow, top: bool) -> Image.Image:
    """A hanging shop sign, the most Hong Kong thing on a street."""
    t = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    px = t.load()
    for y in range(0 if not top else 3, S):
        for x in range(2, 14):
            edge = x in (2, 13) or y in (3, S - 1)
            px[x, y] = (*(glow if edge else body), 255)
    for y in range(5, S - 2, 3):          # character strokes
        for x in range(5, 11):
            px[x, y] = (*FOAM, 255)
    if top:
        for x in (7, 8):
            for y in range(0, 3):
                px[x, y] = (0x50, 0x50, 0x58, 255)   # the pole it hangs from
    return t


# ------------------------------------------------------------------ character

P = {
    "H": (0x33, 0x26, 0x2b), "h": (0x4e, 0x39, 0x3a),
    "s": (0xf2, 0xc9, 0xa0), "S": (0xd0, 0x9c, 0x76),
    "e": (0x2b, 0x22, 0x26),
    "k": (0xe8, 0xbc, 0x92),
    "c": (0xd9, 0x4f, 0x3d), "C": (0xa8, 0x3a, 0x2c),
    "p": (0x4a, 0x5b, 0x7a), "b": (0x38, 0x2e, 0x2c),
    ".": None,
}

BODY_DOWN = [
    "................", "....HHHHHHHH....", "...HHhhhhhhHH...",
    "..HHhhhhhhhhHH..", "..HHhhhhhhhhHH..", "..HHssssssssHH..",
    "..HHssssssssHH..", "..HHseesseesHH..", "..HHssssssssHH..",
    "...HSssssssSH...", "....SSssssSS....", "...kcccccccck...",
    "...kcccccccck...", "...kcccccccck...", "....CCCCCCCC....",
    "....pppppppp....", "....pppppppp....",
]
BODY_UP = [
    "................", "....HHHHHHHH....", "...HHhhhhhhHH...",
    "..HHhhhhhhhhHH..", "..HHhhhhhhhhHH..", "..HHhhhhhhhhHH..",
    "..HHhhhhhhhhHH..", "..HHhhhhhhhhHH..", "..HHhhhhhhhhHH..",
    "...HHhhhhhhHH...", "....HHhhhhHH....", "...kcccccccck...",
    "...kcccccccck...", "...kcccccccck...", "....CCCCCCCC....",
    "....pppppppp....", "....pppppppp....",
]
BODY_RIGHT = [
    "................", "....HHHHHHHH....", "...HHhhhhhhHH...",
    "..HHhhhhhhhhHH..", "..HHhhhhhhhhhH..", "..HHhhhhssssH...",
    "..HHhhhssssss...", "..HHhhhseesss...", "..HHhhhssssss...",
    "...HHhhsssssS...", "....HHhssssS....", "....kccccccS....",
    "....kcccccck....", "....kcccccck....", ".....CCCCCC.....",
    ".....pppppp.....", ".....pppppp.....",
]

LEGS_FRONT = [
    ("....ppp..ppp....", "....bbb..bbb...."),
    ("...ppp....ppp...", "...bbb....bbb..."),
    ("....ppp..ppp....", "....bbb..bbb...."),
    ("...ppp....ppp...", "...bbb....bbb..."),
]
LEGS_SIDE = [
    (".....pppppp.....", ".....bbbbbb....."),
    ("....ppp..ppp....", "....bbb..bbb...."),
    (".....pppppp.....", ".....bbbbbb....."),
    ("...ppp..ppp.....", "...bbb..bbb....."),
]


def draw_grid(img, rows):
    px = img.load()
    for y, row in enumerate(rows):
        assert len(row) == CH_W, f"row {y}: {len(row)} px, want {CH_W}: {row!r}"
        for x, ch in enumerate(row):
            col = P[ch]
            if col:
                px[x, y] = (*col, 255)


def pose(body, legs, frame):
    rows = list(body)
    if frame % 2:                      # 1px bob on stride frames
        rows = rows[1:] + [rows[-1]]
    return rows + list(legs[frame])


def build_character() -> Image.Image:
    img = Image.new("RGBA", (CH_W * 4, CH_H * 4), (0, 0, 0, 0))
    dirs = [
        (BODY_DOWN, LEGS_FRONT, False),
        (BODY_RIGHT, LEGS_SIDE, False),
        (BODY_UP, LEGS_FRONT, False),
        (BODY_RIGHT, LEGS_SIDE, True),   # mirrored -> left
    ]
    for r, (body, legs, mirror) in enumerate(dirs):
        for f in range(4):
            cell = Image.new("RGBA", (CH_W, CH_H), (0, 0, 0, 0))
            draw_grid(cell, pose(body, legs, f))
            if mirror:
                cell = cell.transpose(Image.FLIP_LEFT_RIGHT)
            img.paste(cell, (f * CH_W, r * CH_H))
    return img


# =========================== iconic Hong Kong ============================
# Kenney has no Bank of China Tower. These are drawn from scratch in the same
# Gen 4 idiom as the player: flat fills, a darker shade on the shadow side,
# no black keylines. One 6x8-tile cell each.

LM_W, LM_H = 96, 128

C = {
    "white":   (0xe9, 0xee, 0xf2), "whiteSh": (0xc0, 0xcb, 0xd6),
    "glass":   (0x9d, 0xbd, 0xd4), "glassSh": (0x7a, 0x9a, 0xb4),
    "grey":    (0x8f, 0x9c, 0xa8), "greySh":  (0x63, 0x70, 0x7d),
    "brick":   (0xb5, 0x5a, 0x44), "brickSh": (0x8f, 0x43, 0x32),
    "cream":   (0xf0, 0xe2, 0xc8), "creamSh": (0xcd, 0xbd, 0xa2),
    "roof":    (0x3f, 0x7a, 0x63), "roofSh":  (0x2e, 0x5c, 0x4a),
    "gold":    (0xe8, 0xb5, 0x4a),
    "neonR":   (0xe0, 0x4a, 0x4a), "neonC": (0x46, 0xc8, 0xd8),
    "dark":    (0x3a, 0x33, 0x3e),
}


def _cell():
    return Image.new("RGBA", (LM_W, LM_H), (0, 0, 0, 0))


def bank_of_china():
    """Stepped prisms with the diagonal lattice, twin masts."""
    im = _cell()
    d = ImageDraw.Draw(im)
    tiers = [(14, 128, 82, 92), (21, 92, 75, 58), (28, 58, 68, 30)]
    for i, (x0, y0, x1, y1) in enumerate(tiers):
        mid = (x0 + x1) // 2
        d.rectangle([x0, y1, mid, y0], fill=C["white"])
        d.rectangle([mid, y1, x1, y0], fill=C["whiteSh"])
        band = 17
        y = y1
        while y < y0:
            d.line([(x0, y), (mid, min(y + band, y0))], fill=C["glassSh"])
            d.line([(mid, min(y + band, y0)), (x1, y)], fill=C["glassSh"])
            d.line([(x0, min(y + band, y0)), (mid, y)], fill=C["glassSh"])
            d.line([(mid, y), (x1, min(y + band, y0))], fill=C["glassSh"])
            y += band
        d.line([(x0, y1), (x1, y1)], fill=C["glass"])
        if i == 2:
            d.polygon([(x0, y1), (x1, y1), (mid, y1 - 12)], fill=C["white"])
    for mx, top in ((40, 2), (56, 10)):
        d.line([(mx, 22), (mx, top)], fill=C["greySh"])
    return im


def icc_tower():
    """Tapering glass tower with a finned crown."""
    im = _cell()
    d = ImageDraw.Draw(im)
    d.polygon([(22, 128), (74, 128), (66, 22), (30, 22)], fill=C["glass"])
    d.polygon([(48, 128), (74, 128), (66, 22), (48, 22)], fill=C["glassSh"])
    for x in range(26, 71, 6):
        d.line([(x, 128), (x, 26)], fill=C["whiteSh"])
    for y in range(34, 128, 14):
        d.line([(24, y), (72, y)], fill=C["white"])
    d.rectangle([30, 14, 66, 22], fill=C["white"])
    for x in range(32, 66, 6):
        d.line([(x, 14), (x, 4)], fill=C["grey"])
    return im


def clock_tower():
    """Tsim Sha Tsui: red brick shaft, cupola and spire."""
    im = _cell()
    d = ImageDraw.Draw(im)
    d.rectangle([30, 44, 66, 128], fill=C["brick"])
    d.rectangle([50, 44, 66, 128], fill=C["brickSh"])
    for x in (30, 46, 62):
        d.line([(x, 44), (x, 128)], fill=C["cream"])
    d.rectangle([27, 38, 69, 46], fill=C["cream"])
    d.ellipse([38, 56, 58, 76], fill=C["cream"], outline=C["brickSh"])
    d.line([(48, 66), (48, 60)], fill=C["dark"])
    d.line([(48, 66), (53, 68)], fill=C["dark"])
    d.polygon([(33, 38), (63, 38), (56, 22), (40, 22)], fill=C["roof"])
    d.polygon([(48, 38), (63, 38), (56, 22), (48, 22)], fill=C["roofSh"])
    d.line([(48, 22), (48, 6)], fill=C["gold"])
    for y in (86, 106):
        d.rectangle([40, y, 46, y + 10], fill=C["glassSh"])
        d.rectangle([52, y, 58, y + 10], fill=C["glassSh"])
    return im


def hku_main():
    """Colonial arcade, columns, central dome."""
    im = _cell()
    d = ImageDraw.Draw(im)
    d.rectangle([6, 74, 90, 128], fill=C["brick"])
    d.rectangle([48, 74, 90, 128], fill=C["brickSh"])
    for x in range(10, 89, 8):                      # white columns
        d.rectangle([x, 78, x + 3, 124], fill=C["cream"])
    for x in range(10, 89, 8):                      # arcade arches
        d.arc([x - 3, 108, x + 9, 126], 180, 360, fill=C["creamSh"])
    d.rectangle([4, 70, 92, 76], fill=C["cream"])
    d.rectangle([38, 34, 58, 74], fill=C["brick"])
    d.rectangle([49, 34, 58, 74], fill=C["brickSh"])
    d.rectangle([36, 30, 60, 36], fill=C["cream"])
    d.ellipse([38, 42, 56, 60], fill=C["cream"], outline=C["brickSh"])
    d.chord([36, 12, 60, 36], 180, 360, fill=C["roof"])
    d.line([(48, 14), (48, 4)], fill=C["gold"])
    return im


def neon_tong_lau():
    """Temple Street: a walk-up block wearing vertical neon."""
    im = _cell()
    d = ImageDraw.Draw(im)
    d.rectangle([16, 40, 80, 128], fill=C["cream"])
    d.rectangle([56, 40, 80, 128], fill=C["creamSh"])
    d.rectangle([14, 36, 82, 42], fill=C["creamSh"])
    for y in range(50, 108, 16):                    # shuttered windows
        for x in range(22, 76, 14):
            d.rectangle([x, y, x + 9, y + 10], fill=C["glassSh"])
            d.line([(x, y + 3), (x + 9, y + 3)], fill=C["glass"])
    d.rectangle([12, 110, 84, 118], fill=C["neonR"])  # shop awning
    for x in range(14, 84, 8):
        d.rectangle([x, 110, x + 4, 118], fill=C["cream"])
    for x0, y0, col in ((2, 46, "neonR"), (84, 62, "neonC"), (2, 84, "gold")):
        d.rectangle([x0, y0, x0 + 10, y0 + 30], fill=C[col])
        d.rectangle([x0 + 2, y0 + 2, x0 + 8, y0 + 28], outline=C["white"])
        for yy in range(y0 + 6, y0 + 28, 7):
            d.line([(x0 + 3, yy), (x0 + 7, yy)], fill=C["white"])
    return im


LANDMARK_SPRITES = [
    ("experience", bank_of_china),
    ("education", hku_main),
    ("projects", icc_tower),
    ("about", clock_tower),
    ("notes", neon_tong_lau),
]


def build_landmarks() -> Image.Image:
    sheet = Image.new("RGBA", (LM_W * len(LANDMARK_SPRITES), LM_H), (0, 0, 0, 0))
    for i, (_, fn) in enumerate(LANDMARK_SPRITES):
        sheet.paste(fn(), (i * LM_W, 0))
    return sheet


# ---------------------------------------------------------------------- build

def build_tileset():
    base = Image.open(SRC).convert("RGBA")
    base = gen4_palette(deoutline(base))
    cols = base.width // S
    first = cols * (base.height // S)
    extras = [
        water_tile([(2, 3, 4), (6, 9, 3), (10, 1, 5), (13, 7, 4)]),
        water_tile([(1, 10, 4), (5, 2, 3), (9, 6, 5), (14, 11, 3)]),
        foam_tile("N"), foam_tile("E"), foam_tile("S"), foam_tile("W"),
        neon_tile((0xd6, 0x3c, 0x3c), (0xff, 0x8a, 0x6b), True),
        neon_tile((0xd6, 0x3c, 0x3c), (0xff, 0x8a, 0x6b), False),
        neon_tile((0x1f, 0x8a, 0x9c), (0x5c, 0xe1, 0xe6), True),
        neon_tile((0x1f, 0x8a, 0x9c), (0x5c, 0xe1, 0xe6), False),
        neon_tile((0xd8, 0x9a, 0x22), (0xff, 0xd8, 0x66), True),
        neon_tile((0xd8, 0x9a, 0x22), (0xff, 0xd8, 0x66), False),
    ]
    rows_needed = -(-len(extras) // cols)
    sheet = Image.new("RGBA", (base.width, base.height + S * rows_needed), (0, 0, 0, 0))
    sheet.paste(base, (0, 0))
    for i, t in enumerate(extras):
        sheet.paste(t, ((i % cols) * S, base.height + (i // cols) * S))
    return sheet, cols, first


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    sheet, cols, first = build_tileset()
    sheet.save(OUT / "tileset.png")
    build_character().save(OUT / "character.png")
    build_landmarks().save(OUT / "landmarks.png")
    print(f"tileset {sheet.size}  cols={cols}  generated tiles start at {first}")
