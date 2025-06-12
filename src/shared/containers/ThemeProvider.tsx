import React from "react";
import { ConfigProvider, theme } from "antd";

const THEME_PARAMS_KEY = "THEME_PARAMS_KEY";

export interface ThemeParams {
    dark: boolean;
    compact: boolean;
}

export const getThemeParams = (): ThemeParams =>
    JSON.parse(localStorage.getItem(THEME_PARAMS_KEY) ?? '{"dark": "true", "compact": false }');

export const setThemeParams = (newValues: ThemeParams) =>
    localStorage.setItem(THEME_PARAMS_KEY, JSON.stringify(newValues));

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const themeParams = getThemeParams();
    const algorithm = [];

    if (themeParams.dark) algorithm.push(theme.darkAlgorithm);
    if (themeParams.compact) algorithm.push(theme.compactAlgorithm);

    return <ConfigProvider theme={{ algorithm }}>{children}</ConfigProvider>;
}
