import React, { useCallback } from "react";
import { UrlPath } from "rd-url-utils";
import { Pagination } from "antd";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { AppState } from "app-state";

export interface PagingInfoSelectResult {
    total: number;
    pageSize: number;
    currentPage: number;
}

export interface ListPagerContainerProps<TParams extends { stage: string }, TQuery extends { skip?: number }> {
    url: UrlPath<TParams, TQuery>;
    selectorFactory: (
        stage: string,
        query: TQuery,
        ...extraArgs: any[]
    ) => (appState: AppState) => PagingInfoSelectResult;
    extraSelectFactoryArgs?: any[];
    defaultPageSize: number;
}

export function ListPagerContainer<TParams extends { stage: string }, TQuery extends { skip?: number }>({
    url,
    selectorFactory,
    extraSelectFactoryArgs,
    defaultPageSize
}: ListPagerContainerProps<TParams, TQuery>) {
    const location = useLocation();

    const urlMatch = url.match(location);
    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const history = useHistory();

    const handlePageChange = useCallback(
        (page: number) => {
            const newUrl = url.replace(location, {}, { skip: (page - 1) * defaultPageSize } as any);
            if (newUrl) {
                history.push(newUrl);
            }
        },
        [location]
    );

    const info = useSelector(
        selectorFactory(urlMatch.params.stage, urlMatch.query || ({} as any), ...(extraSelectFactoryArgs ?? []))
    );

    return (
        <Pagination
            showSizeChanger={false}
            total={info.total}
            pageSize={info.pageSize}
            current={info.currentPage}
            onChange={handlePageChange}
        />
    );
}
