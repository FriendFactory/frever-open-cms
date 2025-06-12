import { request } from "shared";
import { Template } from "./api";

export async function getTemplate(stage: string, id: number): Promise<Template> {
    const response = await request(stage).assetmanager().get<Template>(`/api/Template/moderation/${id}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
