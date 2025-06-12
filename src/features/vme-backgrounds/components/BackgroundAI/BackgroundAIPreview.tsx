import React, { useMemo } from "react";
import styled from "styled-components";

import { BackgroundAI } from "features/vme-backgrounds/services";
import { InputSlider } from "shared";
import { Card, Form, Space, Image, Skeleton, Empty, FormProps } from "antd";
import { BackgroundAIPreviewState } from "features/vme-backgrounds/store/reducer/BackgroundAI/backgroundAIPreviewReducer";
import { BackgroundAIPreviewInfo } from "./BackgroundAIPreviewInfo";

const DEFAULT_IMAGE_SIZE = 128;

const gridStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flex: `1 0 ${DEFAULT_IMAGE_SIZE}`,

    flexDirection: "column",
    alignItems: "center"
};

interface BackgroundAIPreviewProps extends FormProps {
    background?: BackgroundAI;
    previewImages: BackgroundAIPreviewState;
}

export function BackgroundAIPreview({ background, previewImages, ...formProps }: BackgroundAIPreviewProps) {
    if (!background) return null;
    const form = formProps.form!;
    const totalImages = form?.getFieldValue("totalImages");

    const SkeletonImages = useMemo(
        () => SkeletonImage(totalImages, DEFAULT_IMAGE_SIZE, DEFAULT_IMAGE_SIZE),
        [totalImages]
    );

    return (
        <Space direction="vertical" style={{ width: "100%" }}>
            <Form {...formProps}>
                <Form.Item shouldUpdate label="Number of images" name="totalImages">
                    <InputSlider min={1} max={30} step={1} disabled={previewImages.loading} />
                </Form.Item>
            </Form>
            <Card>
                {previewImages.loading ? (
                    SkeletonImages
                ) : previewImages?.replicateOutput ? (
                    previewImages.replicateOutput?.map((replicate) => (
                        <Card.Grid key={replicate.uploadId} hoverable={false} style={gridStyle}>
                            <ImageWarapper>
                                <Image
                                    width={DEFAULT_IMAGE_SIZE}
                                    height={DEFAULT_IMAGE_SIZE}
                                    src={replicate.signedFileUrl ?? ""}
                                />
                                <div className="info_bar">
                                    <BackgroundAIPreviewInfo params={replicate.params} />
                                </div>
                            </ImageWarapper>
                        </Card.Grid>
                    ))
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
            </Card>
        </Space>
    );
}

const SkeletonImage = (totalImage: number, width: number, height: number): JSX.Element[] => {
    if (!totalImage) return [];
    return Array.from({ length: totalImage }, (_, index) => (
        <Card.Grid key={index} style={gridStyle} hoverable={false}>
            <Skeleton.Image active style={{ width, height }} />
        </Card.Grid>
    ));
};

const ImageWarapper = styled("div")`
    position: relative;

    .info_bar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        width: 100%;
        height: 25px;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .ant-image-img {
        object-fit: contain;
    }
`;
