import React from "react";
import { Button, Dropdown, DropdownProps, Form, MenuProps, Upload } from "antd";
import { MoreOutlined, PictureOutlined, VideoCameraOutlined } from "@ant-design/icons";

import { useCurrentStage } from "shared";
import { Video } from "features/video-moderation";
import { SearchForVideoModalContainer } from "features/video-moderation/containers/SearchForVideoModalContainer";

interface SendMessageDropDownMediaProps extends DropdownProps {}

export const SendMessageDropDownMedia = ({}: SendMessageDropDownMediaProps) => {
    const stage = useCurrentStage();
    const form = Form.useFormInstance<{ id: number }>();

    const handleSelectVideo = (video: Video) => {
        form.setFieldValue("video", video);
    };

    const handleSelectImage = (file: File) => {
        form.setFieldValue("imageFile", file);
    };

    const items: MenuProps["items"] = [
        {
            key: "video",
            label: (
                <SearchForVideoModalContainer stage={stage} btnText={"Add video"} onVideoClick={handleSelectVideo} />
            ),
            icon: <VideoCameraOutlined />
        },
        {
            key: "image",
            label: (
                <Upload
                    accept=".jpg, .jpeg"
                    showUploadList={false}
                    customRequest={({ file }: any) => handleSelectImage(file)}
                    maxCount={1}>
                    Add image
                </Upload>
            ),
            icon: <PictureOutlined />
        }
    ];
    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
        </Dropdown>
    );
};
