import React, { useEffect, useState } from "react";
import { Button, message, Modal } from "antd";
import { useDispatch } from "react-redux";

import { CreateSongForm, CreateSFXForm } from "../../components";
import { createAssetAction } from "features/search-assets/store";
import { assetFileExtensions, validThumbnailResolutions } from "features/search-assets";

const ASSET_CREATION_FORM_ID = "create-asset-form";

export type AssetFile = { file: any; resolution: string | null; extension: number };
export interface CreateAssetContainerProps {
    stage: string;
    asset: "Song" | "SFX";
}

export function CreateAssetContainer({ stage, asset }: CreateAssetContainerProps) {
    const dispatch = useDispatch();

    const createAsset = (data: FormData, imageFiles: AssetFile[], files: AssetFile[]) =>
        dispatch(createAssetAction({ stage, asset, data, imageFiles, files }));

    const [file, setFile] = useState<{ [key: string]: AssetFile }>();
    const [imageFiles, setImageFiles] = useState<{ [key: string]: AssetFile }>({});
    const [mainFiles, setMainFiles] = useState<Array<AssetFile>>([]);
    const [multiUpload, setMultiUpload] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    useEffect(() => {
        file && setImageFiles({ ...imageFiles, ...file });
    }, [file]);

    const validateImageResolution = (img: HTMLImageElement) =>
        validThumbnailResolutions[asset].some(
            (resolution) => resolution.height === img.height && resolution.width === img.width
        );

    const changeMultiUploadStatus = () => {
        mainFiles.length > 1 && setMainFiles([mainFiles[0]]);
        setMultiUpload(!multiUpload);
    };

    const uploadOnRemove = (file: any) => {
        if (file.type?.startsWith("image")) {
            const newFiles = Object.entries(imageFiles).reduce(
                (acc, [key, value]) => (value.file.uid !== file.uid ? Object.assign(acc, { [key]: value }) : acc),
                {}
            );
            setImageFiles(newFiles);
        } else {
            const newAssetFiles = mainFiles.filter((mainFile) => mainFile.file.uid !== file.uid);
            setMainFiles(newAssetFiles);
        }
    };

    const uploadOnChange = (file: any) => {
        if (file.status !== "removed") {
            if (file.type?.startsWith("image")) {
                const img: HTMLImageElement = new window.Image();

                img.src = window.URL.createObjectURL(file);
                img.onload = () => {
                    const imgResolution = img.height + "x" + img.width;

                    validateImageResolution(img)
                        ? setFile({
                              [imgResolution]: {
                                  file,
                                  resolution: imgResolution,
                                  extension: assetFileExtensions[asset].thumbnail
                              }
                          })
                        : message.error(`${file.name} has a wrong resolution`);
                };
            } else {
                const newAssetFile = { file, extension: assetFileExtensions[asset].mainFile, resolution: null };
                multiUpload ? setMainFiles([...mainFiles, newAssetFile]) : setMainFiles([newAssetFile]);
            }
        }
    };

    const onSubmit = (data: FormData) => {
        const imageFileList = Object.values(imageFiles);

        imageFileList.length < validThumbnailResolutions[asset].length || mainFiles.length < 1
            ? message.error(`You selected fewer files than needed to create the ${asset} asset.`)
            : createAsset(data, imageFileList, mainFiles);

        destroyModal();
    };

    const commonCreationFormProps = {
        stage,
        formId: ASSET_CREATION_FORM_ID,
        multiUpload,
        assetFileExtensions: assetFileExtensions[asset],
        files: [...Object.values(imageFiles).map((entity) => entity.file), ...mainFiles.map((entity) => entity.file)],
        changeMultiUploadStatus,
        uploadOnRemove,
        uploadOnChange,
        onSubmit
    };

    return (
        <>
            <div onClick={showModal}>{`Create ${asset}`}</div>
            <Modal
                title={`Create ${asset}`}
                open={isModalOpen}
                onCancel={destroyModal}
                style={{ top: "20px" }}
                width={768}
                styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 152px)" } }}
                footer={[
                    <Button key="cancel-create-asset-btn" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button
                        key="submit-create-asset-btn"
                        htmlType="submit"
                        type="primary"
                        form={ASSET_CREATION_FORM_ID}>
                        {`Create Asset(s)`}
                    </Button>
                ]}
                maskClosable={false}
                destroyOnClose>
                {asset === "SFX" && <CreateSFXForm {...commonCreationFormProps} />}
                {asset === "Song" && <CreateSongForm {...commonCreationFormProps} />}
            </Modal>
        </>
    );
}
