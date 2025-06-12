import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { FilterValue, SorterResult } from "antd/lib/table/interface";

import { UMA_BUNDLE_DETAILS_URL, UMA_BUNDLE_SEARCH_URL } from "urls";
import { umaBundleListPageSelector } from "features/search-assets/store";
import { UmaBundleGrid } from "features/search-assets/components/UmaBundleSearch/UmaBundleGrid";
import { UmaBundle } from "features/search-assets/services";
import { useExtraData } from "shared/hooks/useExtraData";

export function UmaBundleGridContainer() {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = UMA_BUNDLE_SEARCH_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const info = useSelector(umaBundleListPageSelector(urlMatch.params.stage, urlMatch.query || {}));
    const readinessList = useExtraData({ stage: urlMatch.params.stage, name: "Readiness" });

    const handleTableOnChange = (
        _paging: unknown,
        filter: Record<string, FilterValue | null>,
        sorter: SorterResult<any>
    ) => {
        const readinessFilter = filter.readiness ? filter.readiness.toString() : undefined;
        const bundleTypeFilter = filter.bundleType ? filter.bundleType.toString() : undefined;

        const [orderBy, sortDirection] =
            sorter.columnKey && sorter.order
                ? [sorter.columnKey as any, sorter.order === "ascend" ? "asc" : ("desc" as any)]
                : [undefined, undefined];

        const newUrl = UMA_BUNDLE_SEARCH_URL.replace(
            location,
            {},
            {
                readinessFilter,
                bundleTypeFilter,
                orderBy,
                sortDirection,
                skip: 0
            }
        );

        if (newUrl) {
            history.push(newUrl);
        }
    };

    const onRow = (record: UmaBundle) => ({
        onClick: () => history.push(UMA_BUNDLE_DETAILS_URL.format({ stage: urlMatch.params.stage, id: record.id }))
    });

    return (
        <UmaBundleGrid
            loading={(!info.data && info.loading) || readinessList.loading}
            data={info.data ?? []}
            sortDirection={urlMatch.query?.sortDirection}
            orderBy={urlMatch.query?.orderBy}
            readinessList={readinessList.data ?? []}
            readinessFilter={urlMatch.query?.readinessFilter}
            bundleTypeFilter={urlMatch.query?.bundleTypeFilter}
            handleTableOnChange={handleTableOnChange}
            onRow={onRow}
        />
    );
}
