import axios, { AxiosInstance } from "axios";

import { API_URL } from "config";
import { getServerAuth } from "features/auth";
import { LOGIN_PAGE_URL } from "urls";

const Services = {
    main: "server_url",
    asset: "asset_server",
    video: "video_server",
    social: "social_server",
    assetmanager: "assetmanager_server"
} as const;

export type ServiceClient = {
    [P in keyof typeof Services | "migrate"]: () => AxiosInstance;
};

export function request(stageId: string): ServiceClient {
    if (!stageId) throw new Error("Stage ID is required for request");

    const stageAuth = getServerAuth(stageId);

    if (!stageAuth) {
        goToLogin();
        return {} as any;
    }

    const result: any = {};

    result.migrate = () => {
        const instance = axios.create({
            baseURL: API_URL,
            validateStatus: (status) => status <= 450
        });

        instance.interceptors.request.use((config) => {
            if (stageAuth && stageAuth.access_token && config.headers) {
                config.headers["Authorization"] = `${stageAuth.token_type} ${stageAuth.access_token}`;
            }

            return config;
        });

        return instance;
    };

    Object.entries(Services).forEach(([name, key]) => {
        const url = stageAuth[key] as string;

        result[name] = () => {
            const instance = axios.create({
                baseURL: url,
                validateStatus: (status) => status <= 599
            });

            instance.interceptors.request.use((config) => {
                if (stageAuth && stageAuth.access_token && config.headers) {
                    config.headers["Authorization"] = `${stageAuth.token_type} ${stageAuth.access_token}`;
                }

                return config;
            });

            instance.interceptors.response.use(async (response) => {
                if (response.status === 404) {
                    throw new Error(`Status code: ${response.status}.`);
                }

                if (response.status === 403) {
                    throw new Error(`Status code: ${response.status}.`);
                }

                if (response.status >= 400 && response.status <= 599) {
                    throw new Error(
                        `${response.data["Message"] ? response.data["Message"] + "." : ""}
                        Status code ${response.status}. ${response.data?.title ? response.data?.title + "." : ""} 
                         x-request-id: ${response.data["RequestId"]}.`
                    );
                }

                return response;
            });

            return instance;
        };
    });

    return result;
}

export function goToLogin() {
    const signInUrl = LOGIN_PAGE_URL.format({});
    window.location.assign(signInUrl);
}
