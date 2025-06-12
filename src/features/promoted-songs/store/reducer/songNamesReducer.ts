import { Action } from "redux";

import { promotedSongNamesLoadedOkAction } from "../actions/songNames";
import { PromotedSongType } from "features/promoted-songs/services";

type SongNamesState = {
    [x in PromotedSongType]: { [x: string]: string | undefined };
};

export const songNamesReducer = (state: SongNamesState | undefined, action: Action): SongNamesState => {
    if (!state)
        state = {
            song: {},
            externalSong: {}
        };

    if (promotedSongNamesLoadedOkAction.is(action)) {
        return {
            song: action.songs.reduce(
                (acc, el) => {
                    acc[createPromotedSongNameKey(action.stage, el.id)] = el.name;
                    return acc;
                },
                { ...state.song }
            ),
            externalSong: action.externalSongs.reduce(
                (acc, el) => {
                    acc[createPromotedSongNameKey(action.stage, el.id)] = el.songName;
                    return acc;
                },
                { ...state.externalSong }
            )
        };
    }

    return state;
};

export const createPromotedSongNameKey = (stage: string, id: number) => `${stage}/promoted-song-name/${id}`;
