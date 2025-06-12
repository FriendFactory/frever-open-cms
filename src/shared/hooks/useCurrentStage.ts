import { useMemo } from "react";
import { useLocation } from "react-router";

import { goToLogin } from "shared/request";
import { BASE_PAGE_URL } from "urls";

export const useCurrentStage = (): string => {
    const location = useLocation();

    const urlMatch = useMemo(() => BASE_PAGE_URL.match(location), [location]);

    if (!urlMatch.isMatched) {
        goToLogin();
        return "";
    }

    return urlMatch.params.stage;
};
