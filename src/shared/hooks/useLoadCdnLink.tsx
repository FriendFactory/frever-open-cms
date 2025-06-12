import { useEffect, useState } from "react";

import { GetCdnLinkParams, getCdnLink } from "features/user-media/services";

const RETRY_COUNT = 5;
const RETRY_DELAY = 5000;

export const useLoadCdnLink = (
    stage: string,
    params: GetCdnLinkParams | null | undefined,
    retryCount: number = RETRY_COUNT,
    retryDelay: number = RETRY_DELAY
) => {
    const [state, setState] = useState<{ loading: boolean; url: string; error?: string }>({
        loading: false,
        url: ""
    });

    useEffect(() => {
        if (params) {
            let attempts = 0;

            const fetchCdnLink = async () => {
                setState({ ...state, loading: true });

                while (attempts < retryCount) {
                    try {
                        const response = await getCdnLink(stage, params);
                        if (response.ok) {
                            setState({ loading: false, url: response.link });
                            return;
                        } else {
                            throw new Error("Failed to fetch the CDN link");
                        }
                    } catch (e) {
                        attempts++;
                        if (attempts >= retryCount) {
                            setState({ loading: false, url: "", error: (e as Error).message });
                        } else {
                            await new Promise((res) => setTimeout(res, retryDelay));
                        }
                    }
                }
            };

            fetchCdnLink();
        }
    }, [stage, params?.version]);

    return state;
};
