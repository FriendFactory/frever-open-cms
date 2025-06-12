import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { Button, Card, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { SeasonScreenshot } from "features/seasons-moderation/services";
import { seasonDetailsPageSelector } from "features/seasons-moderation/store/reducer/seasonDetails.reducer";
import { postSeasonEntityAction } from "features/seasons-moderation/store/actions";
import {
    actionColumnRender,
    ActionColumnRenderProps,
    createCdnURLFromFiles,
    EditableTable,
    EditableTableColumn,
    ImageResolution
} from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { DeleteSeasonEntityContainer } from "./DeleteSeasonEntityContainer";
import { CreateSeasonScreenshotContainer } from "../CreateSeasonScreenshotContainer";

export const SCREENSHOT_RESOLUTION: ImageResolution = [1125, 1638];

interface ScreenshotsTableContainerProps {
    stage: string;
    id: number;
}

export function ScreenshotsTableContainer({ stage, id }: ScreenshotsTableContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(seasonDetailsPageSelector(stage, id), shallowEqual);

    const handleOnFinish = async (
        updatedScreenshot: SeasonScreenshot,
        sourceScreenshot?: SeasonScreenshot,
        thumbnail?: File
    ) => {
        dispatch(
            postSeasonEntityAction({
                stage,
                entityName: "screenshots",
                data: { ...sourceScreenshot, ...updatedScreenshot },
                thumbnail
            })
        );
    };

    const onThumbnailReplace = async (screenshot: SeasonScreenshot, thumbnail: File) => {
        handleOnFinish(screenshot, undefined, thumbnail);
    };

    const columns: EditableTableColumn<SeasonScreenshot>[] = [
        { title: "ID", dataIndex: "id", width: 100 },
        {
            title: "Thumbnail",
            width: 120,
            render: (_, entity) =>
                entity.files && (
                    <ThumbnailCard
                        width={120}
                        height={120}
                        customUploadButton={
                            <Popover title="Requirements">
                                <Button size="small" ghost type="primary" className="card-tag">
                                    Replace
                                </Button>
                            </Popover>
                        }
                        handleUpdate={(file) => onThumbnailReplace(entity, file)}
                        imageUrl={createCdnURLFromFiles({
                            id: entity.id,
                            entityType: "MarketingScreenshot",
                            stage,
                            resolution: "512x512",
                            files: entity.files
                        })}
                    />
                )
        },
        {
            title: "Ordinal",
            dataIndex: "ordinal",
            width: 200,
            editableCellProps: { type: "number" }
        }
    ];

    const actionColumn = {
        title: <CreateSeasonScreenshotContainer type="primary" ghost icon={<PlusOutlined />} />,
        render: (props: ActionColumnRenderProps<SeasonScreenshot>) =>
            actionColumnRender({
                ...props,
                extra: (record) => <DeleteSeasonEntityContainer entity={record} entityName="screenshots" />
            })
    };

    return (
        <Card title="Marketing Screenshots">
            <EditableTable
                loading={info.loading}
                onFinish={handleOnFinish}
                actionColumnProps={actionColumn}
                columns={columns}
                dataSource={info.data?.screenshots}
                pagination={false}
            />
        </Card>
    );
}
