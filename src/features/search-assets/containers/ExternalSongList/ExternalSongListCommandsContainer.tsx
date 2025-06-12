import React from "react";
import { Button, Dropdown, Popconfirm, Typography } from "antd";
import { useDispatch } from "react-redux";

import { MoreOutlined } from "@ant-design/icons";
import { useCurrentStage } from "shared";
import { assetDeleteAssociatedVideos, externalSongEditAction } from "features/search-assets/store";
import { Actions } from "shared/services/executeVideosDelete";

export interface ExternalSongListCommandsContainerProps {
    id: number;
    isDeleted: boolean;
    isManuallyDeleted: boolean;
}

export function ExternalSongListCommandsContainer({
    id,
    isDeleted,
    isManuallyDeleted
}: ExternalSongListCommandsContainerProps) {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const handleExecute = (command: Actions) => () =>
        dispatch(assetDeleteAssociatedVideos({ stage, id, selectBy: "externalSongId", command }));

    const handleOnClick = () => dispatch(externalSongEditAction({ stage, id, data: { isDeleted: !isDeleted } }));

    const handleDeleteManually = () =>
        dispatch(externalSongEditAction({ stage, id, data: { isManuallyDeleted: !isManuallyDeleted } }));

    const items = [
        {
            label: (
                <Popconfirm
                    title={isDeleted ? "Undelete" : "Delete"}
                    description={
                        isDeleted
                            ? "This action will restore the External Song"
                            : "This action will delete the External Song"
                    }
                    onConfirm={handleOnClick}>
                    <Typography.Link type="danger">{isDeleted ? "Undelete" : "Delete"}</Typography.Link>
                </Popconfirm>
            ),
            key: "soft-delete-restore"
        },
        {
            label: (
                <Popconfirm
                    title={`${isManuallyDeleted ? "Undelete" : "Delete"} manually`}
                    description={
                        isManuallyDeleted
                            ? "The song will be made visible in search, and all associated videos will be restored from soft-deletion"
                            : "The song will be hide from search, and all associated videos will be soft-deleted"
                    }
                    onConfirm={handleDeleteManually}>
                    <Typography.Link type="danger">{`${
                        isManuallyDeleted ? "Undelete" : "Delete"
                    } manually`}</Typography.Link>
                </Popconfirm>
            ),
            key: "delete-manually"
        },
        {
            label: (
                <Popconfirm
                    title="Delete with videos"
                    description="This action will also delete all associated videos"
                    onConfirm={handleExecute("delete")}>
                    <Typography.Link type="danger">Delete with videos</Typography.Link>
                </Popconfirm>
            ),
            key: "delete-with-videos"
        },
        {
            label: (
                <Popconfirm
                    title="Restore with videos"
                    description="This action will also restore all related videos if they have been deleted before"
                    onConfirm={handleExecute("post")}>
                    <Typography.Link type="warning">Restore with videos</Typography.Link>
                </Popconfirm>
            ),
            key: "restore-with-videos"
        }
    ];

    return (
        <Dropdown menu={{ items }}>
            <Button icon={<MoreOutlined />} />
        </Dropdown>
    );
}
