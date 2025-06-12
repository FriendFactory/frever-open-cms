import { InitialBattleReward } from "./store/actions";

export enum PagesNavigationPages {
    hasLevelEditorSettings,
    hasPostRecordEditorSettings,
    hasCharacterEditorSettings
}

export const editorSettingsPages = [
    { id: 0, name: "LevelEditor" },
    { id: 1, name: "PostRecordEditor" },
    { id: 2, name: "CharacterEditor" }
];

export const taskType = [
    { id: 0, name: "Daily" },
    { id: 1, name: "Weekly" },
    { id: 2, name: "Season" },
    { id: 3, name: "Onboarding" },
    { id: 4, name: "Voting" }
] as const;

export const defaultBattleRewards: InitialBattleReward[] = [
    {
        place: 1,
        softCurrencyPayout: 300
    },
    {
        place: 2,
        softCurrencyPayout: 200
    },
    {
        place: 3,
        softCurrencyPayout: 100
    },
    {
        place: 4,
        softCurrencyPayout: 50
    }
];
