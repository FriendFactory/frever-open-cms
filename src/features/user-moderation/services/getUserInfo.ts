import * as qs from "query-string";

import { request } from "shared";
import { UserPageSelector } from "urls";
import { User } from "./api";

export interface GetUserInfoParams {
    stage: string;
    selector: UserPageSelector;
    id: number;
}

export async function getUserInfo({ stage, selector, id }: GetUserInfoParams): Promise<User> {
    if (!stage) {
        throw new Error("Stage is required");
    }

    const query: any = {};
    query.$filter = `${selector} eq ${id}`;
    query.$expand = expand.toString();
    const response = await request(stage)
        .assetmanager()
        .get<User[]>(`/api/user?${qs.stringify(query)}`);

    if (response.status === 200) {
        return response.data[0];
    }

    throw new Error(`Status code: ${response.status}.`);
}

const expand = ["mainGroup", "character", "mainCharacter"];
