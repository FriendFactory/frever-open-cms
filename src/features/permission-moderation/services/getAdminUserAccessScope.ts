import { CancelToken } from "axios";
import { request } from "shared";
import { AdminAccessScope } from "./api";

interface MemoizedResult {
    status: "initial" | "pending" | "finished";
    data?: AdminAccessScope[];
}

const cache: Record<string, MemoizedResult> = {};

export const getAdminUserAccessScope = async (
    stage: string,
    groupId: string,
    cancelToken?: CancelToken
): Promise<AdminAccessScope[]> => {
    if (cache[stage]?.status === "finished") {
        return cache[stage].data!;
    }

    if (cache[stage]?.status === "pending") {
        // Wait for the pending request to finish
        while (cache[stage].status === "pending") {
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
        return cache[stage].data!;
    }

    cache[stage] = { status: "pending" };

    try {
        const result = await request(stage).assetmanager().get(`api/role/moderation/access-scope/${groupId}`, {
            cancelToken
        });

        if (result.status === 200) {
            cache[stage] = { status: "finished", data: result.data };
            return result.data;
        }

        throw new Error(`Status code ${result.status}`);
    } catch (error) {
        cache[stage] = { status: "initial" };
        return [];
    }
};
