import { request } from "shared/request";
import { CreatePageRowDto } from "./api";

export const postCreatePageRow = async (stage: string, data: Partial<CreatePageRowDto>): Promise<undefined> => {
    const response = await request(stage).assetmanager().post(`api/create-page/moderation`, data);

    if (response.status === 204 || response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
