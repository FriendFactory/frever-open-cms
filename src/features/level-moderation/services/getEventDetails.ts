import { request } from "shared";
import { LevelEvent } from "./event-api";

const expand = [
    "characterController($expand=characterControllerBodyAnimation($expand=primaryBodyAnimation), character)",
    "vfxController($expand=vfx)",
    "cameraController($expand=cameraAnimation, cameraAnimationTemplate)",
    "setLocationController($expand=setLocation)",
    "cameraFilterController($expand=cameraFilterVariant)",
    "musicController($expand=song)"
];

export async function getEventDetails(stage: string, id: number): Promise<LevelEvent> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const query = `&$filter=id eq ${id} &$expand=${expand.toString()}`;

    const response = await request(stage).assetmanager().get<LevelEvent[]>(`api/event?${query}`);

    if (response.status === 200) {
        if (response.data[0]) {
            return response.data[0];
        }

        throw new Error("Event Not Found");
    }

    throw new Error(`Status code: ${response.status}.`);
}
