import { LocationChangeAction, LOCATION_CHANGE } from "connected-react-router";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { ResultWithCount } from "shared";
import { REPORTED_CHAT_MESSAGE_LIST_URL } from "urls";
import {
    reportMessageListLoadingAction,
    reportMessageListLoadedOkAction,
    reportMessageListLoadedErrorAction
} from "../actions";
import { checkUserAccess } from "shared/checkUserAccess";
import {
    ChatMessageReport,
    getReportedMessageList,
    ReportedMessageListParams
} from "features/reported-messages/services";
import { ChatMessage, getChatMessages } from "features/chats-moderation/services";

export function* watchReportedChatMessageListSaga() {
    yield takeEvery(LOCATION_CHANGE, function* (action: LocationChangeAction) {
        const urlMatch = REPORTED_CHAT_MESSAGE_LIST_URL.match(action.payload.location);
        if (!urlMatch.isMatched) return;

        const hasAccess: boolean = yield call(checkUserAccess, "Social");
        if (!hasAccess) return;

        const { stage, params } = { stage: urlMatch.params.stage, params: urlMatch.query || {} };

        yield loadReportList(stage, params);
    });
}

export function* loadReportList(stage: string, params: ReportedMessageListParams) {
    try {
        yield put(reportMessageListLoadingAction({ stage, params }));

        const { count, data }: ResultWithCount<ChatMessageReport> = yield call(
            getReportedMessageList,
            stage,
            params || {}
        );

        const resultWithChatMessage: ChatMessageReport[] = yield all(
            data.map(function* (report) {
                try {
                    const [chatMessage]: ChatMessage[] = yield call(getChatMessages, stage, report.chatId, {
                        takeOlder: 1,
                        target: report.chatMessageId
                    });

                    return { ...report, reportMessage: chatMessage };
                } catch {
                    return report;
                }
            })
        );
        const result: ResultWithCount<ChatMessageReport> = { count, data: resultWithChatMessage };

        yield put(
            reportMessageListLoadedOkAction({
                stage,
                params,
                result
            })
        );
    } catch (e) {
        yield put(
            reportMessageListLoadedErrorAction({
                error: (e as Error).toString(),
                stage,
                params
            })
        );
    }
}
