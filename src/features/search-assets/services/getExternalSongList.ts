import * as qs from "query-string";

import { request } from "shared";
import { ExternalSong } from ".";
import { DEFAULT_ASSETS_PAGE_SIZE } from "urls";
import { dateToODataFormat } from "utils";

export interface ExternalSongListQueryParams {
    skip?: number;
    take?: number;

    id?: number;
    songName?: string;
    artistName?: string;
    externalTrackId?: number;
    isDeleted?: "true" | "false";
    countries?: string | string[];
    isrc?: string;
    licenseTime?: string;

    orderBy?: "id" | "songName" | "artistName" | "challengeSortOrder" | "sortOrder" | "lastLicenseStatusCheckAt";
    sortDirection?: "asc" | "desc";
}

export async function getExternalSongList(stage: string, params: ExternalSongListQueryParams): Promise<ExternalSong[]> {
    const query: any = {};

    query.$top = params.take ?? DEFAULT_ASSETS_PAGE_SIZE;
    query.$orderby = `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`;
    query.$skip = params.skip ?? 0;

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);

    if (params.externalTrackId)
        filter.push(`musicController/any(controller: controller/externalTrackId eq ${params.externalTrackId})`);

    if (params.songName) filter.push(`contains(tolower(songName), tolower('${params.songName}'))`);

    if (params.artistName) filter.push(`contains(tolower(artistName), tolower('${params.artistName}'))`);

    if (params.isDeleted) filter.push(`isDeleted eq ${params.isDeleted}`);

    if (params.isrc) filter.push(`contains(tolower(isrc), tolower('${params.isrc}'))`);

    if (params.countries) {
        typeof params.countries === "string"
            ? filter.push(`excludedCountries/any(country: country eq '${params.countries}')`)
            : filter.push(
                  params.countries.map((country) => `excludedCountries/any(c: c eq '${country}')`).join(" or ")
              );
    }

    if (params.licenseTime) {
        const dates = dateToODataFormat(params.licenseTime);
        if (dates)
            filter.push(`lastLicenseStatusCheckAt ge ${dates.start} and lastLicenseStatusCheckAt le ${dates.end}`);
    }

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/externalSong?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
