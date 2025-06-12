import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import {
    ChatMessageReport,
    ReportedMessageCommandTypes,
    ReportedMessageListParams
} from "features/reported-messages/services";

export const reportMessageListActionGroup = defineActionGroup<{
    params: ReportedMessageListParams;
    stage: string;
}>("REPORTED MESSAGE LIST");

export const reportMessageListLoadingAction = reportMessageListActionGroup.defineAction("LOADING");

export const reportMessageListLoadedOkAction = reportMessageListActionGroup.defineAction<{
    result: ResultWithCount<ChatMessageReport>;
}>("LOADED OK");

export const reportMessageListLoadedErrorAction = reportMessageListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const updateMessageListAction = defineAction<{
    stage: string;
    result: ChatMessageReport;
}>("REPORTED MESSAGE LIST UPDATE OK");

export const executeReportMessageCommand = defineAction<{
    stage: string;
    report: ChatMessageReport;
    command: ReportedMessageCommandTypes;
}>("REPORTED MESSAGE LIST EXECUTE COMMAND");
