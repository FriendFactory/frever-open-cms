import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "antd";

import { transformCreatePageRowContent } from "../helpers";
import { createPageInfoByIdSelector } from "../store/reducer";
import { CreatePageContentTypes, CreatePageRowContentShortInfo } from "../services";
import {
    CreatePageRowContentActionType,
    updateCreatePageRowContentAction,
    upsertSingleCreatePageRowAction
} from "../store/actions";
import { SongSearchModalContainer } from "./SearchContent/SongSearchModalContainer";
import { CreatePageRowContentList } from "../components/RowContent/CreatePageRowContentList";
import { TemplateSearchModalContainer } from "./SearchContent/TemplateSearchModalContainer";
import { HashtagSearchModalContainer } from "./SearchContent/HashtagSearchModalContainer";
import { VideoSearchModalContainer } from "./SearchContent/VideoSearchModalContainer";

export interface CreatePageDetailsContentProps {
    stage: string;
    id: number;
}

export function CreatePageDetailsContent({ stage, id }: CreatePageDetailsContentProps) {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(createPageInfoByIdSelector(stage, id));

    const onUpdate = (contents: CreatePageRowContentShortInfo[]) =>
        dispatch(
            upsertSingleCreatePageRowAction({
                stage,
                data: transformCreatePageRowContent({ ...data, content: contents })
            })
        );

    const handleBulkUpdate = (action: "add" | "remove", newContents: CreatePageRowContentShortInfo[]) => {
        if (!data) return;

        dispatch(
            updateCreatePageRowContentAction({
                stage,
                item: data,
                targetContentIds: newContents.map((val) => val.id),
                action: action === "add" ? "Add" : "Delete"
            })
        );
    };

    const isLinked = (id: number) => !!data?.content?.some((el) => el.id === id);

    const updateContent = (contentId: number, action: CreatePageRowContentActionType) => {
        if (!data) return;

        dispatch(
            updateCreatePageRowContentAction({
                stage,
                item: data,
                targetContentIds: [contentId],
                action
            })
        );
    };

    if (data?.contentQuery) return null;

    return (
        <Card
            title="Content list"
            loading={loading && !data}
            extra={
                <>
                    {data?.contentType === CreatePageContentTypes["Song"] && (
                        <SongSearchModalContainer
                            changeStatusOfLinking={({ id }) => updateContent(id, isLinked(id) ? "Delete" : "Add")}
                            bulkUpdate={handleBulkUpdate}
                            isLinked={isLinked}
                        />
                    )}
                    {data?.contentType === CreatePageContentTypes["Template"] && (
                        <TemplateSearchModalContainer
                            changeStatusOfLinking={({ id }) => updateContent(id, isLinked(id) ? "Delete" : "Add")}
                            bulkUpdate={handleBulkUpdate}
                            isLinked={isLinked}
                        />
                    )}
                    {data?.contentType === CreatePageContentTypes["Hashtag"] && (
                        <HashtagSearchModalContainer
                            changeStatusOfLinking={({ id }) => updateContent(id, isLinked(id) ? "Delete" : "Add")}
                            bulkUpdate={handleBulkUpdate}
                            isLinked={isLinked}
                        />
                    )}
                    {data?.contentType === CreatePageContentTypes["Video"] && (
                        <VideoSearchModalContainer
                            changeStatusOfLinking={({ id }) => updateContent(id, isLinked(id) ? "Delete" : "Add")}
                            bulkUpdate={handleBulkUpdate}
                            isLinked={isLinked}
                        />
                    )}
                </>
            }>
            {data ? (
                <CreatePageRowContentList
                    stage={stage}
                    contentType={data.contentType}
                    contents={data?.content}
                    onUpdate={onUpdate}
                    onDelete={(id) => updateContent(id, "Delete")}
                />
            ) : null}
        </Card>
    );
}
