import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, message } from "antd";

import { ThumbnailFile, createCdnURLFromFile } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { FileExtensions } from "config";
import { upsertSingleVMEBackgroundAction } from "../store/actions";
import { vmeBackgroundInfoByIdSelector } from "../store/reducer/vmeBackgroundListReducer";
import { CdnLink, getCdnLink } from "features/user-media/services";

export interface VMEBackgroundThumbnailsContainerProps {
    stage: string;
    id: number;
}

export function VMEBackgroundThumbnailsContainer({ stage, id }: VMEBackgroundThumbnailsContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(vmeBackgroundInfoByIdSelector(stage, id));
    const [url, setUrl] = useState("");

    const handleOnUpdate = (strResolution: ThumbnailFile["resolution"]) => async (file: File) => {
        if (!info.data) {
            message.error("Something went wrong. Source data is missing.");
            return;
        }

        dispatch(
            upsertSingleVMEBackgroundAction({
                stage,
                data: {
                    item: info.data,
                    newImages: [{ file: 1, extension: FileExtensions.Jpg, resolution: strResolution, newFile: file }]
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
                    entityName: "SetLocationBackground",
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
                entityType: "SetLocationBackground"
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
                            width="100%"
                            aspectRatio="1"
                            imageUrl={getImage(thumbnailFile)}
                            markers={[thumbnailFile.resolution ?? "1024x2340", FileExtensions[thumbnailFile.extension]]}
                            handleUpdate={handleOnUpdate(thumbnailFile.resolution)}
                        />
                    </Col>
                ))}
            </Row>
        </Card>
    );
}
