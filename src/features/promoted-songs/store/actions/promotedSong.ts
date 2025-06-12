import { defineAction } from "rd-redux-utils";

import { PromotedSong } from "features/promoted-songs/services";

export const promotedSongPostAction =
    defineAction<{ stage: string; items: { data: Partial<PromotedSong>; file?: File }[] }>("PROMOTED SONG: POST");

export const promotedSongDeleteAction = defineAction<{ stage: string; id: number }>("PROMOTED SONG: DELETE");
