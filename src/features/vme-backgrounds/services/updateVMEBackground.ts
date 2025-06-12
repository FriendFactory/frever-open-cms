import { request } from "shared";
import { VMEBackground } from "./api";

export async function updateVMEBackground(stage: string, data: VMEBackground): Promise<VMEBackground> {
    const response = await request(stage).assetmanager().patch(`api/SetLocationBackground`, data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
