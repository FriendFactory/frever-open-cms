import { call, put, takeEvery } from "redux-saga/effects";

import { API_SERVERS } from "config";
import { sendCodeToEmail } from "features/auth/services/sendCodeToEmail";
import {
    changeAuthStatusAction,
    loginAtServerCompletedAction,
    sendVerifyCodeAction,
    sendVerifyCodeCompletedAction
} from "../actions";
import { addServerVersion } from "features/auth/services";

export function* sendVerifyCodeSaga() {
    yield takeEvery(sendVerifyCodeAction.TYPE, function* (action: typeof sendVerifyCodeAction.typeOf.action) {
        const currentServer = API_SERVERS.find((server) => server.id === action.serverId);

        if (currentServer) {
            const auth_server = addServerVersion(currentServer.auth_server, currentServer.version);

            yield put(changeAuthStatusAction({ authStatus: "in-process" }));
            try {
                yield call(sendCodeToEmail, auth_server, action.email);

                yield put(
                    sendVerifyCodeCompletedAction({
                        serverId: action.serverId
                    })
                );
            } catch (error) {
                yield put(
                    loginAtServerCompletedAction({
                        serverId: action.serverId,
                        status: "error",
                        error: "Failed to send verify code"
                    })
                );
            }
        }
    });
}
