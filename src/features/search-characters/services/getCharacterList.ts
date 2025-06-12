import * as qs from "query-string";

import { Character } from "features/user-moderation/services";
import { request } from "shared";
import { DEFAULT_CHARACTER_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";

export interface GetCharacterListParams {
    skip?: number;
    name?: string;
    filter?: "contains" | "eq" | "startswith" | "endswith";
    caseSensitive?: string;
    id?: string;
    groupId?: string;
    createdTime?: string;
    modifiedTime?: string;
    publicForCreation?: "true" | "false";
    publicForBackgroundDancing?: "true" | "false";
    isDeleted?: "true" | "false";
    genderId?: string | string[];

    ignoreGroupId?: number;
    readinessId?: number;

    orderBy?: "id" | "name" | "groupId" | "createdTime" | "modifiedTime";
    sortDirection?: "asc" | "desc";
}

export async function getCharacterList(stage: string, params: GetCharacterListParams): Promise<Character[]> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const query: any = {};
    query.$count = true;

    if (params.skip) {
        query.$skip = params.skip;
    }
    query.$top = DEFAULT_CHARACTER_LIST_PAGE_SIZE;

    const filter = [];

    if (params.id) {
        const result = params.id
            .split(",")
            .filter((el) => !!el.trim() && !isNaN(Number(el)))
            .map((el) => `id eq ${el}`)
            .join(" or ");

        filter.push(`(${result})`);
    }

    if (params.readinessId) {
        filter.push(`readinessId eq ${params.readinessId}`);
    }

    if (params.ignoreGroupId) {
        filter.push(`groupId ne ${params.ignoreGroupId}`);
    }

    if (params.groupId) {
        filter.push(`groupId eq ${params.groupId}`);
    }

    if (params.genderId) {
        typeof params.genderId === "string"
            ? filter.push(`genderId eq ${params.genderId}`)
            : filter.push(params.genderId.map((val) => `genderId eq ${val}`).join(" or "));
    }

    if (params.publicForCreation) {
        filter.push(`publicForCreation eq ${params.publicForCreation}`);
    }

    if (params.publicForBackgroundDancing) {
        filter.push(`publicForBackgroundDancing eq ${params.publicForBackgroundDancing}`);
    }

    if (params.isDeleted) {
        filter.push(`isDeleted eq ${params.isDeleted}`);
    }

    if (params.name) {
        const searchType = params.caseSensitive === "true" ? "name" : "toupper(name)";
        const searchValue = params.caseSensitive === "true" ? `'${params.name}'` : `toupper('${params.name}')`;

        const newSearch =
            params.filter === "eq"
                ? `${searchType} ${params.filter} ${searchValue}`
                : `${params.filter}(${searchType}, ${searchValue})`;

        filter.push(newSearch);
    }

    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (params.modifiedTime) {
        const dates = dateToODataFormat(params.modifiedTime);
        if (dates) filter.push(`modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`);
    }

    if (filter.length) {
        query.$filter = filter.join(" and ");
    }
    query.$orderBy = `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`;

    const response = await request(stage)
        .assetmanager()
        .get(`/api/character?${qs.stringify(query)}`);

    if (response.status === 200) {
        return response.data;
    }

    throw new Error(`Status code: ${response.status}.`);
}
