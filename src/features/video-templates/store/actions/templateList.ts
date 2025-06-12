import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { Template, TemplateFilterParams } from "features/video-templates/services";

export const templateListActionGroup =
    defineActionGroup<{ stage: string; params: TemplateFilterParams }>("TEMPLATE LIST");

export const templateListLoadAction = templateListActionGroup.defineAction("LOAD");

export const templateListLoadingAction = templateListActionGroup.defineAction("LOADING");

export const templateListLoadedOkAction =
    templateListActionGroup.defineAction<{ result: ResultWithCount<Template> }>("RESPONSE OK");

export const templateListLoadedErrorAction = templateListActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

export const deleteTemplatesAction =
    defineAction<{ stage: string; command: "delete" | "undelete"; ids: number[] }>("DELETE TEMPLATES");

export const deleteTemplatesFinishedOkAction =
    defineAction<{ stage: string; result: Template[] }>("DELETE TEMPLATES FINISHED OK");
