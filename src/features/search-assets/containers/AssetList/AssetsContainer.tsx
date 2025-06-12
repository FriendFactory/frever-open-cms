import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Avatar, Button, Result, TableProps, theme } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import styled from "styled-components";
import { TableRowSelection } from "antd/es/table/interface";

import { assetListPageSelector } from "../../store";
import { DETAILS_ASSET_URL, SEARCH_ASSET_URL } from "urls";
import { showAssetsDeleteModalAction, assetEditAction } from "../../store/actions";
import { AssetTypes } from "config";
import { AssetData, AssetListParams, assetsAvailableForOffer, WardrobeAsset } from "features/search-assets/services";
import { AssetPrice } from "features/search-assets/components/AssetsGrid/AssetPrice";
import { AssetCommandContainer } from "./AssetCommandContainer";
import { ReadinessTag } from "shared/components/ReadinessTag";
import {
    assetListWithPricesPageSelector,
    AssetWithAssetOffer
} from "features/search-assets/store/assetListWithPricesSelectors";
import {
    actionColumnRender,
    ActionColumnRenderProps,
    createCdnURLFromFiles,
    createSortableColumnProps,
    EditableTable,
    EditableTableColumn,
    useExtraDataBundle
} from "shared";
import { BodyAnimationGroup } from "./BodyAnimationGroup";

export interface AssetsContainerProps {
    stage: string;
    assetType: AssetTypes;
    params: AssetListParams;
}

