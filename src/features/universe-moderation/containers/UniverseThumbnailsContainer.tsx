import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, App } from "antd";

import { ThumbnailFile, createCdnURLFromFile } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { FileExtensions } from "config";
import { universeInfoByIdSelector } from "../store/reducer";
import { upsertSingleUniverseAction } from "../store/actions";
import { UniverseThumbnailsModalContainer } from "./UniverseThumbnailsModalContainer";

export interface UniverseThumbnailsContainerProps {
    stage: string;
    id: number;
}

export function UniverseThumbnailsContainer({ stage, id }: UniverseThumbnailsContainerProps) {
    const dispatch = useDispatch();
    const { message } = App.useApp();

    const info = useSelector(universeInfoByIdSelector(stage, id));

    const handleOnUpdate = (strResolution: ThumbnailFile["resolution"]) => async (file: File) => {
        if (!info.data) {
            message.error("Something went wrong. Source data is missing.");
            return;
        }

        if (file.type !== "image/png") {
            message.error("Invalid file extension. Only .png files are supported.");
            return;
        }

        dispatch(
            upsertSingleUniverseAction({
                stage,
                data: {
                    item: info.data,
                    newImages: [{ file: 1, extension: FileExtensions.Png, resolution: strResolution, newFile: file }]
                }
            })
        );
    };

    const getImage = (file: ThumbnailFile) =>
        createCdnURLFromFile({
            stage,
            id,
            file,
            entityType: "Universe"
        });

    return (
        <Card loading={!info.data && info.loading}>
            <Row gutter={[0, 24]}>
                {info.data?.files.map((thumbnailFile) => (
                    <Col span={24} key={thumbnailFile.version}>
                        <ThumbnailCard
                            accept="image/png"
                            width="100%"
                            aspectRatio="1"
                            imageUrl={getImage(thumbnailFile)}
                            markers={[thumbnailFile.resolution, FileExtensions[thumbnailFile.extension]]}
                            handleUpdate={handleOnUpdate(thumbnailFile.resolution)}
                        />
                    </Col>
                ))}
                {info.data?.files?.length === 0 && <UniverseThumbnailsModalContainer stage={stage} id={id} />}
            </Row>
        </Card>
    );
}
