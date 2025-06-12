import { defineActionGroup } from "rd-redux-utils";

import { TrackDetailsQueryParams, TrackDetailsResult } from "features/external-music/services/getTrackDetails";

export const trackDetailsActionGroup =
    defineActionGroup<{ stage: string; params: TrackDetailsQueryParams }>("TRACK DETAILS");

export const trackDetailsHandleLoadAction = trackDetailsActionGroup.defineAction("LOAD");

export const trackDetailsLoadingAction = trackDetailsActionGroup.defineAction("LOADING");

export const trackDetailsLoadedOkAction =
    trackDetailsActionGroup.defineAction<{ result: TrackDetailsResult }>("LOADED OK");

export const trackDetailsLoadedErrorAction = trackDetailsActionGroup.defineAction<{ error: string }>("LOADED ERROR");
