import { ThumbnailFile } from "shared";

export interface Emotion {
    id: number;
    name: string;
    emojiCode: string;
    files: ThumbnailFile[] | null;
    sortOrder: number;
    isEnabled: boolean;
}
