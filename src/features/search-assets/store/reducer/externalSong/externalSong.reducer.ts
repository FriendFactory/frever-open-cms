import { Action } from "redux";

import { ExternalSong } from "features/search-assets/services";
import { externalSongListLoadedOkAction, externalSongLoadedOkAction } from "../../actions";

export interface ExternalSongEntityState {
    [key: string]: ExternalSong;
}

export const externalSongEntitiesReducer = (
    state: ExternalSongEntityState | undefined,
    action: Action
): ExternalSongEntityState => {
    if (!state) {
        state = {};
    }

    if (externalSongListLoadedOkAction.is(action)) {
        const newEntities = action.result.reduce((accumulator: ExternalSongEntityState, extSong) => {
            accumulator[externalSongKeySelector(action.stage, extSong.id)] = extSong;
            return accumulator;
        }, {});
        return { ...state, ...newEntities };
    }

    if (externalSongLoadedOkAction.is(action)) {
        return {
            ...state,
            [externalSongKeySelector(action.stage, action.id)]: action.result
        };
    }

    return state;
};

export const externalSongKeySelector = (stage: string, id: number): string =>
    `${stage}/external-song/${id}`.toLowerCase();
