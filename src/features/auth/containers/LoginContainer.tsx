import React from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppState } from "app-state";
import { SEARCH_ASSET_URL } from "urls";
import { LoginForm } from "../components/LoginForm";
import { Credentials } from "../services/storage";
import { changeAuthStatusAction, loginAction, resetAuthAction, sendVerifyCodeAction } from "../store/actions";

export interface LoginContainerProps {}

export function LoginContainer({}: LoginContainerProps) {
    const dispatch = useDispatch();

    const authState = useSelector((state: AppState) => state.auth);

    const handleResetAuth = () => dispatch(resetAuthAction({ authStatus: "initial" }));

    const [successServerId] =
        Object.entries(authState.authAtServer).find(([_, authState]) => authState.status === "success") ?? [];

    const [serverIdToSendCode] =
        Object.entries(authState.authAtServer).find(
            ([_, authState]) => authState.status === "initial" && authState.selected
        ) ?? [];

    const [authToServer] =
        Object.entries(authState.authAtServer).find(
            ([_, authState]) => authState.status === "code-sent" && authState.selected
        ) ?? [];

    const handleLogin = (credentials: Credentials) => {
        authToServer &&
            dispatch(loginAction({ credentials, serverId: authToServer, authStatus: authState.authStatus }));

        serverIdToSendCode
            ? dispatch(sendVerifyCodeAction({ serverId: serverIdToSendCode, email: credentials.email }))
            : dispatch(changeAuthStatusAction({ authStatus: "finished" }));
    };

    const isSomeServerSelected = Object.entries(authState.authAtServer).some(([_, r]) => r.selected);
    const loading = Object.entries(authState.authAtServer).some(([_, r]) => r.status === "running");
    const urlToHomepage = successServerId && SEARCH_ASSET_URL.format({ asset: "Wardrobe", stage: successServerId });
    return (
        <LoginForm
            authStatus={authState.authStatus}
            loading={loading}
            isSomeServerSelected={isSomeServerSelected}
            urlToHomepage={urlToHomepage}
            isNotLastStep={!!serverIdToSendCode}
            handleLogin={handleLogin}
            handleResetAuth={handleResetAuth}
        />
    );
}
