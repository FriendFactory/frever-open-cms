import { FileType } from "shared";

export type ImageResolution = [number, number];

export const getImageResolution = async (file: File): Promise<ImageResolution> =>
    await new Promise((resolve) => {
        const img: HTMLImageElement = new window.Image();
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
            const { width, height } = img;
            resolve([width, height]);
        };
    });

export const validateImage = async (file: File, [width, height]: ImageResolution): Promise<boolean> => {
    const [imgWidth, imgHeight] = await getImageResolution(file);

    return width == imgWidth && height == imgHeight;
};

export const validateImageExtension = (file: File, extensions: FileType[]) =>
    extensions.some((value) => file.type === value);
