import { getDefaultStageId } from "features/auth";

export const CURRENT_STAGE_STORAGE_KEY = "CURRENT_STAGE";

export function setCurrentStageStorage(stage: string) {
    localStorage.setItem(CURRENT_STAGE_STORAGE_KEY, JSON.stringify(stage));
}

export function getCurrentStageStorage(): string | null {
    const item = localStorage.getItem(CURRENT_STAGE_STORAGE_KEY);
    return item ? JSON.parse(item) : null;
}

export function getCurrentStageTab(): string {
    return getCurrentStageStorage() ?? getDefaultStageId();
}

export function resetCurrentStageTab() {
    localStorage.removeItem(CURRENT_STAGE_STORAGE_KEY);
}
