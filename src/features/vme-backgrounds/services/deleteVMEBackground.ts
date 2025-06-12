import { request } from "shared";

export async function deleteVMEBackground(stage: string, id: number) {
    const response = await request(stage).assetmanager().delete(`api/SetLocationBackground/${id}`);

    if (response.status === 204) return id;

    throw new Error(`Status code: ${response.status}`);
}
