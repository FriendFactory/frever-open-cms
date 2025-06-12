import { request } from "shared";
import { ThemeCollection, ThemeCollectionDto } from "./api";

export async function postThemeCollection(stage: string, data: ThemeCollectionDto): Promise<ThemeCollection> {
    const response = await request(stage).assetmanager().post(`api/theme-collection`, data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
