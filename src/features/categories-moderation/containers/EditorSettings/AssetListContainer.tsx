import React, { useEffect, useMemo } from "react";
import { List, Button, Avatar } from "antd";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { createCdnURLFromFiles } from "shared";
import { EditorSettingsAssetsType } from "./AssetListFieldContainer";
import { assetListPageSelector, assetListHandleLoadAction } from "features/search-assets/store";
import {
    ExternalSong,
    CameraAnimationTemplateAsset,
    VoiceFilterAsset,
    AssetListParams
} from "features/search-assets/services";

interface AssetListContainerProps {
    stage: string;
    assetType: EditorSettingsAssetsType;
    value?: number[];
    handleOnChangeFieldValue: (id: number, action: "add" | "remove") => () => void;
}

export function AssetListContainer({ stage, assetType, value, handleOnChangeFieldValue }: AssetListContainerProps) {
    const dispatch = useDispatch();

    const params: AssetListParams | null = useMemo(
        () => (value?.length ? { search: value.toString(), orderBy: "id", take: value.length } : null),
        [value]
    );

    const { data, loading } = useSelector(assetListPageSelector(stage, params || {}, assetType), shallowEqual);

    useEffect(() => {
        if (params && !loading && !data) {
            dispatch(
                assetListHandleLoadAction({
                    stage,
                    asset: assetType,
                    params
                })
            );
        }
    }, [params]);

    const assetList = value?.map((el) => data?.find((asset) => asset.id === el) ?? { id: el });

    return (
        <List
            dataSource={assetList}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <List.Item.Meta
                        title={`ID: ${item.id}`}
                        description={createDescription(item)}
                        avatar={
                            "files" in item ? (
                                <Avatar
                                    size={80}
                                    shape="square"
                                    src={createCdnURLFromFiles({
                                        id: item.id,
                                        entityType: assetType,
                                        stage,
                                        resolution: "128x128",
                                        files: item.files
                                    })}
                                />
                            ) : null
                        }
                    />
                    <Button type="link" danger onClick={handleOnChangeFieldValue(item.id, "remove")}>
                        Remove
                    </Button>
                </List.Item>
            )}
        />
    );
}

const createDescription = (asset: ExternalSong | CameraAnimationTemplateAsset | VoiceFilterAsset | { id: number }) => {
    if ("displayName" in asset) {
        return asset.displayName;
    }
    if ("songName" in asset) {
        return asset.songName;
    }
    return "";
};
