import { request } from "shared";
import { WardrobeBakingDisableReason } from "./api";

export async function getWardrobeBakingDisableReason(
    stage: string,
    id: number
): Promise<WardrobeBakingDisableReason | null> {
    const query = `?$filter=wardrobeId eq ${id}&$orderBy=id desc&$top=1`;

    const response = await request(stage)
        .assetmanager()
        .get("api/WardrobeBakingDisableReason" + query);

    if (response.status === 200) {
        return response.data?.[0] ?? null;
    }

    throw new Error(`Status code: ${response.status}.`);
}
