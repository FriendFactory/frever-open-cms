import { request } from "shared";
import { UserMediaFileEntity, UserMediaFileType } from "./api";

export async function updateUserMediaFileEntity<T extends UserMediaFileType = UserMediaFileType>(
    stage: string,
    entityType: T,
    data: Object
): Promise<UserMediaFileEntity> {
    if (!data.hasOwnProperty("id")) throw new Error("ID is required");

    const response = await request(stage).assetmanager().patch(`api/${entityType}`, data);
    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
}
