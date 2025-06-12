export type AspectRatio = [number, number];

export const gcd = (x: number, y: number): number => {
    return y ? gcd(y, x % y) : x;
};

export const calculateAspectRatio = (width: number, height: number): AspectRatio => {
    const divisor = gcd(width, height);

    return [width / divisor, height / divisor];
};

export const checkIsRatioFit = ([x1, y1]: AspectRatio, [x2, y2]: AspectRatio) => {
    const [x3, y3] = calculateAspectRatio(x1, y1);

    return x3 === x2 && y3 === y2;
};
