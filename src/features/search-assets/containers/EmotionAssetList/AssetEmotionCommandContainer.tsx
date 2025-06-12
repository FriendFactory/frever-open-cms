import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import { AssetListParams, EmotionAsset, EmotionAssetName } from "features/search-assets/services";
import { updateAssetEmotionsAction } from "features/search-assets/store";
import { useCurrentStage } from "shared";

interface AssetEmotionCommandContainerProps<T extends EmotionAssetName = EmotionAssetName> {
    value: EmotionAsset<T>;
    asset: T;
    emotionId: string;
    params: AssetListParams;
    disabled: boolean;
}

export function AssetEmotionCommandContainer({
    disabled,
    value,
    asset,
    params,
    emotionId
}: AssetEmotionCommandContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const isAdded = value.emotions?.includes(Number(emotionId));

    const handleOnClick = () => {
        const emotions = isAdded
            ? value.emotions?.filter((el) => el !== Number(emotionId)) || []
            : [Number(emotionId), ...(value.emotions || [])];

        dispatch(updateAssetEmotionsAction({ stage, params, emotionId, asset, value: { ...value, emotions } }));
    };

    return (
        <Button
            type="primary"
            disabled={disabled}
            ghost
            danger={isAdded}
            onClick={handleOnClick}
            icon={isAdded ? <MinusOutlined /> : <PlusOutlined />}
        />
    );
}
