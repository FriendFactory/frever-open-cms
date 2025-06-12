import { defineActionGroup } from "rd-redux-utils";

import { Localization, LocalizationQueryParams } from "../../services";

export const localizationListActionGroup =
    defineActionGroup<{ stage: string; params: LocalizationQueryParams }>("LOCALIZATION LIST");

export const localizationListLoadingAction = localizationListActionGroup.defineAction("LOADING");

export const localizationListLoadedOkAction =
    localizationListActionGroup.defineAction<{ data: Localization[]; total: number }>("LOADED OK");

export const localizationListLoadedErrorAction =
    localizationListActionGroup.defineAction<{ error: string }>("LOADED ERROR");
