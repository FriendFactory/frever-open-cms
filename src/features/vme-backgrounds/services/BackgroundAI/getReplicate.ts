import { ReplicateInputType } from "features/vme-backgrounds/helpers";
import { request } from "shared";

export interface GetReplicateResponse {
    isReady: boolean;
    ok: boolean;
    errorMessage: string | null;
    uploadId: string | null;
    signedFileUrl: string | null;
}

export interface GetReplicateResponseWithParams extends GetReplicateResponse {
    params: ReplicateInputType;
}

export async function getReplicate(stage: string, replicateId: string): Promise<GetReplicateResponse> {
    const response = await request(stage).assetmanager().get(`api/ai/moderation/v1/replicate/${replicateId}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
