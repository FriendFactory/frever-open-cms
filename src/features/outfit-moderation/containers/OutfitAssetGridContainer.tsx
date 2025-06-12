import React, { useCallback } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Button, Card, Popconfirm, Table } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { ColumnProps } from "antd/es/table";
import { useDispatch } from "react-redux";

import { OUTFIT_DETAILS_URL } from "urls";
import { assetColumnsCreators } from "shared/components/AssetColumns";
import { WardrobeAsset } from "features/search-assets/services";
import { removeOutfitWardrobeAction } from "../store";
import { outfitWardrobesSelector } from "../store/reducer/outfitDetails.reducer";

export interface OutfitAssetGridContainerProps {}

export function OutfitAssetGridContainer({}: OutfitAssetGridContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = OUTFIT_DETAILS_URL.match(location);
    if (!urlMatch.isMatched) return <div></div>;

    const { stage, id } = urlMatch.params;
    const info = useSelector(outfitWardrobesSelector(stage, id));

    const handleRemoveAsset = useCallback(
        (wardrobeId: number) => () =>
            dispatch(
                removeOutfitWardrobeAction({
                    stage,
                    wardrobeId,
                    outfitId: id
                })
            ),
        [stage, id]
    );

    const getRowKey = useCallback(({ id }: WardrobeAsset) => id, []);
    const columns: ColumnProps<WardrobeAsset>[] = [
        ...assetColumnsCreators["Wardrobe"](stage),
        {
            title: "",
            align: "right",
            width: "65px",
            render: (_, asset) => (
                <Popconfirm title="Remove?" onConfirm={handleRemoveAsset(asset.id)}>
                    <Button danger icon={<MinusOutlined />} />
                </Popconfirm>
            )
        }
    ];

    return (
        <Card title={`Contained Assets (${info.count} items)`}>
            <Table
                columns={columns}
                dataSource={info.wardrobes}
                loading={info.loading}
                rowKey={getRowKey}
                scroll={{ x: 550 }}
            />
        </Card>
    );
}
