import { request, ResultWithCount } from "shared";
import { Template } from "./api";

export async function getTemplateList(stage: string, query: string): Promise<ResultWithCount<Template>> {
    const response = await request(stage).assetmanager().get(`/api/Template/moderation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
