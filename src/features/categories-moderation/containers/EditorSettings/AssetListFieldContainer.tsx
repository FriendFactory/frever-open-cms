import React, { useCallback } from "react";
import { Card } from "antd";
import { shallowEqual } from "react-redux";

import { AssetListModal } from "./AddAssetModalContainer";
import { AssetListContainer } from "./AssetListContainer";

export type EditorSettingsAssetsType = "ExternalSong" | "CameraAnimationTemplate" | "VoiceFilter";

export interface AssetListFieldContainerProps {
    stage: string;
    assetType: EditorSettingsAssetsType;
    value?: number[];
    onChangeFieldValue: (value: number[]) => void;
}

export function AssetListFieldContainer({ assetType, stage, value, onChangeFieldValue }: AssetListFieldContainerProps) {
    const checkIsAssetLinked = useCallback((id: number) => value?.some((el) => el === id) ?? false, [value]);

    const handleOnChangeFieldValue = useCallback(
        (id: number, action: "add" | "remove") => () => {
            action === "add"
                ? onChangeFieldValue(value ? [...value, id] : [id])
                : onChangeFieldValue(value?.filter((el) => el !== id) ?? []);
        },
        [value]
    );

    return (
        <Card
            title={`${assetNames[assetType]} List`}
            bodyStyle={{ padding: "0 24px" }}
            type="inner"
            extra={
                <MemoizedAssetListModal
                    stage={stage}
                    assetType={assetType}
                    handleOnChangeFieldValue={handleOnChangeFieldValue}
                    checkIsAssetLinked={checkIsAssetLinked}
                />
            }>
            <MemoizedAssetListContainer
                stage={stage}
                value={value}
                assetType={assetType}
                handleOnChangeFieldValue={handleOnChangeFieldValue}
            />
        </Card>
    );
}

const MemoizedAssetListModal = React.memo(AssetListModal, shallowEqual);
const MemoizedAssetListContainer = React.memo(AssetListContainer, shallowEqual);

const assetNames = {
    ExternalSong: "External Song",
    CameraAnimationTemplate: "CameraAnimation Template",
    VoiceFilter: "Voice Filter"
};
