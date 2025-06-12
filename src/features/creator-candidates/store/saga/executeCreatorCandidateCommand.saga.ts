import { call, put, spawn, takeEvery } from "redux-saga/effects";

import { CREATOR_CANDIDATE_LIST_URL } from "urls";
import { StarCreatorCandidate, updateStarCreatorCandidate } from "features/creator-candidates/services";
import { addPopUpMessageAction } from "shared/store";
import { executeCreatorCandidateCommandAction, updateCreatorCandidateAction } from "../actions";
import { postEntity, deleteEntity } from "shared";
import { loadStarCreatorCandidates } from "./watch.CreatorCandidateList.saga";

export function* executeCreatorCandidateCommandSaga() {
    yield takeEvery(
        executeCreatorCandidateCommandAction.TYPE,
        function* (action: typeof executeCreatorCandidateCommandAction.typeOf.action) {
            const { command } = action;
            try {
                if (command.type === "update") {
                    const result: StarCreatorCandidate = yield call(
                        updateStarCreatorCandidate,
                        action.stage,
                        command.data
                    );

                    yield put(
                        updateCreatorCandidateAction({
                            stage: action.stage,
                            id: command.entityId,
                            result
                        })
                    );
                }

                if (command.type === "create" || command.type === "delete") {
                    if (command.type === "create") {
                        yield* createStarCreatorCandidates(action.stage, command.emails);
                    }

                    if (command.type === "delete") {
                        yield call(deleteEntity, action.stage, "StarCreatorCandidate", command.entityId);
                    }

                    const listPageUrlMatch = CREATOR_CANDIDATE_LIST_URL.match(location);
                    if (listPageUrlMatch.isMatched) {
                        yield spawn(
                            loadStarCreatorCandidates,
                            listPageUrlMatch.params.stage,
                            listPageUrlMatch.query || {}
                        );
                    }
                }
            } catch (e) {
                yield put(
                    addPopUpMessageAction({
                        messageText: `Failed to ${command.type} star creator candidate. ${(e as Error).toString()}`,
                        messageStyle: "error"
                    })
                );
            }
        }
    );
}

export function* createStarCreatorCandidates(stage: string, emails: string[]) {
    for (const email of emails) {
        try {
            yield call(postEntity, stage, "StarCreatorCandidate", { email });
        } catch (e) {
            yield put(
                addPopUpMessageAction({
                    messageText: `Something went wrong. Error during adding new star creator candidate (${email}). ${(
                        e as Error
                    ).toString()}`,
                    messageStyle: "error"
                })
            );
        }
    }
}
