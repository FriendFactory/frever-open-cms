import React, { useCallback, useMemo } from "react";
import { useHistory, useLocation } from "react-router";
import { Input } from "antd";

import { BODY_ANIMATION_LINKER_URL } from "urls";

export interface SearchContainerProps {
    searchFor: "bodyAnimSearch" | "charSpawnPosSearch";
}

export function SearchContainer({ searchFor }: SearchContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = BODY_ANIMATION_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const handleChangeFilter = useCallback(
        (search: string) => {
            const skip = searchFor === "bodyAnimSearch" ? "bodyAnimSkip" : "charSpawnPosSkip";

            const newUrl = BODY_ANIMATION_LINKER_URL.replace(
                location,
                {},
                {
                    [searchFor]: search,
                    [skip]: 0
                }
            );

            if (newUrl) {
                history.push(newUrl);
            }
        },
        [history, location]
    );

    const disabled = useMemo(
        () =>
            searchFor === "bodyAnimSearch"
                ? !!urlMatch.query?.selectedBodyAnim
                : !!urlMatch.query?.selectedCharaSpawnPos,
        [urlMatch.query]
    );

    return (
        <Input.Search
            disabled={disabled}
            defaultValue={urlMatch.query?.[searchFor] ?? ""}
            onSearch={handleChangeFilter}
            placeholder="Search by ID or Name"
        />
    );
}
