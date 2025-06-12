import React from "react";
import { useLocation } from "react-router";

import { CamFiltSubAssetContainer, SetLocSubAssetContainer, WardrobeSubAssetContainer } from ".";
import { DETAILS_ASSET_URL } from "urls";

export interface SubAssetsContainerProps {}

export function SubAssetsContainer({}: SubAssetsContainerProps) {
    const location = useLocation();

    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const { asset } = urlMatch.params;

    const subAssetContainer: { [key: string]: React.FunctionComponent } = {
        Wardrobe: WardrobeSubAssetContainer,
        CameraFilter: CamFiltSubAssetContainer,
        SetLocation: SetLocSubAssetContainer
    };

    const CurrentSubAssetContainer = subAssetContainer[asset];

    if (!CurrentSubAssetContainer) return null;

    return <CurrentSubAssetContainer />;
}
