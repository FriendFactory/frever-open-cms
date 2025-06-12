export enum FileExtensions {
    "Unregistered",
    "Mp3",
    "Ogg",
    "Wav",
    "Gif",
    "Png",
    "Txt",
    "Empty",
    "Jpg",
    "Mp4",
    "Jpeg",
    "Mov"
}

export const createAcceptAttribute = (...extensions: string[]) => {
    return extensions.map((ext) => `.${ext}`).join(",");
};
