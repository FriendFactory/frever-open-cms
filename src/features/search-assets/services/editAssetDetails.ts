import { request } from "shared";
import { Store } from "antd/lib/form/interface";

export async function editAssetDetails<T>(stage: string, asset: string, data: Store): Promise<T> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const response = await request(stage)
        .assetmanager()
        .patch<T>(`api/${asset}/`, data, { headers: { "Content-Type": "application/json" } });

    if (response.status === 200) {
        return response.data;
    }
    throw new Error(`Status code: ${response.status}.`);
}
