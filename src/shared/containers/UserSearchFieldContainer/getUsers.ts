import qs from "query-string";

import { request } from "shared";
import { ThumbnailFile } from "shared/image-url-creators";

export const USER_SEARCH_DEFAULT_SIZE = 20;

export interface UserGroupShortInfo {
    id: number;
    mainCharacter?: { id: number; files: ThumbnailFile[] };
    mainGroup: { id: number; nickName: string };
}

export type GetUsersResponse = { data: UserGroupShortInfo[] } | { error: string };

export const getUsers = async (stage: string, input: string, skip: number = 0): Promise<GetUsersResponse> => {
    const startsWithFilter = `StartsWith(tolower(mainGroup/nickName), tolower('${input}'))`;

    const query = qs.stringify({
        $skip: skip,
        $top: USER_SEARCH_DEFAULT_SIZE,
        $filter: isNaN(Number(input)) ? startsWithFilter : `mainGroupId eq ${input} or ${startsWithFilter}`,
        $select: "id, mainCharacter, mainGroup",
        $expand: "mainCharacter, mainGroup"
    });

    const response = await request(stage).assetmanager().get(`api/user?${query}`);

    if (response.status === 200) {
        return { data: response.data };
    }

    return { error: `Failed to fetch users list. Status code: ${response.status}` };
};
