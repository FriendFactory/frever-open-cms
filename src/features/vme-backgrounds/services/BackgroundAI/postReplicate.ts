import { request } from "shared";
import { ReplicateInputType } from "features/vme-backgrounds/helpers";

export interface PostReplicateResponse {
    predictionId: string;
    ok: boolean;
    errorMessage: string | null;
    params: ReplicateInputType;
}

export async function postReplicate(stage: string, data: ReplicateInputType): Promise<PostReplicateResponse> {
    const response = await request(stage).assetmanager().post(`api/ai/moderation/v1/replicate`, data);

    if (response.status === 200) return { ...response.data, params: data };

    throw new Error(`Status code: ${response.status}`);
}
