export interface HsbColor {
    hue: number;
    saturation: number;
    brightness: number;
}

export interface RgbColor {
    red: number;
    green: number;
    blue: number;
}

export interface RgbaColor extends RgbColor {
    alpha: number;
}

export const hsvTorgb = ({ hue, saturation, brightness }: HsbColor): RgbColor => {
    const s = saturation / 100,
        v = brightness / 100;
    const c = v * s;
    const hh = hue / 60;
    const x = c * (1 - Math.abs((hh % 2) - 1));
    const m = v - c;

    const p = parseInt(hh.toString(), 10);
    const rgb =
        p === 0
            ? [c, x, 0]
            : p === 1
            ? [x, c, 0]
            : p === 2
            ? [0, c, x]
            : p === 3
            ? [0, x, c]
            : p === 4
            ? [x, 0, c]
            : p === 5
            ? [c, 0, x]
            : [];

    return {
        red: Math.round(255 * (rgb[0] + m)),
        green: Math.round(255 * (rgb[1] + m)),
        blue: Math.round(255 * (rgb[2] + m))
    };
};

export const rgbTohsv = ({ red, green, blue }: RgbColor): HsbColor => {
    red /= 255;
    green /= 255;
    blue /= 255;

    const v = Math.max(red, green, blue),
        n = v - Math.min(red, green, blue);

    const h =
        n === 0 ? 0 : n && v === red ? (green - blue) / n : v === green ? 2 + (blue - red) / n : 4 + (red - green) / n;

    return { hue: 60 * (h < 0 ? h + 6 : h), saturation: v && (n / v) * 100, brightness: v * 100 };
};

export const convertToInt = (color: RgbaColor): number =>
    (color.red << 24) + (color.green << 16) + (color.blue << 8) + color.alpha;

export const convertFromIntColor = (intColor: number): RgbaColor => ({
    red: (intColor >> 24) & 0xff,
    green: (intColor >> 16) & 0xff,
    blue: (intColor >> 8) & 0xff,
    alpha: Math.abs(intColor && 0xff / 255)
});

export function RGBAToHexA(color: RgbaColor) {
    let r = color.red.toString(16);
    let g = color.green.toString(16);
    let b = color.blue.toString(16);
    let a = Math.abs(color.alpha / 255).toString(16);

    if (r.length == 1) r = "0" + r;
    if (g.length == 1) g = "0" + g;
    if (b.length == 1) b = "0" + b;
    if (a.length == 1) a = "0" + a;

    return "#" + r + g + b + a;
}

export function hexAToRGBA(hexA: string) {
    let r: number = 0,
        g: number = 0,
        b: number = 0,
        a: number = 1;

    r = Number(hexA[1] + hexA[2]);
    g = Number(hexA[3] + hexA[4]);
    b = Number(hexA[5] + hexA[6]);
    a = Number(hexA[7] + hexA[8]);

    return { r, g, b, a };
}
