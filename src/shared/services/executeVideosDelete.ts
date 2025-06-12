import { request } from "shared";

export type SelectBy = "userSoundId" | "songId" | "externalSongId";
export type Actions = "post" | "delete";

export async function executeVideosDelete(
    stage: string,
    selectBy: SelectBy,
    id: number,
    action: Actions
): Promise<undefined> {
    const response = await request(stage).assetmanager()[action](`api/music/moderation/audio?${selectBy}=${id}`);

    if (response.status === 200 || response.status === 204) return;

    throw new Error(`Status code ${response.status}.`);
}
