import { defineAction } from "rd-redux-utils";

import { AuthStatus } from "..";
import { Credentials } from "../services/storage";

export const loginAction =
    defineAction<{ credentials: Credentials; authStatus: AuthStatus; serverId: string }>("AUTH_LOGIN");

export const selectServerToLoginAction = defineAction<{
    serverId: string;
    selected: boolean;
}>("SELECT_SERVER_TO_LOGIN");

export const loginAtServerStartedAction = defineAction<{ serverId: string }>("AUTH_LOGIN_AT_SERVER_STARTED");

export const loginAtServerCompletedAction = defineAction<{
    serverId: string;
    status: "success" | "error";
    error?: string;
}>("AUTH_LOGIN_AT_SERVER_COMPLETED");

export const changeAuthStatusAction = defineAction<{
    authStatus: AuthStatus;
}>("CHANGE_AUTH_STEP");

export const resetAuthAction = defineAction<{ authStatus: AuthStatus }>("RESET_AUTH");

export const sendVerifyCodeAction = defineAction<{ serverId: string; email: string }>("SEND_AUTH_CODE");

export const sendVerifyCodeCompletedAction = defineAction<{ serverId: string }>("SEND_AUTH_CODE_COMPLETED");
