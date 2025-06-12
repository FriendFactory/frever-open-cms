import React, { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { Pagination } from "antd";

import { DEFAULT_ASSETS_PAGE_SIZE, BODY_ANIMATION_LINKER_URL } from "urls";

export interface PaginatorsContainerProps {
    skipFor: "bodyAnimSkip" | "charSpawnPosSkip";
}

export function PaginatorContainer({ skipFor }: PaginatorsContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = BODY_ANIMATION_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const handleChangePage = useCallback(
        (page: number) => {
            const newUrl = BODY_ANIMATION_LINKER_URL.replace(location, {}, {
                [skipFor]: (page - 1) * DEFAULT_ASSETS_PAGE_SIZE
            } as any);
            if (newUrl) {
                history.push(newUrl);
            }
        },
        [location]
    );

    const skip = urlMatch.query?.[skipFor];

    const currentPage = Math.floor((skip ?? 0) / DEFAULT_ASSETS_PAGE_SIZE) + 1;

    const disabled = useMemo(
        () =>
            skipFor === "bodyAnimSkip" ? !!urlMatch.query?.selectedBodyAnim : !!urlMatch.query?.selectedCharaSpawnPos,
        [urlMatch.query]
    );

    return (
        <Pagination
            disabled={disabled}
            showQuickJumper={false}
            showSizeChanger={false}
            total={6000}
            current={currentPage}
            onChange={handleChangePage}
        />
    );
}
