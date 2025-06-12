import React, { useMemo } from "react";
import { Input, Pagination, Row, Col, TableProps, Table } from "antd";
import { ColumnType } from "antd/lib/table";

import { useAssetSearch } from "shared/hooks/useAssetSearch";
import { AssetData, AssetDataNames, AssetListParams, CharacterSpawnPosition } from "features/search-assets/services";
import { assetColumnsCreators } from "shared/components/AssetColumns";
import { AssetIpFilter } from "features/search-assets/containers/AssetList/AssetIpFilter";
import { ColAlignRight } from "shared/components/ColAlignRight";

const pageSizeOptions = [20, 50, 100, 200, 300, 400, 500];

export interface AssetSearchContainerProps<T extends AssetDataNames = AssetDataNames, K extends AssetData = AssetData>
    extends TableProps<any> {
    stage: string;
    asset: T;
    actionColumn?: ColumnType<K[T]>;
    baseSearchParams?: AssetListParams;
    excludeSpawnPostionWithEmptySetLocation?: boolean;
    useCompactWardrobeList?: boolean;
    renderSearchForm?: (onSearch: (newParams: AssetListParams) => void) => React.ReactNode;
}

export function AssetSearchTableContainer({
    stage,
    asset,
    actionColumn = {},
    baseSearchParams,
    excludeSpawnPostionWithEmptySetLocation,
    renderSearchForm,
    useCompactWardrobeList,
    ...tableProps
}: AssetSearchContainerProps) {
    const { info, pageChange, onSearch } = useAssetSearch({ stage, asset, baseSearchParams, useCompactWardrobeList });

    // This is needed for the Task page to avoid errors when the Character Spawn Position doesn't have a SetLocation.
    const dataCharacterSpawnPostion: CharacterSpawnPosition[] | undefined = useMemo(() => {
        return excludeSpawnPostionWithEmptySetLocation && asset === "CharacterSpawnPosition"
            ? (info.data as CharacterSpawnPosition[])?.filter((value) => "setLocation" in value)
            : undefined;
    }, [info.data]);

    const mergedColumns = useMemo(
        () => [...assetColumnsCreators[asset](stage), actionColumn],
        [stage, asset, actionColumn]
    );

    return (
        <Row gutter={[0, 10]}>
            {typeof renderSearchForm !== "undefined" ? (
                <Col span={24}>{renderSearchForm(onSearch)}</Col>
            ) : (
                <>
                    <Col flex="0 1 300px">
                        <Input.Search onSearch={(search) => onSearch({ search })} />
                    </Col>

                    {asset === "Wardrobe" && (
                        <ColAlignRight>
                            <AssetIpFilter asset={asset} search={onSearch} />
                        </ColAlignRight>
                    )}
                </>
            )}
            <Col span={24}>
                <Table
                    rowKey={getRowKey}
                    loading={info.loading}
                    dataSource={!dataCharacterSpawnPostion ? info.data : dataCharacterSpawnPostion}
                    columns={mergedColumns}
                    pagination={false}
                    scroll={{ x: 500, y: "calc(100vh - 300px)" }}
                    {...tableProps}
                />
            </Col>
            <Col span={24}>
                <Pagination
                    showQuickJumper
                    total={info.total}
                    pageSize={info.pageSize}
                    pageSizeOptions={pageSizeOptions}
                    current={info.currentPage}
                    onChange={pageChange}
                />
            </Col>
        </Row>
    );
}

const getRowKey = (entity: { id: number }) => entity.id;
