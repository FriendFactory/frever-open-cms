import { TemplateEventMusicController } from "./api";
import { request } from "shared";

export async function getTemplateEventSound(stage: string, eventId: number): Promise<TemplateEventMusicController> {
    const query = `&$filter=eventId eq ${eventId} &$expand=song,userSound &$select=song,userSound`;
    const response = await request(stage)
        .assetmanager()
        .get<TemplateEventMusicController[]>(`api/musicController?${query}`);

    if (response.status === 200) {
        if (response.data?.[0]) return response.data[0];

        throw new Error("Template Event Not Found");
    }

    throw new Error(`Status code: ${response.status}.`);
}
