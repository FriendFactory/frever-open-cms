import React from "react";
import { Button, Row, theme } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import { SortOrderTypes } from "features/video-templates/services";
import styled from "styled-components";

export interface LoadMoreProps {
    sortOrderType: SortOrderTypes;
    withValueLoadedCount: number;
    withValueCount?: number;
    restLoadedCount: number;
    restCount?: number;
    allLoaded: boolean;
    handleLoadMore: () => void;
}

export function LoadMore({
    sortOrderType,
    withValueLoadedCount,
    withValueCount,
    restLoadedCount,
    restCount,
    allLoaded,
    handleLoadMore
}: LoadMoreProps) {
    const { token } = theme.useToken();
    return (
        <LoadMoreWrapper padding={token.padding}>
            <Row justify="space-between" gutter={[token.padding, token.padding]}>
                <div>
                    With {sortOrderType} value.
                    <br />
                    Loaded {withValueLoadedCount} of {withValueCount ?? "unknown"}
                </div>
                <div>
                    Without {sortOrderType} value.
                    <br />
                    Loaded {restLoadedCount} of {restCount ?? "unknown"}
                </div>

                <div>
                    <Button
                        type="primary"
                        size="large"
                        disabled={allLoaded}
                        onClick={handleLoadMore}
                        icon={<DownloadOutlined />}>
                        Load more templates
                    </Button>
                </div>
            </Row>
        </LoadMoreWrapper>
    );
}

const LoadMoreWrapper = styled.div<{ padding: number }>`
    padding: ${(props) => props.padding}px;
`;