export function AssetsContainer({ stage, assetType, params }: AssetsContainerProps) {
    const history = useHistory();
    const dispatch = useDispatch();

    const isPricedAssetType = checkIsPricedAssetType(assetType);
    const infoSelector = isPricedAssetType ? assetListWithPricesPageSelector : assetListPageSelector;

    const info = useSelector(infoSelector(stage, params, assetType));
    const extraInfo = useExtraDataBundle([
        "Readiness",
        "WardrobeCollection",
        "Brand",
        "AssetTier",
        "WardrobeCategory",
        "WardrobeSubCategory"
    ]);

    const [selectedAssets, setSelectedAssets] = useState<AssetData[AssetTypes][]>([]);

    useEffect(() => () => setSelectedAssets([]), [stage, assetType]);

    const handleDeleteAsset = (asset: AssetData[AssetTypes]) => () =>
        dispatch(showAssetsDeleteModalAction({ assetToDeleteList: [asset] }));

    const handleOnFinish = useCallback(
        (data: AssetData[AssetTypes]) => dispatch(assetEditAction({ stage, asset: assetType, data })),
        [stage, assetType]
    );

    const sortableColumnProps = createSortableColumnProps(params.orderBy, params.sortDirection);

    const onRow = (record: AssetData[AssetTypes]) => ({
        onClick: () => history.push(DETAILS_ASSET_URL.format({ asset: assetType, stage, id: record.id }))
    });

    const rowSelection: TableRowSelection<AssetData[AssetTypes]> = {
        onChange: (_selectedRowKeys, selectedRows) => setSelectedAssets(selectedRows),
        selectedRowKeys: selectedAssets.map((asset) => asset.id),
        fixed: true
    };

    const columns: EditableTableColumn<AssetData[AssetTypes]>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 115,
            ...sortableColumnProps("id")
        },
        {
            title: "Name",
            dataIndex: "name",
            hidden: assetType === "CameraAnimationTemplate" || assetType === "Wardrobe",
            width: 225,
            editableCellProps: { type: "text" },
            ...sortableColumnProps("name")
        },
        {
            title: "Display Name",
            dataIndex: "displayName",
            hidden: assetType !== "CameraAnimationTemplate" && assetType !== "Wardrobe",
            width: 225,
            editableCellProps: { type: "text" }
        },
        {
            title: "Thumbnail",
            width: 120,
            render: (_, asset) => (
                <Avatar
                    shape="square"
                    size={86}
                    src={
                        asset?.files?.length
                            ? createCdnURLFromFiles({
                                  stage,
                                  id: asset.id,
                                  entityType: assetType,
                                  files: asset.files,
                                  resolution: "128x128"
                              })
                            : ""
                    }
                />
            )
        },
        {
            title: "Anim. Group",
            dataIndex: "bodyAnimationGroupId",
            hidden: assetType !== "BodyAnimation",
            render: (_, asset) =>
                "bodyAnimationGroupId" in asset ? <BodyAnimationGroup id={asset.bodyAnimationGroupId} /> : null,
            width: 115
        },
        {
            title: "Spawn. Group",
            dataIndex: "spawnPositionGroupId",
            hidden: assetType !== "CharacterSpawnPosition",
            width: 115
        },
        {
            title: "Created Time",
            hidden: assetType === "CameraAnimationTemplate",
            width: 160,
            render: (_, asset) =>
                "createdTime" in asset ? dayjs.utc(asset.createdTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown",
            ...sortableColumnProps("createdTime")
        },
        {
            title: "Modified Time",
            hidden: assetType === "CameraAnimationTemplate",
            width: 160,
            render: (_, asset) =>
                "modifiedTime" in asset ? dayjs.utc(asset.modifiedTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown",
            ...sortableColumnProps("modifiedTime")
        },
        {
            width: 155,
            title: "Readiness",
            hidden: assetType === "CharacterSpawnPosition",
            dataIndex: "readinessId",
            editableCellProps: {
                options: extraInfo.bundle.Readiness?.data?.map((el) => ({ label: el.name, value: el.id }))
            },
            render: (_, asset) =>
                "readinessId" in asset && <ReadinessTag stage={stage} readinessId={asset.readinessId} />
        },
        {
            title: "Price",
            hidden: !isPricedAssetType,
            width: 120,
            render: (_, asset: AssetWithAssetOffer<AssetTypes>) => {
                const isWardrobeAssetWithPrices =
                    assetType === "Wardrobe" && "softCurrencyPrice" in asset && "hardCurrencyPrice" in asset;

                return isWardrobeAssetWithPrices ? (
                    <AssetPrice
                        price={{
                            softCurrencyPrice: asset.softCurrencyPrice,
                            hardCurrencyPrice: asset.hardCurrencyPrice
                        }}
                    />
                ) : (
                    <AssetPrice assetOffer={asset?.assetOffer} />
                );
            },
            ...(assetType === "Wardrobe" && sortableColumnProps("price"))
        },
        {
            title: "Tier",
            hidden: assetType !== "Wardrobe",
            width: 120,
            render: (_, asset: AssetWithAssetOffer<AssetTypes>) =>
                extraInfo.bundle.AssetTier?.data?.find((el) => el.id === (asset as any).assetTierId)?.name,
            ...sortableColumnProps("assetTierId")
        },
        {
            title: "Collection",
            hidden: assetType !== "Wardrobe",
            width: 140,
            render: (_, asset: AssetWithAssetOffer<AssetTypes>) =>
                extraInfo.bundle.WardrobeCollection?.data?.find((el) => el.id === (asset as any).wardrobeCollectionId)
                    ?.name
        },
        {
            title: "Brand",
            hidden: assetType !== "Wardrobe",
            width: 140,
            render: (_, asset: AssetWithAssetOffer<AssetTypes>) =>
                extraInfo.bundle.Brand?.data?.find((el) => el.id === (asset as any).brandId)?.name
        },
        {
            title: "Category",
            hidden: assetType !== "Wardrobe",
            width: 140,
            render: (_, asset) =>
                extraInfo.bundle.WardrobeCategory?.data?.find(
                    (el) => el.id === (asset as WardrobeAsset)?.wardrobeCategoryId
                )?.name
        },
        {
            title: "Sub Category",
            hidden: assetType !== "Wardrobe",
            width: 140,
            render: (_, asset) =>
                extraInfo.bundle.WardrobeSubCategory?.data?.find(
                    (el) => el.id === (asset as WardrobeAsset)?.wardrobeSubCategoryIds?.[0]
                )?.name
        }
    ];

    const handleOnChange: TableProps<AssetData[AssetTypes]>["onChange"] = (_paging, _filter, sorter: any) => {
        const params: AssetListParams = {
            orderBy: sorter.order ? (sorter.columnKey as AssetListParams["orderBy"]) : undefined,
            sortDirection: sorter.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = SEARCH_ASSET_URL.replace(location, {}, { ...params });
        newUrl && history.push(newUrl);
    };

    const actionColumn = {
        title: <AssetCommandContainer stage={stage} assetType={assetType} assetList={selectedAssets} />,
        render: (props: ActionColumnRenderProps<AssetData[AssetTypes]>) =>
            actionColumnRender({
                ...props,
                extra: (asset) =>
                    assetType !== "SetLocation" &&
                    assetType !== "CharacterSpawnPosition" && (
                        <Button
                            type="primary"
                            ghost
                            danger
                            icon={<DeleteOutlined />}
                            onClick={handleDeleteAsset(asset)}
                        />
                    )
            })
    };

    if (info.error) return <Result status="404" title={info.error} />;

    return (
        <AssetsGridWrapper>
            <EditableTable
                loading={(info.loading && !info.data) || extraInfo.loading}
                dataSource={info.data}
                rowSelection={rowSelection}
                onRow={onRow}
                onChange={handleOnChange}
                columns={columns}
                actionColumnProps={actionColumn}
                pagination={false}
                scroll={{ x: 750 }}
                onFinish={handleOnFinish}
            />
        </AssetsGridWrapper>
    );
}

const checkIsPricedAssetType = (asset: AssetTypes) => assetsAvailableForOffer.some((el) => el === asset);

const AssetsGridWrapper = styled.div`
    & .ant-tag {
        white-space: normal !important;
    }

    & img {
        background-color: ${() => {
            const { token } = theme.useToken();
            return token.colorBgLayout;
        }};
    }
`;
