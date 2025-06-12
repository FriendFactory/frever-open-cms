import { request } from "shared";

export async function postEntity<TData, TResponse>(stage: string, entityName: string, data: TData): Promise<TResponse> {
    const response = await request(stage).assetmanager().post(`api/${entityName}`, data);

    if (response.status === 200 || response.status === 204) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
