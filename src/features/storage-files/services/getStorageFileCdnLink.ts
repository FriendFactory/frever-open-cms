import { request } from "shared";
import { CdnLink } from "features/user-media/services";

export interface StorageFileListQueryParams {
    skip?: number;
    take?: number;
    key?: string;
}

export const getStorageFileCdnLink = async (
    stage: string,
    version: string,
    extension: number,
    key: string
): Promise<CdnLink> => {
    const response = await request(stage).asset().get(`api/CdnLink/StorageFiles/${version}/${extension}/${key}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
