import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { updateCharaThumbAction } from "features/search-characters/store";
import { createCdnURLFromFile, ThumbnailFile } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { FileExtensions } from "config";
import { AspectRatio, checkIsRatioFit } from "utils";

export interface ThumbnailCardContainerProps {
    stage: string;
    characterId: number;
    thumbnailFile: ThumbnailFile;
}

export function ThumbnailCardContainer({ stage, thumbnailFile, characterId }: ThumbnailCardContainerProps) {
    const dispatch = useDispatch();

    const handleUpdate = useCallback(
        (file: any) => {
            const img: HTMLImageElement = new window.Image();
            img.src = window.URL.createObjectURL(file);
            img.onload = () => {
                if (validateImageResolution(thumbnailFile.resolution, img.width, img.height)) {
                    dispatch(
                        updateCharaThumbAction({
                            stage,
                            data: {
                                id: characterId,
                                resolution: thumbnailFile.resolution,
                                extension: thumbnailFile.extension
                            },
                            file
                        })
                    );
                } else {
                    message.error("Please load the image with valid resolution");
                }
            };
        },
        [stage, thumbnailFile, characterId]
    );

    return (
        <ThumbnailCard
            aspectRatio="1"
            imageUrl={createCdnURLFromFile({
                stage,
                id: characterId,
                file: thumbnailFile,
                entityType: "character"
            })}
            markers={[imageSizeToText(thumbnailFile.resolution), FileExtensions[thumbnailFile.extension]]}
            handleUpdate={handleUpdate}
        />
    );
}

const imageSizeToText = (size: string) =>
    size === "128x128" ? "Small" : size === "256x256" ? "Middle" : size === "512x512" ? "Large" : size;

const characterThumbnailRequirements: {
    [key: string]: { pixelCount: { min: number; max: number }; aspectRatios: AspectRatio[] };
} = {
    "128x128": { pixelCount: { min: 16384, max: 147456 }, aspectRatios: [[1, 1]] },
    "256x256": {
        pixelCount: { min: 270270, max: 387000 },
        aspectRatios: [
            [231, 130],
            [125, 86]
        ]
    },
    "512x512": { pixelCount: { min: 270000, max: 270000 }, aspectRatios: [[3, 4]] }
};

const validateImageResolution = (marker: string, width: number, height: number) => {
    const requirements = characterThumbnailRequirements[marker];
    if (!requirements) {
        return false;
    }
    const pixelCount = Math.floor(width * height);
    const isSizeValid = requirements.pixelCount.min <= pixelCount && pixelCount <= requirements.pixelCount.max;
    const isAspectRatioValid = requirements.aspectRatios.some((el) => checkIsRatioFit([width, height], [el[0], el[1]]));
    return isSizeValid && isAspectRatioValid;
};
