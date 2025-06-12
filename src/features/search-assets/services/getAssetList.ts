import * as qs from "query-string";

import { request } from "shared";
import { dateToODataFormat } from "utils";
import { AssetData, AssetDataNames, assetExpandToRequest, getWardrobes, searchAssetByName } from ".";
import { DEFAULT_ASSETS_PAGE_SIZE } from "urls";

const extraFilterList = [
    "bodyAnimationCategoryId",
    "cameraAnimationTypeId",
    "cameraCategoryId",
    "artistId",
    "labelId",
    "genreId",
    "sfxCategoryId",
    "vfxCategoryId",
    "vfxTypeId",
    "cameraFilterCategoryId",
    "cameraFilterSubCategoryId",
    "voiceFilterCategoryId",
    "setLocationCategoryId",
    "setLocationSubCategoryId",
    "weatherId",
    "wardrobeCategoryId",
    "assetTierId",
    "genderId",
    "wardrobeSubCategoryId",
    "wardrobeCollectionId",
    "setLocationBundle",
    "readinessId",
    "spawnPositionGroupId",
    "bodyAnimationGroupId",
    "brandId",
    "marketingCountries",
    "bodyAnimationAndVfx"
] as const;

const extraMultipleFilters = [
    "wardrobeStyleIds",
    "wardrobePatternIds",
    "wardrobeMaterialIds",
    "wardrobeColorIds",
    "emotions"
] as const;

export type ExtraFilterName = typeof extraFilterList[number] | typeof extraMultipleFilters[number];

export type ExtraFilters<T extends string = ExtraFilterName> = {
    [key in T]?: string | string[];
};

export const assetsOrderBy = ["modifiedTime", "createdTime", "name", "id", "assetTierId", "price"] as const;
type AssetsOrderBy = typeof assetsOrderBy[number];

export interface AssetListParams extends ExtraFilters {
    skip?: number;
    take?: number;

    search?: string;
    searchFilter?: "contains" | "eq" | "startswith" | "endswith";
    caseSensitive?: "true" | "false";

    modifiedTime?: string;
    createdTime?: string;

    orderBy?: AssetsOrderBy;
    sortDirection?: "asc" | "desc";

    readinessFilter?: string;
    wardrobeGenderGroupIdFilter?: number;
    hasGenderPair?: "true" | "false";
    availableForBaking?: "true" | "false";
    price?: "sc" | "hc";
    umaRecipeId?: number;
    tagId?: number;
    spawnPosBodyAnimId?: number;
}

