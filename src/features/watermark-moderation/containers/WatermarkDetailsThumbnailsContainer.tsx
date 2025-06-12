import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Col, message, Row } from "antd";

import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { FileExtensions, NO_IMAGE_URL } from "config";
import { watermarkInfoByIdSelector } from "../store/reducer";
import { upsertSingleWatermarkAction } from "../store/actions";
import { WatermarkTag } from "../services";
import { CdnLink, getCdnLink } from "features/user-media/services";

interface WatermarkDetailsThumbnailsContainerProps {
    stage: string;
    id: number;
}

export function WatermarkDetailsThumbnailsContainer({ stage, id }: WatermarkDetailsThumbnailsContainerProps) {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState({
        PORTRAIT: { url: NO_IMAGE_URL },
        LANDSCAPE: { url: NO_IMAGE_URL }
    });

    const info = useSelector(watermarkInfoByIdSelector(stage, id));

    useEffect(() => {
        const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
        const mainFiles = info.data?.files.filter((el) => el.resolution === null);

        mainFiles?.forEach(async (mainFile) => {
            if (info.data && mainFile?.version) {
                await delay(1000); // Prevent situations with preloaded images
                const newUrl: CdnLink = await getCdnLink(stage, {
                    id,
                    entityName: "Watermark",
                    version: mainFile?.version
                });

                const tagImage = mainFile.tags?.[0];

                if (tagImage) setImageUrl((prev) => ({ ...prev, [tagImage]: { url: newUrl.link } }));
            }
        });
    }, [info.data, info.data?.files]);

    const handleOnUpdate = (tag: WatermarkTag) => (file: File) => {
        if (!info.data) {
            message.error("Something went wrong. Source data is missing.");
            return;
        }

        if (file.type !== "image/png") {
            message.warning("Please select an image in PNG format");
            return;
        }

        dispatch(
            upsertSingleWatermarkAction({
                stage,
                data: {
                    item: info.data,
                    newImages: [
                        { file: 0, extension: FileExtensions.Png, resolution: null, tags: [tag], newFile: file }
                    ]
                }
            })
        );
    };

    return (
        <Card loading={info.loading}>
            <Row gutter={[0, 24]}>
                {Object.keys(imageUrl).map((key) => (
                    <Col span={24} key={key}>
                        <ThumbnailCard
                            style={{ objectFit: "contain" }}
                            height={250}
                            markers={["PNG", key]}
                            accept={"image/png"}
                            handleUpdate={handleOnUpdate(key as WatermarkTag)}
                            imageUrl={imageUrl[key as WatermarkTag].url}
                        />
                    </Col>
                ))}
            </Row>
        </Card>
    );
}
