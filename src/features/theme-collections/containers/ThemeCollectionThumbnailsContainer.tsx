import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, message } from "antd";

import { themeCollectionInfoByIdSelector } from "../store/reducer/collectionListReducer";
import { ThumbnailFile, createCdnURLFromFile } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { FileExtensions } from "config";
import { upsertSingleCollectionAction } from "../store/actions";

export interface ThemeCollectionThumbnailsContainerProps {
    stage: string;
    id: number;
}

export function ThemeCollectionThumbnailsContainer({ stage, id }: ThemeCollectionThumbnailsContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(themeCollectionInfoByIdSelector(stage, id));

    const handleOnUpdate = (strResolution: ThumbnailFile["resolution"]) => async (file: File) => {
        if (!info.data) {
            message.error("Something went wrong. Source data is missing.");
            return;
        }

        dispatch(
            upsertSingleCollectionAction({
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
            entityType: "ThemeCollection"
        });

    return (
        <Card loading={!info.data && info.loading}>
            <Row gutter={[0, 24]}>
                {info.data?.files.map((thumbnailFile) => (
                    <Col span={24} key={thumbnailFile.version}>
                        <ThumbnailCard
                            width="100%"
                            aspectRatio="1"
                            imageUrl={getImage(thumbnailFile)}
                            markers={[thumbnailFile.resolution, FileExtensions[thumbnailFile.extension]]}
                            handleUpdate={handleOnUpdate(thumbnailFile.resolution)}
                        />
                    </Col>
                ))}
            </Row>
        </Card>
    );
}
