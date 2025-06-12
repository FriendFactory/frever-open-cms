import { useState, useEffect, useRef } from "react";

import { useCurrentStage } from "shared/hooks/useCurrentStage";
import { getCdnLink, UserMediaFileType } from "../services";

export const useMediaFileCdnLink = (entityName: UserMediaFileType, id: number, version?: string): string => {
    const stage = useCurrentStage();
    const [imageSrc, setImageSrc] = useState<string>("");

    const refetchCount = useRef<number>(0);
    const timeoutRef = useRef<any>(null);

    const fetchImageLink = async (version: string) => {
        try {
            const response = await getCdnLink(stage, { entityName, id, version });
            if (response.ok) {
                setImageSrc(response.link);
            }
        } catch (error) {
            if (refetchCount.current < 5) {
                refetchCount.current += 1;
                timeoutRef.current = setTimeout(() => {
                    fetchImageLink(version);
                }, 2000);
            }
        }
    };

    useEffect(() => {
        if (version) {
            fetchImageLink(version);
        }
        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }, [version]);

    return imageSrc;
};
