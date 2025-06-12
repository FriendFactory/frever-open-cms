import React, { useEffect, useMemo } from "react";
import { UrlPath } from "rd-url-utils";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography } from "antd";

import { characterDetailsSelector, characterWardrobesSelector } from "features/search-characters/store";
import { assetListHandleLoadAction } from "features/search-assets/store";
import { WardrobeListModal } from "./WardrobeListModal";
import { AssetSearchContainer } from "shared/containers/AssetSearchContainer";
import { CharacterWardrobeActions } from "./CharacterWardrobeActions";
import { AssetData, AssetDataNames } from "features/search-assets/services";
import { AssetSearch } from "shared/components/AssetSearch";

export interface CharacterAssetGridContainerProps {
    url: UrlPath<{ stage: string; id: number }, {}>;
}

export function CharacterAssetGridContainer({ url }: CharacterAssetGridContainerProps) {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }
    const { stage, id } = urlMatch.params;

    const characterInfo = useSelector(characterDetailsSelector(stage, id));

    const umaRecipe = useMemo(() => characterInfo.data?.characterAndUmaRecipe[0]?.umaRecipe, [characterInfo.data]);

    const params = { skip: 0, take: 500, umaRecipeId: umaRecipe?.id };

    const wardrobesInfo = useSelector(characterWardrobesSelector(stage, params));

    useEffect(() => {
        if (params.umaRecipeId && !characterInfo.loading) {
            dispatch(
                assetListHandleLoadAction({
                    stage,
                    asset: "Wardrobe",
                    params
                })
            );
        }
    }, [umaRecipe, characterInfo.loading]);

    return wardrobesInfo ? (
        <Card
            title={`Contained Assets(${umaRecipe?.umaRecipeAndWardrobe.length ?? 0})`}
            loading={wardrobesInfo.loading && !wardrobesInfo.data}
            extra={
                <WardrobeListModal>
                    <AssetSearchContainer
                        stage={stage}
                        asset="Wardrobe"
                        renderActionComponent={renderActionComponent}
                    />
                </WardrobeListModal>
            }>
            <AssetSearch
                stage={stage}
                assetType="Wardrobe"
                loading={wardrobesInfo.loading}
                data={wardrobesInfo.data ?? []}
                extraColumns={[
                    {
                        title: "Available For Baking",
                        dataIndex: "availableForBaking",
                        width: 80,
                        render: (_, asset) => {
                            const wardrobeAsset = asset as AssetData["Wardrobe"];
                            return (
                                <Typography.Text type={wardrobeAsset.availableForBaking ? "success" : "danger"}>
                                    {wardrobeAsset.availableForBaking ? "Yes" : "No"}
                                </Typography.Text>
                            );
                        }
                    }
                ]}
                renderActionComponent={renderActionComponent}
            />
        </Card>
    ) : (
        <div></div>
    );
}

const renderActionComponent = (asset: AssetData[AssetDataNames]) => <CharacterWardrobeActions wardrobeId={asset.id} />;
