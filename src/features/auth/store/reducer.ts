import { Action } from "redux";

import {
    changeAuthStatusAction,
    loginAtServerCompletedAction,
    loginAtServerStartedAction,
    resetAuthAction,
    selectServerToLoginAction,
    sendVerifyCodeCompletedAction
} from "./actions";

export type AuthStatus = "initial" | "in-process" | "finished";

export interface AuthAppState {
    authAtServer: {
        [id: string]: AuthAtServerState;
    };
    authStatus: AuthStatus;
}

export interface AuthAtServerState {
    selected: boolean;
    status: "initial" | "code-sent" | "running" | "success" | "error";
    error?: string;
}

const iniaitlAuthState: AuthAppState = { authAtServer: {}, authStatus: "initial" };

export function authReducer(state: AuthAppState = iniaitlAuthState, action: Action): AuthAppState {
    if (resetAuthAction.is(action)) {
        return { ...iniaitlAuthState, authStatus: action.authStatus };
    }

    if (changeAuthStatusAction.is(action)) {
        return {
            ...state,
            authStatus: action.authStatus
        };
    }

    if (selectServerToLoginAction.is(action)) {
        return {
            ...state,
            authAtServer: {
                ...state.authAtServer,
                [action.serverId]: {
                    ...state.authAtServer[action.serverId],
                    selected: action.selected,
                    status: "initial"
                }
            }
        };
    }

    if (sendVerifyCodeCompletedAction.is(action)) {
        return {
            ...state,
            authAtServer: {
                ...state.authAtServer,
                [action.serverId]: {
                    ...state.authAtServer[action.serverId],
                    status: "code-sent"
                }
            }
        };
    }

    if (loginAtServerStartedAction.is(action)) {
        return {
            ...state,
            authAtServer: {
                ...state.authAtServer,
                [action.serverId]: {
                    ...state.authAtServer[action.serverId],
                    status: "running",
                    error: undefined
                }
            }
        };
    }

    if (loginAtServerCompletedAction.is(action)) {
        return {
            ...state,
            authAtServer: {
                ...state.authAtServer,
                [action.serverId]: {
                    ...state.authAtServer[action.serverId],
                    status: action.status,
                    error: action.error
                }
            }
        };
    }

    return state;
}
