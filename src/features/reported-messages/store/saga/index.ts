import { all } from "redux-saga/effects";
import { watchReportedChatMessageCommandSaga } from "./watchReportedChatMessageCommandSaga";
import { watchReportedChatMessageListSaga } from "./watchReportedChatMessageListSaga";

export function* reportedChatMessageSaga() {
    yield all([watchReportedChatMessageListSaga(), watchReportedChatMessageCommandSaga()]);
}
