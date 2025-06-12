import { request } from "shared";

export async function getVideoIdByLevelId(stage: string, levelId: number): Promise<number | undefined> {
    const query = `?&$filter=levelId eq ${levelId}&$select=id`;
    const { data, status } = await request(stage)
        .assetmanager()
        .get("api/video/moderation" + query);

    if (status === 200) {
        return data.data[0]?.id;
    }

    throw new Error(`Status code: ${status}.`);
}
