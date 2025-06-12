import * as qs from "query-string";

import { BaseQueryParams, request } from "shared";
import { DEFAULT_USER_LIST_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";
import { User } from "./api";

const expand = ["mainGroup", "mainCharacter"] as const;

const select = [
    "id",
    "email",
    "phoneNumber",
    "createdTime",
    "mainGroupId",
    "mainGroup",
    "mainCharacterId",
    "mainCharacter"
] as const;

export interface GetUserListParams extends BaseQueryParams {
    emailOrPhone?: string;
    filter?: "contains" | "eq" | "startswith" | "endswith";
    caseSensitive?: "true" | "false";
    id?: string;
    mainGroupId?: string;
    nickname?: string;
    isBlocked?: "true" | "false";
    isDeleted?: "true" | "false";
    isFeatured?: "true" | "false";
    isTemporary?: "true" | "false";
    isStarCreator?: "true" | "false";
    isOnWatchList?: "true" | "false";

    date?: string;
    orderBy?: "id" | "mainGroupId" | "mainGroup/nickname" | "mainGroup/deletedAt";
    sortDirection?: "asc" | "desc";

    followers?: number;
    following?: number;

    country?: string | string[];
    language?: string | string[];

    authId?: string;
}

export async function getUserList(stage: string, params: GetUserListParams): Promise<User[]> {
    const query: any = {
        $count: true,
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_USER_LIST_PAGE_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`,
        $expand: expand.toString(),
        $select: select.toString()
    };

    const filter = [];

    if (params.followers || params.following) {
        const followerFilter = params.followers
            ? `mainGroup/followerFollowerNavigation/any(follower: follower/following/id eq ${params.followers})`
            : `mainGroup/followerFollowing/any(following: following/followerNavigation/id eq ${params.following})`;
        filter.push(followerFilter);
    }

    if (params.country) {
        typeof params.country === "string"
            ? filter.push(`mainGroup/taxationCountryId eq ${params.country}`)
            : filter.push(`mainGroup/taxationCountryId in (${params.country})`);
    }

    if (params.language) {
        typeof params.language === "string"
            ? filter.push(`mainGroup/defaultLanguageId eq ${params.language}`)
            : filter.push(`mainGroup/defaultLanguageId in (${params.language})`);
    }

    if (params.id) {
        const result = Array.from(
            new Set(
                params.id
                    .split(",")
                    .map((el) => el.trim())
                    .filter(Boolean)
            )
        );

        filter.push(`(${result.map((el) => `id eq ${el}`).join(" or ")})`);
    }

    if (params.mainGroupId) {
        const result = Array.from(
            new Set(
                params.mainGroupId
                    .split(",")
                    .map((el) => el.trim())
                    .filter(Boolean)
            )
        );

        filter.push(`(${result.map((el) => `mainGroupId eq ${el}`).join(" or ")})`);
    }

    if (params.isDeleted) {
        params.isDeleted === "true"
            ? filter.push(`mainGroup/deletedAt ne null`)
            : filter.push(`mainGroup/deletedAt eq null`);
    }

    if (params.isBlocked) filter.push(`mainGroup/isBlocked eq ${params.isBlocked}`);

    if (params.isStarCreator) filter.push(`mainGroup/isStarCreator eq ${params.isStarCreator}`);

    if (params.isOnWatchList) filter.push(`mainGroup/isOnWatchList  eq ${params.isOnWatchList}`);

    if (params.isTemporary) filter.push(`mainGroup/isTemporary  eq ${params.isTemporary}`);

    if (params.isFeatured) filter.push(`isFeatured eq ${params.isFeatured}`);

    if (params.nickname) filter.push(`startsWith(tolower(mainGroup/nickname), tolower('${params.nickname}'))`);

    if (params.emailOrPhone) {
        let newSearch: string;
        const reg = /^[0-9 +]+$/;

        const searchType = reg.test(params.emailOrPhone)
            ? "phoneNumber"
            : params.caseSensitive
            ? "email"
            : "toupper(email)";

        const searchValue =
            searchType === "phoneNumber"
                ? `'${params.emailOrPhone}'`
                : params.caseSensitive
                ? `'${params.emailOrPhone}'`
                : `toupper('${params.emailOrPhone}')`;

        params.filter === "eq"
            ? (newSearch = `${searchType} ${params.filter} ${searchValue}`)
            : (newSearch = `${params.filter}(${searchType}, ${searchValue})`);

        filter.push(newSearch);
    }

    if (params.authId) {
        filter.push(`appleId eq '${params.authId}' or googleId eq '${params.authId}'`);
    }

    if (params.date) {
        const dates = dateToODataFormat(params.date);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get<User[]>(`/api/user?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
