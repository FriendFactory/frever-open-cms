import { request } from "shared";
import { StarCreatorWelcomeMessage } from "./api";

export async function creatorMessageUpsert(
    stage: string,
    { groupId, welcomeMessage }: StarCreatorWelcomeMessage
): Promise<StarCreatorWelcomeMessage> {
    const response = await request(stage)
        .assetmanager()
        .post<StarCreatorWelcomeMessage>(`api/creator-code/${groupId}/invitation/message`, welcomeMessage, {
            headers: {
                "Content-Type": "application/json"
            }
        });

    if (response.status === 204) return { groupId, welcomeMessage };

    throw new Error(`Status code: ${response.status}.`);
}
