import { CancelToken } from "axios";

import { FeaturesTypes } from "config";
import { getServerAuth } from "features/auth";
import { decodeToken } from "utils/decodeToken";
import { getAdminUserAccessScope } from "features/permission-moderation/services";
import { getCurrentStageTab } from "./services";

const cache = new Map<string, boolean>();

export const checkUserAccess = async (feature: FeaturesTypes, cancelToken?: CancelToken): Promise<boolean> => {
    const cachedValue = cache.get(feature);
    if (cachedValue !== undefined) return cachedValue;

    try {
        const stageId = getCurrentStageTab();
        const groupId = getUserGroupId(stageId);
        const userAccessScope = await getAdminUserAccessScope(stageId, groupId, cancelToken);
        const result = userAccessScope?.some((el) => el.name === feature);

        cache.set(feature, result);
        return result;
    } catch (e) {
        return false;
    }
};

export const getUserEmail = (stage: string): string => {
    const stageAuth = getServerAuth(stage);
    const decodedToken = decodeToken(stageAuth?.access_token ?? "");

    const email = decodedToken?.email;

    if (email) return email;
    throw new Error("Email not found");
};

export const getUserGroupId = (stage: string): string => {
    const stageAuth = getServerAuth(stage);
    const decodedToken = decodeToken(stageAuth?.access_token ?? "");

    const groupId = decodedToken?.PrimaryGroupId;

    if (groupId) return groupId;
    throw new Error("CMS User GroupId not found");
};
