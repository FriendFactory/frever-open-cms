import { all } from "redux-saga/effects";

import { handleLoginSaga } from "./handleLogin";
import { resetAuthSaga } from "./resetAuth";
import { sendVerifyCodeSaga } from "./sendVerifyCode.saga";

export function* authSaga() {
    yield all([handleLoginSaga(), resetAuthSaga(), sendVerifyCodeSaga()]);
}
