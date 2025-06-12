import { call, put } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { ExternalPlaylist, Playlist, getExternalPlaylistDetails } from "features/external-music/services";

export function* extendPlaylist(stage: string, playlist: Playlist, withTracks?: boolean) {
    try {
        const externalPlaylist: ExternalPlaylist = yield call(
            getExternalPlaylistDetails,
            stage,
            playlist.externalPlaylistId,
            withTracks
        );

        return { ...playlist, externalPlaylist };
    } catch (e) {
        yield put(
            addPopUpMessageAction({
                messageText: (e as Error).toString(),
                messageStyle: "warning"
            })
        );
        return playlist;
    }
}
