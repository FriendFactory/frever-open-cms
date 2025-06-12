import { useEffect, useState } from "react";
import axios from "axios";

import { checkUserAccess } from "shared/checkUserAccess";
import { FeaturesTypes } from "config";

export type AccessCheckStatus = "initial" | "pending" | "finished";

export const useAccessCheck = (feature: FeaturesTypes) => {
    const [status, setStatus] = useState<AccessCheckStatus>("initial");
    const [hasAccess, setHasAccess] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        const cancelTokenSource = axios.CancelToken.source();

        const fetchData = async () => {
            if (isMounted) {
                setStatus("pending");
                const source = axios.CancelToken.source();

                const access = await checkUserAccess(feature, source.token);
                setHasAccess(access);
                setStatus("finished");
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            cancelTokenSource.cancel("Request canceled due to component unmount");
        };
    }, [feature]);

    return { status, hasAccess };
};
