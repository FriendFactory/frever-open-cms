import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Input, Pagination, Row } from "antd";
import { ColumnsType } from "antd/es/table";

import { assetListHandleLoadAction, assetListPageSelector } from "features/search-assets/store";
import { AssetSearch } from "shared/components/AssetSearch";
import { AssetData, AssetDataNames } from "features/search-assets/services";

export interface AssetSearchContainerProps<T extends AssetDataNames = AssetDataNames, K extends AssetData = AssetData> {
    stage: string;
    asset: T;
    extraColumns?: ColumnsType<K[T]>;
    renderActionComponent?: (asset: K[T]) => JSX.Element;
}

export function AssetSearchContainer({ stage, asset, renderActionComponent }: AssetSearchContainerProps) {
    const dispatch = useDispatch();

    const [params, setParams] = useState<{ search?: string; skip?: number }>({});

    useEffect(() => {
        dispatch(
            assetListHandleLoadAction({
                stage,
                asset,
                params
            })
        );
    }, [params, stage]);

    const info = useSelector(assetListPageSelector(stage, params, asset));

    const handlePageChange = useCallback(
        (page: number) => {
            const skip = (page - 1) * info.pageSize;
            setParams({ ...params, skip });
        },
        [params]
    );

    return (
        <Row gutter={[0, 10]}>
            <Col flex="0 1 300px">
                <Input.Search
                    onSearch={(search) => setParams({ ...params, skip: 0, search })}
                    placeholder="Search by ID or Name"
                />
            </Col>
            <Col span={24}>
                <AssetSearch
                    stage={stage}
                    assetType={asset}
                    data={info.data ?? []}
                    loading={info.loading}
                    renderActionComponent={renderActionComponent}
                />
            </Col>
            <Col span={24}>
                <Pagination
                    showQuickJumper
                    showSizeChanger={false}
                    total={info.total}
                    pageSize={info.pageSize}
                    current={info.currentPage}
                    onChange={handlePageChange}
                />
            </Col>
        </Row>
    );
}
