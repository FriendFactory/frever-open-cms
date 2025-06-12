import { AspectRatio, checkIsRatioFit } from "utils";

const PROMOTED_SONG_IMAGE_RATIO: AspectRatio = [335, 94];

export const validatePromotedSongImage = async (file: File): Promise<{ ok: true } | { ok: false; error: string }> =>
    await new Promise((res) => {
        if (file.type !== "image/png")
            res({ ok: false, error: "File type is not valid. Only PNG images are allowed." });

        const img: HTMLImageElement = new window.Image();

        img.src = window.URL.createObjectURL(file);

        img.onload = () => {
            checkIsRatioFit([img.width, img.height], PROMOTED_SONG_IMAGE_RATIO)
                ? res({ ok: true })
                : res({
                      ok: false,
                      error: "Image resolution is not valid. It must be 1005x282 pixels or have the same aspect ratio"
                  });
        };
    });
