import { defineAction } from "rd-redux-utils";

import { Localization, LocalizationImportType } from "features/localization-moderation/services";

export const localizationDeleteAction = defineAction<{ stage: string; key: string }>("LOCALIZATION: DELETE");

export const localizationPostAction =
    defineAction<{ stage: string; postType: "update" | "add"; data: Localization }>("LOCALIZATION: POST");

export const localizationImportAction =
    defineAction<{ stage: string; importType: LocalizationImportType; csvFile: File }>("LOCALIZATION: IMPORT");
