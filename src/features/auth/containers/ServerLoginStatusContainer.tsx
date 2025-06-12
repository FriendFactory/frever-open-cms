import React from "react";
import { AppState } from "app-state";
import { useDispatch, useSelector } from "react-redux";

import { API_SERVERS } from "config";
import { ServerLoginStatus, ServerStatus } from "../components/ServerLoginStatus";
import { selectServerToLoginAction } from "../store/actions";

export interface ServerLoginStatusContainerProps {}

export function ServerLoginStatusContainer({}: ServerLoginStatusContainerProps) {
    const dispatch = useDispatch();

    const authState = useSelector((appState: AppState) => appState.auth);

    const handleSelectServerToLogin = (serverId: string, selected: boolean) =>
        dispatch(selectServerToLoginAction({ serverId, selected }));

    const serverStatus: ServerStatus[] = API_SERVERS.orderBy((s) => s.ordinal).map<ServerStatus>((s) => {
        const l = authState.authAtServer[s.id];

        return {
            id: s.id,
            title: s.title,
            state: l?.status ?? "initial",
            error: l?.error,
            selected: l?.selected ?? false
        };
    });

    return (
        <ServerLoginStatus
            authStatus={authState.authStatus}
            serverStatus={serverStatus}
            handleSelectServerToLogin={handleSelectServerToLogin}
        />
    );
}
