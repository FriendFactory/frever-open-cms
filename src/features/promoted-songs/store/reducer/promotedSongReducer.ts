import { Action } from "redux";

import { promotedSongListLoadedOkAction } from "../actions";
import { PromotedSong } from "features/promoted-songs/services";

export interface PromotedSongState {
    [key: string]: PromotedSong | undefined;
}

export const promotedSongEntitiesReducer = (
    state: PromotedSongState | undefined,
    action: Action
): PromotedSongState => {
    if (!state) state = {};

    if (promotedSongListLoadedOkAction.is(action)) {
        return {
            ...state,
            ...action.result.data.reduce<PromotedSongState>((acc, el) => {
                acc[promotedSongKeySelector(action.stage, el.id)] = el;

                return acc;
            }, {})
        };
    }

    return state;
};

export const promotedSongKeySelector = (stage: string, id: number): string => `${stage}/promoted-song/${id}`;
