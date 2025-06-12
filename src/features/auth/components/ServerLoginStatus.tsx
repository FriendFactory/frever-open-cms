import React from "react";
import { List } from "antd";

import { AuthAtServerState, AuthStatus } from "../store/reducer";
import { SingleServerStatus } from "./SingleServerStatus";

export interface ServerLoginStatusProps {
    authStatus: AuthStatus;
    serverStatus: ServerStatus[];
    handleSelectServerToLogin: (serverId: string, selected: boolean) => void;
}

export interface ServerStatus {
    id: string;
    title: string;
    state: AuthAtServerState["status"];
    error?: string;
    selected: boolean;
}

export function ServerLoginStatus({ authStatus, serverStatus, handleSelectServerToLogin }: ServerLoginStatusProps) {
    return (
        <List
            header={authStatus === "initial" && <strong>Select server(s)</strong>}
            size="small"
            bordered
            rowKey={(item) => item.id}
            dataSource={serverStatus}
            renderItem={(item) => (
                <List.Item>
                    <SingleServerStatus
                        disableCheckbox={authStatus === "in-process" || authStatus === "finished"}
                        data={item}
                        handleSelectServerToLogin={handleSelectServerToLogin}
                    />
                </List.Item>
            )}
        />
    );
}
