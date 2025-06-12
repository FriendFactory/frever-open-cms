import { request } from "shared";
import { CdnLink } from "./api";

export interface GetCdnLinkParams {
    id: number;
    entityName: string;
    version: string;
}

export async function getCdnLink(stage: string, params: GetCdnLinkParams): Promise<CdnLink> {
    const response = await request(stage)
        .asset()
        .get<CdnLink>(`/api/CdnLink/${params.entityName}/${params.id}/MainFile/iOS/${params.version}`);

    if (response.status === 200) return response.data;
    throw new Error(`Status code: ${response.status}.`);
}
