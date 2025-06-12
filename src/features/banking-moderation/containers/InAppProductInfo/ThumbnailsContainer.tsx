import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, message, Popover, Space } from "antd";

import { ColumnsLayout } from "layout/ColumnsLayout";
import { inAppProductInfoPageSelector } from "features/banking-moderation/store/reducer";
import { FixedPageHeader, createCdnURLFromFiles, validateImage, ImageResolution } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { InAppProductDetailsFile } from "./SpecialOfferListContainer";
import { inAppProductPostAction } from "features/banking-moderation/store/actions";
import { imageSizes } from "features/banking-moderation/components/InAppProductForm";

export interface InAppProductThumbnailsContainerProps {
    stage: string;
    id: number;
}

export function InAppProductThumbnailsContainer({ stage, id }: InAppProductThumbnailsContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(inAppProductInfoPageSelector(stage, id));

    const [newImages, setNewImages] = useState<{ [key in InAppProductDetailsFile["resolution"]]?: File } | null>(null);
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState(false);

    useEffect(() => setNewImages(null), [info.data?.files]);

    const handleOnClickDiscard = () => {
        setNewImages(null);
        setIsSaveHeaderOpen(false);
    };

    const handleOnClickSave = () => {
        if (info.data) {
            const thumbnails = !!newImages
                ? Object.entries(newImages).map<InAppProductDetailsFile>(
                      ([resolution, file]) => ({ resolution, file } as InAppProductDetailsFile)
                  )
                : [];

            const isFilesCanBeUpdated =
                info.data?.files &&
                [...thumbnails.map((el) => el.resolution), ...info.data?.files.map((el) => el.resolution)].filter(
                    (item, i, arr) => arr.indexOf(item) == i
                ).length === 2;

            if (isFilesCanBeUpdated) {
                dispatch(
                    inAppProductPostAction({
                        stage,
                        data: info.data,
                        thumbnails: thumbnails
                    })
                );
                setIsSaveHeaderOpen(false);
            } else {
                message.warning("Please select one more thumbnail");
            }
        }
    };

    const handleOnUpload = (resolution: InAppProductDetailsFile["resolution"]) => async (file: File) => {
        if (file.type !== "image/png") {
            message.error("File extension is not valid");
            return;
        }

        const isImageValid = await validateImage(file, imageSizes[resolution]);
        if (!isImageValid) {
            message.error("File resolution is not valid");
            return;
        }

        setNewImages({ ...newImages, [resolution]: file });
        setIsSaveHeaderOpen(true);
    };

    const createImageUrl = (resolution: InAppProductDetailsFile["resolution"]) => {
        const newImage = newImages?.[resolution];
        if (newImage) return URL.createObjectURL(newImage);

        if (info.data?.files?.some((el) => el.resolution === resolution)) {
            return (
                createCdnURLFromFiles({
                    id,
                    entityType: "InAppProduct",
                    stage,
                    resolution,
                    files: info.data?.files
                }) || "/assets/no-image.png"
            );
        }

        return "/assets/no-image.png";
    };
    return (
        <Card title="Thumbnails" loading={!info.data && info.loading}>
            <ColumnsLayout>
                <ThumbnailCard
                    imageUrl={createImageUrl("256x256")}
                    handleUpdate={handleOnUpload("256x256")}
                    markers={[imageSizes["256x256"].join("x"), "Png"]}
                    customUploadButton={<ButtonReplace resolution={imageSizes["256x256"]} />}
                />
                <ThumbnailCard
                    imageUrl={createImageUrl("1024x1024")}
                    handleUpdate={handleOnUpload("1024x1024")}
                    markers={[imageSizes["1024x1024"].join("x"), "Png"]}
                    customUploadButton={<ButtonReplace resolution={imageSizes["1024x1024"]} />}
                />
            </ColumnsLayout>
            {isSaveHeaderOpen && (
                <FixedPageHeader
                    title="Unsaved thumbnails changes"
                    extra={[
                        <Button key="discard" onClick={handleOnClickDiscard}>
                            Discard
                        </Button>,
                        <Button key="save" type="primary" onClick={handleOnClickSave}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Card>
    );
}

const ButtonReplace = ({ resolution }: { resolution: ImageResolution }) => {
    const requirements = [
        "Rounded corners with opacity and highlight.",
        `Resolution: ${resolution.join("x")}`,
        "Extension: .PNG"
    ];
    return (
        <Popover
            placement="left"
            title="Requirements"
            content={
                <Space direction="vertical">
                    <ul style={{ margin: 0, paddingLeft: "1em" }}>
                        {requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </Space>
            }>
            <Button size="small" ghost type="primary" className="card-tag">
                Replace
            </Button>
        </Popover>
    );
};
