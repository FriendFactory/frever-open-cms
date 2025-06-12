import { request } from "shared";
import { Template } from "./api";

export async function updateTemplateSortOrders(stage: string, data: Template[]): Promise<Template[]> {
    const response = await request(stage).assetmanager().post("api/template/sorting", data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
