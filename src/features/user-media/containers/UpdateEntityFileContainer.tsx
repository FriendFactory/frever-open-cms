import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, message, Space, Upload } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

import { updateMediaFileAction } from "../store/actions";
import { FileExtensions } from "config";
import { UserMediaFileType } from "../services";

const extensions = {
    Photo: FileExtensions.Jpeg,
    VideoClip: FileExtensions.Mp4,
    UserSound: FileExtensions.Mp3
};

const fileUrls = {
    Photo: "/assets/black_img.jpg",
    VideoClip: "/assets/black_video.mp4",
    UserSound: "/assets/silent_sound.mp3"
};

export interface UpdateEntityFileContainerProps {
    stage: string;
    id: number;
    mediaFileType: UserMediaFileType;
    accept: "image/jpeg" | "video/mp4" | "audio/mp3";
}

export function UpdateEntityFileContainer({ id, mediaFileType, stage, accept }: UpdateEntityFileContainerProps) {
    const dispatch = useDispatch();

    const handleUpdateFile = useCallback(
        (file: any) => {
            const extension = extensions[mediaFileType];

            dispatch(
                updateMediaFileAction({
                    stage,
                    mediaFileType,
                    info: { id, extension },
                    data: file
                })
            );
        },
        [id, stage, mediaFileType]
    );

    const handleOverWriteFile = useCallback(async () => {
        const extension = extensions[mediaFileType];
        const fileUrl = fileUrls[mediaFileType];

        try {
            const res = await fetch(fileUrl);
            const blob = await res.blob();

            dispatch(
                updateMediaFileAction({
                    stage,
                    mediaFileType,
                    info: { id, extension },
                    data: blob as File
                })
            );
        } catch (error) {
            message.error(`Something went wrong during overwriting the file. ${error}`);
        }
    }, [id, stage, mediaFileType]);

    return (
        <Space size="small">
            <Button icon={<DeleteOutlined />} onClick={handleOverWriteFile}>
                Remove
            </Button>

            <Upload
                accept={accept}
                showUploadList={false}
                customRequest={({ file }) => {
                    handleUpdateFile(file);
                }}>
                <Button icon={<UploadOutlined />}>Update</Button>
            </Upload>
        </Space>
    );
}
