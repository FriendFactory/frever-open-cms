import { defineAction, defineActionGroup } from "rd-redux-utils";

import { EditorSettings } from "../../services/api";

export const editorSettingsActionGroup = defineActionGroup<{ stage: string; id: number }>("EDITOR SETTINGS DETAILS");

export const editorSettingsLoadingAction = editorSettingsActionGroup.defineAction("LOADING");

export const editorSettingsLoadedOkAction =
    editorSettingsActionGroup.defineAction<{ result: EditorSettings }>("RESPONSE OK");

export const editorSettingsLoadedErrorAction =
    editorSettingsActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");

export const updateEditorSettingsAction =
    editorSettingsActionGroup.defineAction<{ data: Partial<EditorSettings> }>("UPDATE");

export const deleteEditorSettingsAction = editorSettingsActionGroup.defineAction("DELETE");

export const createEditorSettingsAction =
    defineAction<{ stage: string; data: Partial<EditorSettings> }>("CREATE NEW EDITOR SETTINGS");
