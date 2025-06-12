import { put, takeEvery } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

import { API_SERVERS } from "config";
import { addServerVersion, setServerAuth } from "../../services/storage";
import { loginAction, loginAtServerCompletedAction, loginAtServerStartedAction } from "../actions";
import { decodeToken } from "utils/decodeToken";

export function* handleLoginSaga() {
    yield takeEvery(loginAction.TYPE, function* (action: typeof loginAction.typeOf.action) {
        const currentServer = API_SERVERS.find((server) => server.id === action.serverId);
        if (currentServer && action.credentials.verification_token) {
            const { id, secret } = currentServer;

            const auth_server = addServerVersion(currentServer.auth_server, currentServer.version);

            yield put(loginAtServerStartedAction({ serverId: id }));

            const data = new FormData();
            data.append("grant_type", "email_auth_token");
            data.append("email", action.credentials.email);
            data.append("verification_token", action.credentials.verification_token);
            data.append("client_id", "Server");
            data.append("scope", "friends_factory.creators_api");
            data.append("client_secret", secret);

            try {
                const response: AxiosResponse = yield axios.post(`${auth_server}connect/token`, data);
                if (response.status === 200) {
                    /// Decoding token and checking that the user has some permissions to use CMS
                    const decodedToken: Object | null = decodeToken(response.data.access_token);

                    if (!decodedToken) throw new Error("Can't decode token");

                    const userHasAccess = Object.entries(decodedToken).some(([key, value]) => {
                        return key === "Employee" && value === "True";
                    });

                    if (userHasAccess) {
                        setServerAuth(id, response.data);

                        yield put(
                            loginAtServerCompletedAction({
                                serverId: id,
                                status: "success"
                            })
                        );
                    } else {
                        yield put(
                            loginAtServerCompletedAction({
                                serverId: id,
                                status: "error",
                                error: "This account doesn't have access permission to use CMS"
                            })
                        );
                    }
                }
            } catch (e) {
                yield put(
                    loginAtServerCompletedAction({
                        serverId: id,
                        status: "error",
                        error: (e as Error).toString()
                    })
                );
            }
        }
    });
}
