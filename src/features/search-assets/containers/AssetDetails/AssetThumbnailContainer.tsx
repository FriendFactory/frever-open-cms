import React from "react";
import { message, theme } from "antd";
import { useDispatch } from "react-redux";

import { AssetTypes, FileExtensions } from "config";
import { updateAssetThumbnailAction } from "../../store";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { createCdnURLFromFile, ThumbnailFile, validateImage } from "shared";

export interface AssetThumbnailContainerProps {
    stage: string;
    id: number;
    entityType: AssetTypes | string;
    file: ThumbnailFile;
}

export function AssetThumbnailContainer({ stage, id, entityType, file }: AssetThumbnailContainerProps) {
    const { token } = theme.useToken();
    const dispatch = useDispatch();

    const handleUpdate = async (mediaFile: File) => {
        const [width, height] = file.resolution.split("x").map((el) => +el);

        (await validateImage(mediaFile, [width, height]))
            ? dispatch(
                  updateAssetThumbnailAction({
                      stage,
                      asset: entityType,
                      info: {
                          id,
                          resolution: file.resolution,
                          extension: file.extension
                      },
                      data: mediaFile
                  })
              )
            : message.error(`The selected image has not valid resolution. Select an image with ${file.resolution}`);
    };

    return (
        <ThumbnailCard
            imageUrl={createCdnURLFromFile({
                stage,
                id,
                file,
                entityType
            })}
            markers={[file.resolution, FileExtensions[file.extension]]}
            background={token.colorBgLayout}
            handleUpdate={handleUpdate}
            aspectRatio="1/1"
        />
    );
}
