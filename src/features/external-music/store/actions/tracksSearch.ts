import { defineActionGroup } from "rd-redux-utils";

import { TracksSearchQueryParams, TracksSearchResult } from "features/external-music/services/getTracks";

export const tracksSearchActionGroup =
    defineActionGroup<{ stage: string; params: TracksSearchQueryParams }>("TRACKS SEARCH");

export const tracksSearchHandleLoadAction = tracksSearchActionGroup.defineAction("LOAD");

export const tracksSearchLoadingAction = tracksSearchActionGroup.defineAction("LOADING");

export const tracksSearchLoadedOkAction =
    tracksSearchActionGroup.defineAction<{ result: TracksSearchResult }>("LOADED OK");

export const tracksSearchLoadedErrorAction =
    tracksSearchActionGroup.defineAction<{ error: string }>("LOADED ERROR");
