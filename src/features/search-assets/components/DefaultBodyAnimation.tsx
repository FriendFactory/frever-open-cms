import React from "react";
import { Divider, Typography } from "antd";

import { ProtectedLink, useCurrentStage } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import { BodyAnimationModalContainer } from "../containers/BodyAnimationModalContainer";

interface DefaultBodyAnimationProps {
    defaultValue: number | null;
    onSave: (newVal: number | null) => void;
}

export function DefaultBodyAnimation({ defaultValue, onSave }: DefaultBodyAnimationProps) {
    const stage = useCurrentStage();

    return defaultValue ? (
        <>
            <ProtectedLink
                target="_blank"
                feature="AssetFull"
                to={DETAILS_ASSET_URL.format({
                    stage,
                    asset: "BodyAnimation",
                    id: defaultValue
                })}>
                ID: {defaultValue}
            </ProtectedLink>
            <Divider type="vertical" />
            <BodyAnimationModalContainer stage={stage} btnText="Replace" onClick={(asset) => onSave(asset.id)} />
            <Divider type="vertical" />
            <Typography.Link type="danger" onClick={() => onSave(null)}>
                Remove
            </Typography.Link>
        </>
    ) : (
        <BodyAnimationModalContainer stage={stage} btnText="Select" onClick={(asset) => onSave(asset.id)} />
    );
}
