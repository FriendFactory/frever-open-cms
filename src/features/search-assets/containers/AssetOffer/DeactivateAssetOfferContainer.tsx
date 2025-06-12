import React from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";

import { executeAssetOfferCommand } from "features/search-assets/store";
import { AssetOfferWithAssetInfo } from "features/search-assets/services";

const { confirm } = Modal;

export interface DeactivateAssetOfferContainerProps {
    stage: string;
    assetOffer: AssetOfferWithAssetInfo;
}

export function DeactivateAssetOfferContainer({ assetOffer, stage }: DeactivateAssetOfferContainerProps) {
    const dispatch = useDispatch();

    const showConfirm = () => {
        confirm({
            title: "Do you want to deactivate this Asset Offer?",
            onOk() {
                dispatch(executeAssetOfferCommand({ stage, command: { type: "deactivate", assetOffer } }));
            }
        });
    };

    return <div onClick={showConfirm}>Deactivate</div>;
}
