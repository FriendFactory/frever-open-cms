import React from "react";
import { Route } from "react-router";

import { LoginPage } from "pages";
import { LOGIN_PAGE_URL } from "urls";

export const AuthRoutes = [<Route key="auth-sign-in-page" path={LOGIN_PAGE_URL.urlTemplate} component={LoginPage} />];
