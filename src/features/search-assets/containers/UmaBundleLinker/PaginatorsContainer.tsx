import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { Col, Pagination, Row } from "antd";

import { DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE, UMA_BUNDLE_LINKER_URL } from "urls";

export interface PaginatorsContainerProps {}

export function PaginatorsContainer({}: PaginatorsContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = UMA_BUNDLE_LINKER_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const handleBaseBunPageChange = useCallback(
        (page: number) => {
            const newUrl = UMA_BUNDLE_LINKER_URL.replace(location, {}, {
                baseBunSkip: (page - 1) * DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE
            } as any);
            if (newUrl) {
                history.push(newUrl);
            }
        },
        [location]
    );

    const handleVersionBunPageChange = useCallback(
        (page: number) => {
            const newUrl = UMA_BUNDLE_LINKER_URL.replace(location, {}, {
                versionBunSkip: (page - 1) * DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE
            } as any);
            if (newUrl) {
                history.push(newUrl);
            }
        },
        [location]
    );

    const { baseBunSkip, versionBunSkip } = urlMatch.query || {};

    const currentBaseBunPage = Math.floor((baseBunSkip ?? 0) / DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE) + 1;
    const currentVersionBunPage = Math.floor((versionBunSkip ?? 0) / DEFAULT_UMA_BUNDLE_LIST_PAGE_SIZE) + 1;

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Pagination
                    showQuickJumper
                    showSizeChanger={false}
                    total={6000}
                    current={currentBaseBunPage}
                    onChange={handleBaseBunPageChange}
                />
            </Col>
            <Col span={12}>
                <Pagination
                    showQuickJumper
                    showSizeChanger={false}
                    total={6000}
                    current={currentVersionBunPage}
                    onChange={handleVersionBunPageChange}
                />
            </Col>
        </Row>
    );
}
