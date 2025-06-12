import { request } from "shared";
import { StarCreatorWelcomeMessage } from "./api";

export async function changeCreatorCodeStatus(stage: string, codeId: number): Promise<undefined> {
    const response = await request(stage)
        .assetmanager()
        .post<StarCreatorWelcomeMessage>(`api/creator-code/${codeId}/enabled`);

    if (response.status === 204) return;

    throw new Error(`Status code: ${response.status}.`);
}
