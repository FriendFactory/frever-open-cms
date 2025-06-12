import { useState, useEffect } from "react";

import { getStorageFileCdnLink } from "../services/getStorageFileCdnLink";
import { useCurrentStage } from "shared/hooks/useCurrentStage";
import { CdnLink } from "features/user-media/services";

export const useStorageFileCdnLink = (version: string, extension: number, key: string) => {
    const stage = useCurrentStage();
    const [imageSrc, setImageSrc] = useState<(Partial<CdnLink> & { loading: boolean }) | null>(null);

    useEffect(() => {
        let refetchCount = 0;
        async function fetchImageLink() {
            setImageSrc({ loading: true });
            try {
                const response = await getStorageFileCdnLink(stage, version, extension, key);

                if (response.ok) {
                    setImageSrc({ ...response, loading: false });
                }
            } catch (error) {
                if (refetchCount < 5) {
                    refetchCount += 1;
                    setTimeout(() => {
                        fetchImageLink();
                    }, 2000);
                    return;
                }
                setImageSrc({ ok: false, loading: false });
            }
        }

        fetchImageLink();
    }, [version, key]);

    return imageSrc;
};
