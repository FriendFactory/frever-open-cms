import React from "react";
import { Button, Card, Space } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { ListLayoutFragment } from "layout";
import { useEmotionAssetList } from "features/search-assets/hooks/useEmotionAssetList";
import { EmotionAsset, EmotionAssetName } from "features/search-assets/services";
import { EmotionAssetListTableContainer } from "./EmotionAssetListTableContainer";
import { EmotionAssetListFilterContainer } from "./EmotionAssetListFilterContainer";
import { AssetListModalContainer } from "./AssetListModalContainer";
import { AssetEmotionCommandContainer } from "./AssetEmotionCommandContainer";

export interface EmotionAssetInfo<T extends EmotionAssetName = EmotionAssetName> {
    asset: T;
    entity: EmotionAsset<T>;
}

export interface EmotionAssetListContainerProps {
    stage: string;
    emotionId: string;
}

export function EmotionAssetListContainer({ stage, emotionId }: EmotionAssetListContainerProps) {
    const { info, params, onFilter, onSearch, pageChange, isNextPageAvailable, isPrevPageAvailable } =
        useEmotionAssetList(stage, emotionId);

    return (
        <Card
            loading={!info.data && info.loading}
            title="Assets"
            extra={
                <AssetListModalContainer
                    renderCommandColumn={(value, assetType) => (
                        <AssetEmotionCommandContainer
                            disabled={info.loading}
                            params={params}
                            asset={assetType}
                            value={value as EmotionAsset}
                            emotionId={emotionId}
                        />
                    )}
                />
            }>
            <ListLayoutFragment>
                <EmotionAssetListFilterContainer stage={stage} onFinish={onSearch} baseParams={params} />

                <EmotionAssetListTableContainer
                    onFilter={onFilter}
                    params={params}
                    loading={info.loading}
                    data={info.data}
                    stage={stage}
                    emotionId={emotionId}
                />

                <Space size="small" style={{ marginTop: "1rem" }}>
                    <Button disabled={!isPrevPageAvailable} onClick={() => pageChange("prev")}>
                        <ArrowLeftOutlined /> Prev
                    </Button>
                    <Button disabled={!isNextPageAvailable} onClick={() => pageChange("next")}>
                        Next <ArrowRightOutlined />
                    </Button>
                </Space>
            </ListLayoutFragment>
        </Card>
    );
}
