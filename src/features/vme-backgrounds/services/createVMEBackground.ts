import { request } from "shared";
import { VMEBackground } from "./api";

export async function createVMEBackground(stage: string, data: VMEBackground): Promise<VMEBackground> {
    const response = await request(stage).assetmanager().post("api/SetLocationBackground", data);

    if (response.status === 200 || response.status === 204) return response.data;

    throw new Error(`Status code ${response.status}.`);
}
