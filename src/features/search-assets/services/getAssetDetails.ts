import { request } from "shared";
import { AssetDataNames } from ".";

export async function getAssetDetails<T>(
    stage: string,
    asset: AssetDataNames | "UmaBundle" | "ExternalSong",
    id: number
): Promise<T> {
    if (!stage) {
        throw new Error("Stage is required");
    }
    if (!asset) {
        throw new Error("Asset is required");
    }

    const response = await request(stage).assetmanager().get<T>(`api/${asset}/${id}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
