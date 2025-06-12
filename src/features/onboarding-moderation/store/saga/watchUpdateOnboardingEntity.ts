import { OnboardingDataNames } from "features/onboarding-moderation/services";

import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { addPopUpMessageAction } from "shared/store";
import { updateEntityListAction } from "../actions";
import { initUpload, InitUpload, postEntity, ThumbnailFile, uploadFile } from "shared";
import { loadQuestGroupList, loadQuestList, loadRewardList } from "./watchLoadOnboardingEntities";
import { FileExtensions } from "config";

const mappedPost: Record<OnboardingDataNames, string> = {
    reward: "onboarding/moderation/reward",
    quest: "onboarding/moderation/quest",
    questGroup: "onboarding/moderation/quest/group"
};

export function* watchUpdateOnboardingEntity() {
    yield takeEvery(updateEntityListAction.TYPE, function* (action: typeof updateEntityListAction.typeOf.action) {
        try {
            const data: any = { ...action.entity };

            if (action.thumbnail) {
                const { uploadId, uploadUrl }: InitUpload = yield call(initUpload, action.stage);

                yield call(uploadFile, uploadUrl, action.thumbnail);

                data.files = [createOnboardingThumbnailFile(uploadId)];
            }

            yield call(postEntity, action.stage, mappedPost[action.entityType], data);

            let params: any = { id: data.id };
            if (params.id === undefined && (action.entityType === "quest" || action.entityType === "reward")) {
                params = { onboardingQuestGroupId: data.onboardingQuestGroupId };
            } else if (params.id === undefined && action.entityType === "questGroup") {
                params = {};
            }

            switch (action.entityType) {
                case "quest":
                    yield spawn(loadQuestList, action.stage, params);
                    break;
                case "questGroup":
                    yield spawn(loadQuestGroupList, action.stage, params);
                    break;
                case "reward":
                    yield spawn(loadRewardList, action.stage, params);
                    break;
            }
        } catch (responseError) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Failed to update ${action.entityType}. ${(responseError as Error).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    });
}

const createOnboardingThumbnailFile = (uploadId: string): ThumbnailFile => ({
    file: 1,
    extension: FileExtensions.Png,
    resolution: "512x512",
    version: null,
    source: {
        uploadId
    }
});
