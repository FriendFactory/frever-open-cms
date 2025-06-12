import { getCurrentEnvs } from "features/auth";
import { useEffect, useRef, useState } from "react";

import { getUserEmail, getUserGroupId } from "shared/checkUserAccess";
import { AdminAccessScope, getAdminUserAccessScope } from "../services";

export function useCurrentCMSAdminUser() {
    const [loading, setLoading] = useState<boolean>(false);
    const email = useRef<string>();
    const [cmsAdminUserInfo, setCMSAdminUserInfo] = useState<
        Record<string, { groupId: string; scopes: AdminAccessScope[] }>
    >({});

    useEffect(() => {
        const getScopes = async () => {
            setLoading(true);
            const envs = getCurrentEnvs();

            for (const stage of envs) {
                if (!email.current) email.current = getUserEmail(stage);
                const groupId = getUserGroupId(stage);
                const scopes = await getAdminUserAccessScope(stage, groupId);
                setCMSAdminUserInfo((prev) => ({ ...prev, [stage]: { groupId, scopes } }));
            }

            setLoading(false);
        };

        getScopes();
    }, []);

    return { cmsAdminUserInfo, loading, email: email.current };
}
