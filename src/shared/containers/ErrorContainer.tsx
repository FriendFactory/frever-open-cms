import React from "react";
import { Result } from "antd";
import { useSelector } from "react-redux";
import { ResultStatusType } from "antd/es/result";

import { AppState } from "app-state";

interface PageErrorContainerProps {
    children: JSX.Element;
    selector: (appState: AppState) => { error?: string } | undefined;
}

export function PageErrorContainer({ selector, children }: PageErrorContainerProps) {
    const info = useSelector(selector);

    if (!info?.error) return children;

    const codeMatch = info.error.match(/Status code: (\d+)/);
    const code = codeMatch ? codeMatch[1] : null;
    const status = (code && statusCodes.includes(code) ? code : "404") as ResultStatusType;

    return <Result status={status} title={defaultTitle[status] ?? ""} subTitle={info.error} />;
}

const statusCodes = ["403", "404", "500"];

const defaultTitle: { [x: string]: string } = {
    "400": "Bad Request",
    "403": "Access Denied",
    "404": "Page Not Found",
    "500": "Internal Server Error"
};
