import { request } from "shared";

export interface EventOfLevel {
    eventId: number;
    levelId: number;
    levelSequence: number;
    title: string;
}

export async function getEventsOfLevel(stage: string, levelId: number) {
    if (!stage) {
        throw new Error("Stage is required");
    }
    if (!levelId) {
        throw new Error("Level ID is required");
    }
    const response = await request(stage)
        .assetmanager()
        .get<EventOfLevel[]>(`/api/template/moderation/events-of-level/${levelId}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}`);
}
