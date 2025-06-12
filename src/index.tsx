import React from "react";
import { ConnectedRouter } from "connected-react-router";
import duration from "dayjs/plugin/duration";
import dayjs from "dayjs";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Switch } from "react-router";
import { history } from "./history-instance";
import utc from "dayjs/plugin/utc";
import { App } from "antd";

import { AppRoutes } from "./app-routes";
import { appStore } from "./app-state";
import { ThemeProvider } from "shared/containers/ThemeProvider";
import { GlobalStyle } from "./global-style";
import { ScrollToTop } from "shared/containers/ScrollToTop";
import "./extensions/array";

dayjs.extend(duration);
dayjs.extend(utc);

render(
    <Provider store={appStore}>
        <ThemeProvider>
            <App>
                <ConnectedRouter history={history}>
                    <GlobalStyle />
                    <ScrollToTop>
                        <Switch>{...AppRoutes}</Switch>
                    </ScrollToTop>
                </ConnectedRouter>
            </App>
        </ThemeProvider>
    </Provider>,
    document.getElementById("root")
);
