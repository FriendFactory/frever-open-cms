import { defineAction, defineActionGroup } from "rd-redux-utils";

import { Template } from "features/video-templates/services";

export const templateActionGroup = defineActionGroup<{ stage: string; id: number }>("TEMPLATE");

export const templateLoadingAction = templateActionGroup.defineAction("LOADING");

export const templateLoadedOkAction =
    templateActionGroup.defineAction<{ result: Template; eventSoundURL?: string }>("RESPONSE OK");

export const templateLoadedErrorAction = templateActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

export const updateTemplateAction =
    defineAction<{ stage: string; id: number; data?: Partial<Template>; file?: File; tags?: Array<string | number> }>(
        "UPDATE TEMPLATE"
    );
