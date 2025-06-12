import React, { useEffect, useState } from "react";
import { Button, List, Pagination, Space, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { botCommentListLoadAction } from "../store/actions";
import { ScrollableModal, useCurrentStage } from "shared";
import { botCommentListPageSelector } from "../store/reducer/comment";
import { DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE } from "urls";
import { BotCommentsFilterFields, BotCommentsFilterForm } from "../components/BotCommentsFilterForm";

export interface CommentListWindowContainerProps {
    renderAction: (commentId: number) => React.ReactNode;
}

export function CommentListWindowContainer({ renderAction }: CommentListWindowContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState<BotCommentsFilterFields>({});

    useEffect(() => {
        handleOnChange({});
    }, []);

    const list = useSelector(botCommentListPageSelector(stage, searchParams));

    const handleOnChange = (newValues: BotCommentsFilterFields) => {
        const params = { ...newValues, skip: 0 };
        dispatch(botCommentListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    const handleOnPage = (page: number) => {
        const skip = (page - 1) * DEFAULT_BOT_COMMENT_LIST_PAGE_SIZE;
        const params = { ...searchParams, skip };
        dispatch(botCommentListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    return (
        <>
            <Tooltip title="Add existing comments">
                <Button type="primary" ghost onClick={() => setIsModalOpen(true)}>
                    All comments
                </Button>
            </Tooltip>
            <ScrollableModal
                title="Search Users"
                open={isModalOpen}
                width={900}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <Pagination
                        showQuickJumper
                        showSizeChanger={false}
                        total={list.total}
                        current={list.currentPage}
                        onChange={handleOnPage}
                    />
                }>
                <Space direction="vertical">
                    <BotCommentsFilterForm values={searchParams} onChange={handleOnChange} />
                    <List
                        itemLayout="horizontal"
                        bordered
                        loading={list.loading}
                        dataSource={list.data}
                        renderItem={(item) => (
                            <List.Item actions={[renderAction(item.id)]}>
                                <List.Item.Meta title={item.commentText} />
                            </List.Item>
                        )}
                    />
                </Space>
            </ScrollableModal>
        </>
    );
}
