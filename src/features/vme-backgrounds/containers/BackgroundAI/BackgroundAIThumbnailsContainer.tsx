import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, message } from "antd";

import { ThumbnailFile, createCdnURLFromFile } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { FileExtensions } from "config";
import { CdnLink, getCdnLink } from "features/user-media/services";
import { backgroundAIInfoByIdSelector } from "features/vme-backgrounds/store/reducer/BackgroundAI/backgroundAIListReducer";
import { upsertSingleBackgroundAIAction } from "features/vme-backgrounds/store/actions/BackgroundAI";

export interface BackgroundAIThumbnailsContainerProps {
    stage: string;
    id: number;
}

export function BackgroundAIThumbnailsContainer({ stage, id }: BackgroundAIThumbnailsContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(backgroundAIInfoByIdSelector(stage, id));
    const [url, setUrl] = useState("");

    const handleOnUpdate = (strResolution: ThumbnailFile["resolution"], extension: number) => async (file: File) => {
        if (!info.data) {
            message.error("Something went wrong. Source data is missing.");
            return;
        }

        dispatch(
            upsertSingleBackgroundAIAction({
                stage,
                data: {
                    item: info.data,
                    newImages: [{ file: 1, extension, resolution: strResolution, newFile: file }]
                }
            })
        );
    };

    useEffect(() => {
        (async () => {
            const imageUrl = info.data?.files.find((el) => el.resolution === null);
            if (info.data && imageUrl?.version) {
                const newUrl: CdnLink = await getCdnLink(stage, {
                    id: info.data.id,
                    entityName: "SetLocationBackgroundSettings",
                    version: imageUrl?.version
                });

                setUrl(newUrl.link);
            }
        })();
    }, [info.data]);

    const getImage = (file: ThumbnailFile) => {
        if (file.resolution) {
            return createCdnURLFromFile({
                stage,
                id,
                file,
                entityType: "SetLocationBackgroundSettings"
            });
        }
        return url;
    };

    const files = info.data?.files.sort((a, b) => b.file - a.file);

    return (
        <Card loading={info.loading}>
            <Row gutter={[0, 24]}>
                {files?.map((thumbnailFile) => (
                    <Col span={24} key={thumbnailFile.version}>
                        <ThumbnailCard
                            accept={thumbnailFile.extension === FileExtensions.Jpg ? "image/jpeg" : "image/png"}
                            width="100%"
                            aspectRatio="1"
                            imageUrl={getImage(thumbnailFile)}
                            markers={
                                thumbnailFile.resolution
                                    ? [thumbnailFile.resolution, FileExtensions[thumbnailFile.extension]]
                                    : [FileExtensions[thumbnailFile.extension]]
                            }
                            handleUpdate={handleOnUpdate(
                                thumbnailFile.resolution,
                                thumbnailFile.resolution ? FileExtensions.Jpg : FileExtensions.Png
                            )}
                        />
                    </Col>
                ))}
            </Row>
        </Card>
    );
}
