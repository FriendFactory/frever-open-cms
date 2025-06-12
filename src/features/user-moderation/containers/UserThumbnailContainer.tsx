import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Typography } from "antd";

import { NO_IMAGE_URL, createCdnURLFromFiles, useCurrentStage } from "shared";
import { userDetailsPageSelector } from "../store/reducer/user/userDetailsReducer";
import { ThumbnailCard } from "shared/components/ThumbnailCard";

export interface UserThumbnailContainerProps {
    groupId: number;
    width?: number;
    height?: number;
}

export function UserThumbnailContainer({ groupId, width, height }: UserThumbnailContainerProps) {
    const stage = useCurrentStage();
    const info = useSelector(userDetailsPageSelector({ stage, selector: "mainGroupId", id: groupId }));

    if (!info.data) return <span>{groupId}</span>;

    const imageUrl = info.data.mainCharacter?.files
        ? createCdnURLFromFiles({
              stage,
              id: info.data.mainCharacter.id,
              files: info.data.mainCharacter.files,
              entityType: "Character",
              resolution: "256x256"
          })
        : NO_IMAGE_URL;

    return (
        <ThumbnailCard
            width={width}
            height={height}
            preview={false}
            markers={[
                <MarkerTextStyled>{info.data.mainGroup.nickName}</MarkerTextStyled>,
                <MarkerTextStyled>{info.data.mainGroupId}</MarkerTextStyled>
            ]}
            imageUrl={imageUrl}
        />
    );
}

const MarkerTextStyled = styled(Typography.Text)`
    font-size: 12px;
`;
