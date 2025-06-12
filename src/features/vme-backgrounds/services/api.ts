import { ThumbnailFile } from "shared";

export interface VMEBackground {
    id: number;
    name: string;
    sortOrder: number | null;
    files: ThumbnailFile[];
    isEnabled: boolean;
}

export interface BackgroundAI extends VMEBackground {
    settings: {
        modelVersion: string;
        width: string;
        height: string;
        loraScale: number;
        guidanceScale: number;
        diffusionSteps: number;
        prompts: BackgroundAIPrompt[] | null;
        sets: BackgroundAIOptionsSet[] | null;
    };
}

export interface BackgroundAIOptionsSet {
    title: string;
    columnsCount: number;
    options: BackgroundAIOption[];
}

export interface BackgroundAIOption {
    displayValue: string;
    promptValue: string;
    label: string;
}

export interface BackgroundAIPrompt {
    weight: number;
    text: string;
}
