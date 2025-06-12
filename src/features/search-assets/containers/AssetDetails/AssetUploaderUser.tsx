import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Typography } from "antd";

import { DETAILS_ASSET_URL, USER_DETAILS_INFO_URL } from "urls";
import { assetDetailsSelector } from "features/search-assets";
import { userDetailsPageSelector } from "features/user-moderation/store/reducer/user/userDetailsReducer";
import { AssetType } from "features/search-assets/services";
import { ProtectedLink } from "shared";

const { Text } = Typography;

type AssetsWithInfoUser = AssetType<
    "VoiceFilter" | "BodyAnimation" | "SFX" | "VFX" | "Song" | "CameraFilter" | "Wardrobe" | "SetLocation"
>;

export interface AssetUploaderUserProps {
    targetUser: "uploaderUserId" | "updatedByUserId";
}

export const AssetUploaderUser = ({ targetUser }: AssetUploaderUserProps) => {
    const location = useLocation();
    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const { stage, asset, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, asset, id));
    const assetData = (info.data as AssetsWithInfoUser) ?? {};

    const userInfo = useSelector(userDetailsPageSelector({ id: assetData[targetUser], selector: "id", stage }));

    if ((info.loading && !info.data) || userInfo.loading) return <br />;

    return (
        <>
            {userInfo.data && (
                <Text type="secondary">
                    {`${targetUser === "uploaderUserId" ? "Created" : "Modified"} By: `}
                    <ProtectedLink
                        feature="Social"
                        to={USER_DETAILS_INFO_URL.format({ stage, selector: "id", id: userInfo.data.id })}>
                        {userInfo.data.mainGroup.nickName}
                    </ProtectedLink>
                </Text>
            )}
        </>
    );
};
