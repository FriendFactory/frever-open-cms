import React from "react";
import { Button, InputNumberProps, List, Space } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import ReactDragListView from "react-drag-listview";

import { InputNumberBlur } from "shared";
import { CreatePageContentTypes, CreatePageRowContentShortInfo } from "features/content-moderation/services";
import { ListItemMetaSong } from "./ListItemMetaSong";
import { ListItemMetaTemplate } from "./ListItemMetaTemplate";
import { ListItemMetaHashtag } from "./ListItemMetaHashtag";
import { ListItemMetaVideo } from "./ListItemMetaVideo";

interface CreatePageRowContentListProps {
    stage: string;
    contentType: string;
    contents?: CreatePageRowContentShortInfo[];
    onUpdate: (newContents: CreatePageRowContentShortInfo[]) => void;
    onDelete?: (id: number) => void;
}

export function CreatePageRowContentList({
    stage,
    contentType,
    contents,
    onUpdate,
    onDelete
}: CreatePageRowContentListProps) {
    const handleOnDragEnd = (fromIndex: number, toIndex: number) => {
        if (toIndex < 0 || !contents) return;

        const newContentId = contents.splice(fromIndex, 1)[0];
        contents.splice(toIndex, 0, newContentId);

        onUpdate(contents);
    };

    const handleOnChangeOrder = (fromIndex: number) => (inputValue: InputNumberProps["value"]) => {
        if (inputValue === null || inputValue === undefined) return;
        const toIndex = Number(inputValue);

        handleOnDragEnd(fromIndex, toIndex);
    };

    return (
        <ReactDragListView nodeSelector=".ant-list-item.draggble" onDragEnd={handleOnDragEnd}>
            <List
                dataSource={contents}
                renderItem={(item, index) => {
                    return (
                        <List.Item
                            key={item.id}
                            className="draggble"
                            extra={
                                onDelete && (
                                    <Space>
                                        <div onMouseDown={(e) => e.stopPropagation()}>
                                            <InputNumberBlur
                                                onChangeOrder={handleOnChangeOrder(index)}
                                                value={index}
                                                min={0}
                                                max={contents ? contents.length - 1 : 0}
                                                style={{ width: 60, marginLeft: "3em" }}
                                            />
                                        </div>
                                        <Button
                                            disabled={(contents?.length ?? 0) < 1}
                                            danger
                                            icon={<MinusOutlined />}
                                            onClick={() => onDelete(item.id)}
                                        />
                                    </Space>
                                )
                            }>
                            {contentType === CreatePageContentTypes["Song"] && (
                                <ListItemMetaSong stage={stage} order={index} id={item.id} name={item?.title} />
                            )}
                            {contentType === CreatePageContentTypes["Template"] && (
                                <ListItemMetaTemplate
                                    stage={stage}
                                    order={index}
                                    id={item.id}
                                    name={item?.title}
                                    files={item?.files}
                                />
                            )}
                            {contentType === CreatePageContentTypes["Hashtag"] && (
                                <ListItemMetaHashtag stage={stage} order={index} id={item.id} name={item?.title} />
                            )}
                            {contentType === CreatePageContentTypes["Video"] && (
                                <ListItemMetaVideo
                                    stage={stage}
                                    order={index}
                                    id={item.id}
                                    thumbnailUrl={item?.thumbnailUrl}
                                />
                            )}
                        </List.Item>
                    );
                }}
            />
        </ReactDragListView>
    );
}
