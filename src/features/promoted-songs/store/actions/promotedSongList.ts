import { defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { PromotedSong, PromotedSongListQueryParams } from "../../services";

export const promotedSongListActionGroup =
    defineActionGroup<{ stage: string; params: PromotedSongListQueryParams }>("PROMOTED SONG LIST");

export const promotedSongListLoadingAction = promotedSongListActionGroup.defineAction("LOADING");

export const promotedSongListLoadAction = promotedSongListActionGroup.defineAction("LOAD");

export const promotedSongListLoadedOkAction =
    promotedSongListActionGroup.defineAction<{ result: ResultWithCount<PromotedSong> }>("RESPONSE OK");

export const promotedSongListLoadedErrorAction =
    promotedSongListActionGroup.defineAction<{ error: string }>("RESPONSE ERROR");
