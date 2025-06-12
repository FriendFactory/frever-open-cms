import { request } from "shared";
import { StarCreatorCandidate } from ".";

export const updateStarCreatorCandidate = async (
    stage: string,
    data: Partial<StarCreatorCandidate>
): Promise<StarCreatorCandidate> => {
    const response = await request(stage).assetmanager().patch(`api/StarCreatorCandidate`, data);

    if (response.status === 200) return response.data;

    throw new Error(`Status code ${response.status}. ${response.statusText}`);
};
