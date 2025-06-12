import qs from "query-string";

import { CharacterSpawnPositionFormation } from "./api";
import { BaseQueryParams, request } from "shared";
import { DEFAULT_SPAWN_FORMATION_LIST_PAGE_SIZE } from "urls";

export interface SpawnFormationQueryParams extends BaseQueryParams {
    id?: number;
    name?: string;
    characterCount?: number;
    formationType?: number;

    multiCharacterAnimation?: "true" | "false";
    applyOnCharacterEditing?: "true" | "false";

    orderBy?: "id" | "name" | "characterCount" | "sortOrder";
}

export const getSpawnFormation = async (
    stage: string,
    params: SpawnFormationQueryParams
): Promise<CharacterSpawnPositionFormation[]> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_SPAWN_FORMATION_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.name) filter.push(`contains(tolower(name), tolower('${params.name}'))`);
    if (params.characterCount) filter.push(`characterCount eq ${params.characterCount}`);
    if (params.formationType) filter.push(`characterSpawnPositionFormationTypeId eq ${params.formationType}`);
    if (params.multiCharacterAnimation)
        filter.push(`supportsMultiCharacterAnimation eq ${params.multiCharacterAnimation}`);
    if (params.applyOnCharacterEditing) filter.push(`applyOnCharacterEditing eq ${params.applyOnCharacterEditing}`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/characterSpawnPositionFormation?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
