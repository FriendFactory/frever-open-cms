import { call, put, select, spawn, takeEvery } from "redux-saga/effects";

import { FileExtensions } from "config";
import { initUpload, InitUpload, postEntity, ResultWithCount, ThumbnailFile, uploadFile } from "shared";
import { addPopUpMessageAction } from "shared/store";
import { postCrewRewardEntityAction, updateCrewRewardsList } from "../actions";
import { loadCrewRewardsList } from "./watchCrewRewardsListSaga";
import { CrewRewards, getCrewRewards } from "../../services";
import { CrewRewardsListPageResult, crewRewardsListSelector } from "../reducer/crewRewards/crewRewardsListReducer";
import { CREW_REWARDS_LIST_URL } from "urls";

export function* watchPostCrewRewardEntitySaga() {
    yield takeEvery(
        postCrewRewardEntityAction.TYPE,
        function* (action: typeof postCrewRewardEntityAction.typeOf.action) {
            try {
                const data: CrewRewards & { files?: ThumbnailFile[] } = { ...action.data };

                const listPageUrlMatch = CREW_REWARDS_LIST_URL.match(location, true);

                if (!listPageUrlMatch.isMatched) return;

                const { stage } = listPageUrlMatch.params;
                const params = listPageUrlMatch.query || {};

                if (action.thumbnail) {
                    const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, stage);

                    yield call(uploadFile, uploadUrl, action.thumbnail);

                    data.files = [createThumbnailFile(uploadId)];
                }

                const postRewardId: number = yield call(postEntity, stage, "crew/moderation/reward", data);

                const crewRewardsList: CrewRewardsListPageResult = yield select(crewRewardsListSelector(stage, params));

                const isUpdate = crewRewardsList.data.some((reward) => reward.id === postRewardId);

                if (isUpdate) {
                    const result: ResultWithCount<CrewRewards> = yield call(getCrewRewards, stage, {
                        id: postRewardId
                    });
                    yield put(updateCrewRewardsList({ stage: stage, data: result.data[0] }));
                    return;
                }

                yield spawn(loadCrewRewardsList, stage, params);
            } catch (responseError) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed To POST . ${(responseError as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}

export const createThumbnailFile = (uploadId: string): ThumbnailFile => ({
    file: 1,
    extension: FileExtensions.Png,
    resolution: "512x512",
    version: null,
    source: {
        uploadId
    }
});
