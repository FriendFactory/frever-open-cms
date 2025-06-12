import { request } from "shared";
import { GeoCluster } from "./api";

export async function updateGeoCluster(stage: string, id: number, data: Partial<GeoCluster>): Promise<undefined> {
    const response = await request(stage).assetmanager().patch(`api/geo-cluster/${id}`, data);

    if (response.status === 204) return response.data;

    throw new Error(`Status code ${response.status} ${response.statusText ?? ""}`);
}
