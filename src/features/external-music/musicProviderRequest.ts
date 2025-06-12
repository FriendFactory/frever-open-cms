import { AxiosRequestConfig, AxiosResponse } from "axios";

import { request } from "shared";

const httmpMethods = ["GET", "POST", "PATCH", "DELETE"] as const;

export const baseUrl = "https://api.7digital.com/1.2/";

export interface MusicProviderRequestParams {
    BaseUrl: string;
    HttpMethod: typeof httmpMethods[number];
    QueryParameters?: Record<string, any>;
}

export interface MusicProviderAxiosConfigParams extends Omit<AxiosRequestConfig, "url" | "method"> {
    url: string;
    method: typeof httmpMethods[number];
}

export interface MusicProviderURLWithHeaders {
    url: string;
    authorizationHeader: string;
}

export const musicProviderRequest = async <T = any>(
    stageId: string,
    { method, url, data }: MusicProviderAxiosConfigParams,
    queryParameters?: MusicProviderRequestParams["QueryParameters"]
): Promise<AxiosResponse<T>> => {
    return await request(stageId)
        .assetmanager()
        .post("api/music-provider/request", {
            BaseUrl: baseUrl + url,
            HttpMethod: method ?? "GET",
            QueryParameters: { country: "SE", ...queryParameters },
            Body: JSON.stringify(data)
        });
};
