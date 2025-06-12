import { all, call, put } from "redux-saga/effects";

import { ExternalSongEntity, PromotedSong, SongEntity, getSongNameList } from "features/promoted-songs/services";
import { promotedSongNamesLoadedOkAction } from "../actions/songNames";

export function* loadPromotedSongNamesSaga(stage: string, list: PromotedSong[]) {
    const songIds: number[] = [];
    const externalSongIds: number[] = [];

    list.forEach((el) => {
        if (el.externalSongId) externalSongIds.push(el.externalSongId);
        if (el.songId) songIds.push(el.songId);
    });

    const [songs, externalSongs]: [songs: SongEntity[], externalSongs: ExternalSongEntity[]] = yield all([
        call(getSongNameList, stage, "song", songIds),
        call(getSongNameList, stage, "externalSong", externalSongIds)
    ]);

    yield put(promotedSongNamesLoadedOkAction({ stage, songs, externalSongs }));
}
