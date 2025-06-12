export interface Localization {
    key: string;
    type: string;
    description: string | null;
    values: {
        eng: string;
    } & Partial<{
        [isoCode in ISOCodes]: string | null;
    }>;
}

export type LocalizationImportType = "AddNew" | "Merge" | "Replace";

export const availableLanguages = {
    eng: "English",
    spa: "Spanish",
    deu: "German",
    fra: "French",
    por: "Portuguese"
} as const;

export type ISOCodes = keyof typeof availableLanguages;
