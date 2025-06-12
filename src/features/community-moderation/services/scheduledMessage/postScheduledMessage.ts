import { request } from "shared";
import { ScheduledMessage } from "../api";

export async function postScheduledMessage(stage: string, data: Partial<ScheduledMessage>): Promise<undefined> {
    const response = await request(stage).assetmanager().post("api/chat/moderation/scheduled-message", data);

    if (response.status === 204 || response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
