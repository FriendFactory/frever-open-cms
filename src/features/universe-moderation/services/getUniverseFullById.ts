import { request } from "shared";
import { UniverseFull } from "./api";

export const getUniverseFullById = async (stage: string, id: number): Promise<UniverseFull> => {
    const response = await request(stage).assetmanager().get(`api/universe/moderation/${id}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
