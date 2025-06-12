import React from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { ColumnProps } from "antd/es/table";

import { createCdnURLFromFiles } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { ReadinessTag } from "shared/components/ReadinessTag";
import { EmotionAssetListPageResult } from "features/search-assets/store/reducer/asset/emotionAssetListReducer";
import { EmotionAssetInfo } from "./EmotionAssetListContainer";
import { AssetEmotionCommandContainer } from "./AssetEmotionCommandContainer";
import { AssetListParams, EmotionAssetName, assetsWithEmotions } from "features/search-assets/services";

export interface EmotionAssetListTableContainerProps {
    data: EmotionAssetListPageResult["data"];
    stage: string;
    emotionId: string;
    params: AssetListParams;
    loading: boolean;

    onFilter: (list: EmotionAssetName[]) => void;
}

export function EmotionAssetListTableContainer({
    stage,
    data,
    params,
    emotionId,
    loading,
    onFilter
}: EmotionAssetListTableContainerProps) {
    const columns: ColumnProps<EmotionAssetInfo>[] = [
        {
            title: "ID",
            width: 150,
            render: (_, record) => record.entity.id
        },
        {
            title: "Asset Type",
            width: 150,
            filters: filters,
            render: (_, record) => displayNameMap[record.asset]
        },
        {
            title: "Name",
            width: 200,
            render: (_, record) => (
                <Link to={DETAILS_ASSET_URL.format({ stage, asset: record.asset, id: record.entity.id })}>
                    {record.entity.name}
                </Link>
            )
        },
        {
            title: "Thumbnail",
            width: 150,
            render: (_, record) => (
                <ThumbnailCard
                    width={100}
                    imageUrl={createCdnURLFromFiles({
                        id: record.entity.id,
                        stage,
                        entityType: record.asset,
                        files: record.entity.files,
                        resolution: "128x128"
                    })}
                />
            )
        },
        {
            title: "Readiness",
            width: 150,
            render: (_, record) => <ReadinessTag stage={stage} readinessId={record.entity.readinessId} />
        },
        {
            title: "",
            width: 80,
            align: "right",
            render: (_, record) => (
                <AssetEmotionCommandContainer
                    disabled={loading}
                    params={params}
                    asset={record.asset}
                    value={record.entity}
                    emotionId={emotionId}
                />
            )
        }
    ];

    return (
        <Table
            pagination={false}
            scroll={{ x: 600 }}
            onChange={(_, filters) => onFilter(filters[1] as unknown as EmotionAssetName[])}
            rowKey={(record) => record.entity.id}
            dataSource={data}
            columns={columns}
        />
    );
}

const displayNameMap: Record<string, string> = {
    bodyanimation: "Body Animation",
    song: "Song"
};

const filters = assetsWithEmotions.map((el) => ({
    text: displayNameMap[el.toLowerCase()],
    value: el
}));
