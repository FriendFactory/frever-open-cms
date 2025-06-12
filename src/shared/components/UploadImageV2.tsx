import React, { useEffect, useState } from "react";
import { Flex, UploadFile, Image as AntdImage, Typography, Divider } from "antd";
import Upload, { UploadChangeParam } from "antd/es/upload";

import { validateImage } from "shared/img-helpers";
import { ThumbnailFile, useLoadCdnLink } from "shared";

type FileType = "image/png" | "image/jpeg" | "image/gif" | "image/svg+xml" | "image/webp";

interface UploadImageV2Props {
    stage: string;
    onUpload: (file: File) => void;
    onRemove?: () => void;

    validation?: {
        resolution?: [number, number];
        accept?: string[];
        onFail: (error: string) => void;
    };
    mainFileInfo?: {
        files: ThumbnailFile[];
        id: number;
        entityName: string;
    };
}

export function UploadImageV2({ stage, onUpload, onRemove, validation, mainFileInfo }: UploadImageV2Props) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const mainFile = mainFileInfo && mainFileInfo?.files.filter((val) => val.file === 0)?.[0];

    const { loading, url } = useLoadCdnLink(
        stage,
        mainFile
            ? {
                  id: mainFileInfo.id,
                  entityName: mainFileInfo.entityName,
                  version: mainFile.version!
              }
            : null
    );

    useEffect(() => {
        if (!loading) setImageUrl(url);
    }, [url]);

    const handleOnChange = async ({ file, fileList }: UploadChangeParam<UploadFile>) => {
        if (!fileList.length) {
            setFileList([]);
            setImageUrl(null);
            return;
        }

        if (validation?.resolution) {
            const isImageValid = await validateImage(file as unknown as File, validation.resolution);

            if (!isImageValid) {
                validation.onFail(
                    `Incorrect Image Resolution. Image should be ${validation.resolution.join("x")} pixels`
                );
                return;
            }
        }

        if (validation?.accept && !validation.accept.includes(file.type as FileType)) {
            validation.onFail(`Unsupported File Type. Supported file types: ${validation.accept.join(", ")}`);
            return;
        }

        setFileList(fileList);
        const url = URL.createObjectURL(file as unknown as File);
        setImageUrl(url);
        onUpload(file as unknown as File);
    };

    const handleRemove = () => {
        setFileList([]);
        setImageUrl(null);
        if (onRemove) onRemove();
    };

    return (
        <div>
            {imageUrl ? (
                <Flex justify="left" align="start" vertical>
                    <AntdImage
                        width={200}
                        height={200}
                        src={imageUrl}
                        style={{ objectFit: "contain" }}
                        alt="Selected"
                    />
                    <div>
                        <Upload
                            beforeUpload={() => false}
                            onChange={handleOnChange}
                            fileList={fileList}
                            accept={validation?.accept?.join(", ")}
                            showUploadList={false}>
                            <Typography.Link>Change</Typography.Link>
                        </Upload>
                        <Divider type="vertical" />
                        <Typography.Link onClick={handleRemove} type="danger">
                            Remove
                        </Typography.Link>
                    </div>
                </Flex>
            ) : (
                <Upload
                    beforeUpload={() => false}
                    onChange={handleOnChange}
                    fileList={fileList}
                    accept={validation?.accept?.join(", ")}
                    maxCount={1}
                    listType="picture">
                    <Typography.Link>Select</Typography.Link>
                </Upload>
            )}
        </div>
    );
}
