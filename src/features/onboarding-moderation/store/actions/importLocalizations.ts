import { defineAction } from "rd-redux-utils";

import { LocalizationImportType } from "features/onboarding-moderation/services";

export const localizationImportAction = defineAction<{
    stage: string;
    importType: LocalizationImportType;
    csvFile: File;
}>("ONBOARDING LOCALIZATION: IMPORT");
