import React from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from "antd";

import { DETAILS_ASSET_URL } from "urls";
import { assetDetailsSelector } from "features/search-assets/store";

export const SetLocationOfSpawnPosition = () => {
    const location = useLocation();
    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched) return null;
    const { stage, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, "CharacterSpawnPosition", id));

    return (
        <span style={{ padding: "0 24px" }}>
            <Typography.Text type="secondary">
                Set Location:{" "}
                {info.data?.setLocation ? (
                    <Link
                        to={DETAILS_ASSET_URL.format({
                            asset: "SetLocation",
                            stage,
                            id: info.data.setLocation.id
                        })}>
                        {info.data.setLocation.name}
                    </Link>
                ) : (
                    "Unknown"
                )}
            </Typography.Text>
        </span>
    );
};
