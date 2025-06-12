export function parseSecondsToMilliseconds(seconds: string | number): number {
    const parsedValue = typeof seconds === "string" ? parseFloat(seconds) : seconds;

    if (isNaN(parsedValue)) {
        throw new Error("Invalid input: expected a number in seconds.");
    }

    return Math.round(parsedValue * 1000);
}

export function parseMillisecondsToSeconds(milliseconds: string | number): number {
    const parsedValue = typeof milliseconds === "string" ? parseInt(milliseconds, 10) : milliseconds;

    if (isNaN(parsedValue)) {
        throw new Error("Invalid input: expected an integer in milliseconds.");
    }

    return Number((parsedValue / 1000).toFixed(3));
}
