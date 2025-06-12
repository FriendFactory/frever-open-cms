import qs from "query-string";

import { ThemeCollection } from "./api";
import { BaseQueryParams, ResultWithCount, request } from "shared";
import { DEFAULT_THEME_COLLECTIONS_LIST_SIZE } from "urls";

export interface ThemeCollectionsQueryParams extends BaseQueryParams {
    id?: number;
    ids?: number[];
    wardrobeId?: number;
    universeId?: number;
    name?: string;

    isActive?: "true" | "false";
    orderBy?: "id" | "name" | "sortOrder";
}

export const getThemeCollectionList = async (
    stage: string,
    params: ThemeCollectionsQueryParams
): Promise<ResultWithCount<ThemeCollection>> => {
    let query = qs.stringify({
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_THEME_COLLECTIONS_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    });

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);

    if (params.name) filter.push(`startsWith(name, '${params.name}')`);

    if (params.isActive) filter.push(`isActive eq ${params.isActive}`);

    if (params.universeId) filter.push(`universeId eq ${params.universeId}`);

    if (params.ids) filter.push(`(${params.ids.map((id) => `id eq ${id}`).join(" or ")})`);

    if (params.wardrobeId) filter.push(`wardrobes/any(wardrobe: wardrobe/id eq ${params.wardrobeId})`);

    if (filter.length) query += `&$filter=${filter.join(" and ")}`;

    const response = await request(stage).assetmanager().get(`api/theme-collection?${query}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}`);
};