export async function getAssetList<T extends AssetDataNames = AssetDataNames>(
    stage: string,
    asset: T,
    params: AssetListParams,
    expand?: string[],
    useCompactWardrobeList?: boolean
): Promise<AssetData[T][]> {
    const query: any = {};
    query.$skip = params.skip ?? 0;
    query.$top = params.take ?? DEFAULT_ASSETS_PAGE_SIZE;

    const filter = Object.entries(removeFalsyElement(params))
        .map(([key, value]) => assetQueryFilterCreators[key as keyof AssetListParams]?.(value, useCompactWardrobeList)!)
        .filter(Boolean);

    if (params.search) {
        const result = params.search.split(",").map((el) => Number(el));

        !result.some((el) => isNaN(el))
            ? filter.push(`(${result.map((el) => `id eq ${el}`).join(" or ")})`)
            : asset === "CharacterSpawnPosition"
            ? (query.$name = params.search)
            : filter.push(assetFilterByName(params.search, params.searchFilter, params.caseSensitive, asset));
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const expandList = assetExpandToRequest[asset];
    if (!useCompactWardrobeList && (expandList || expand)) {
        query.$expand = expand ? expand.join(",") : expandList.join(",");
    }

    const sortDirection = params.sortDirection ?? "desc";
    const sortingByPrice =
        params.orderBy === "price"
            ? params.price === "sc"
                ? `softCurrencyPrice ${sortDirection}`
                : params.price === "hc"
                ? `hardCurrencyPrice ${sortDirection}`
                : `softCurrencyPrice ${sortDirection}, hardCurrencyPrice ${sortDirection}`
            : params.orderBy;

    query.$orderBy = `${params.orderBy ?? (params.search ? searchAssetByName(asset) : "id")} ${sortDirection}`;
    if (params.orderBy === "price") query.$orderBy = sortingByPrice;

    const assetUrl = asset === "CharacterSpawnPosition" ? "CharacterSpawnPosition/filtered" : asset;

    const response =
        asset === "Wardrobe" && useCompactWardrobeList
            ? await getWardrobes(stage, qs.stringify(query))
            : await request(stage)
                  .assetmanager()
                  .get(`api/${assetUrl}?${qs.stringify(query)}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}

export type AssetQueryFilterCreators = {
    [key in keyof AssetListParams]: (value: any, useCompactWardrobeList?: boolean) => string | undefined;
};

const assetQueryFilterCreators: AssetQueryFilterCreators = {
    ...extraMultipleFilters.reduce<{ [key: string]: (value: string) => string }>((acc, name) => {
        acc[name] = (value: string | string[]) => {
            const empty = `(not ${name}/any() or ${name}/any() eq null)`;
            if (typeof value === "string") {
                if (value === "null") return empty;
                return `${name}/any(entity: entity eq ${value})`;
            } else {
                return `(${value
                    .map((el: any) => {
                        if (el === "null") return empty;
                        return `${name}/any(entity: entity eq ${el})`;
                    })
                    .join(" or ")})`;
            }
        };
        return acc;
    }, {}),

    ...extraFilterList.reduce<{ [key: string]: (value: string) => string }>((acc, name) => {
        acc[name] = (value: string | string[]) =>
            typeof value === "string"
                ? `${name} eq ${value}`
                : `(${value.map((el: any) => `${name} eq ${el}`).join(" or ")})`;

        return acc;
    }, {}),

    tagId: (value: string) => `tags/any(tag: tag eq ${value})`,
    umaRecipeId: (value: string) => `umaRecipeAndWardrobe/any(umaRecipe: umaRecipe/umaRecipeId eq ${value})`,
    wardrobeSubCategoryId: (value: string | string[], useCompactWardrobeList?: boolean) => {
        const filter = (value: string) =>
            useCompactWardrobeList
                ? `wardrobeSubCategoryIds/any(entity: entity eq ${value})`
                : `wardrobeAndWardrobeSubCategory/any(entity: entity/wardrobeSubCategoryId eq ${value})`;
        return typeof value === "string" ? filter(value) : `(${value.map((el) => filter(el)).join(" or ")})`;
    },
    spawnPosBodyAnimId: (id: number) => `bodyAnimationAndCharacterSpawnPosition/any(el: el/bodyAnimationId eq ${id})`,
    marketingCountries: (value: string | string[]) => {
        const filter = (v: string) => `availableForCountries/any(v: v eq '${v}')`;
        return typeof value === "string" ? filter(value) : `(${value.map((el) => filter(el)).join(" or ")})`;
    },
    bodyAnimationAndVfx: (value: string) =>
        value === "true" ? "bodyAnimationAndVfx/any()" : "not bodyAnimationAndVfx/any()",
    wardrobeGenderGroupIdFilter: (value: string) =>
        `(wardrobeGenderGroupId ne null and wardrobeGenderGroup/wardrobe/all(entity: entity/genderId ne ${value}))`,
    hasGenderPair: (value: string) =>
        value === "true" ? `wardrobeGenderGroupId ne null` : `wardrobeGenderGroupId eq null`,
    availableForBaking: (value: string) => `availableForBaking eq ${value}`,
    price: (value: string) =>
        value === "sc"
            ? `(softCurrencyPrice ne null and hardCurrencyPrice eq null)`
            : "(hardCurrencyPrice ne null and softCurrencyPrice eq null)",
    setLocationBundle: (value: number | string) =>
        isNaN(Number(value))
            ? `startswith(tolower(setLocationBundle/name), tolower('${value}'))`
            : `setLocationBundleId eq ${value}`,

    createdTime: (value: string) => {
        const dates = dateToODataFormat(value);
        if (!dates) return;
        return `createdTime ge ${dates.start} and createdTime le ${dates.end}`;
    },
    modifiedTime: (value: string) => {
        const dates = dateToODataFormat(value);
        if (!dates) return;
        return `modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`;
    }
};

const assetFilterByName = (
    search: AssetListParams["search"] | undefined,
    searchFilter: AssetListParams["searchFilter"] | undefined,
    caseSensitive: AssetListParams["caseSensitive"] | undefined,
    asset: AssetDataNames
) => {
    const searchField = searchAssetByName(asset);
    const searcher = caseSensitive === "true" ? searchField : `tolower(${searchField})`;
    const value = caseSensitive === "true" ? `'${search}'` : `tolower('${search}')`;
    return searchFilter === "eq" ? `${searcher} eq ${value}` : `${searchFilter ?? "contains"}(${searcher}, ${value})`;
};

const removeFalsyElement = (object: Record<string, any>): Record<string, any> => {
    const newObject: Record<string, any> = {};

    Object.keys(object).forEach((key: string) => {
        const value = object[key];

        if (value !== undefined && value !== null) {
            if (Array.isArray(value) && value.length === 0) {
            } else if (value) {
                newObject[key] = value;
            }
        }
    });

    return newObject;
};
