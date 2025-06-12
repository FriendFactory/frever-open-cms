import React, { useCallback, useEffect, useState } from "react";
import { Button, ButtonProps, List, Pagination, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { useCurrentStage, ScrollableModal } from "shared";
import { DEFAULT_USER_LIST_PAGE_SIZE } from "urls";
import { userListLoadAction } from "features/user-moderation/store";
import { userListPageSelector } from "features/user-moderation/store/reducer/user/userListReducer";
import { GetUserListParams, User } from "features/user-moderation/services";
import { toUserFilterFormValues, toUserListUrlParams } from "./UserFilterFormContaier";
import { UserFilterFields, UserFilterForm } from "features/user-moderation/components/UserFilterForm";
import { UserItemMeta } from "features/user-moderation/components/UserItemMeta";

interface UserSearchWindowProps {
    btnProps: ButtonProps;
    onUserClick: (value: User) => void;
    baseSearchParams?: UserFilterFields;
}

export function UserSearchWindow({ baseSearchParams = {}, btnProps, onUserClick }: UserSearchWindowProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState<UserFilterFields>(baseSearchParams);

    useEffect(() => {
        handleOnChange(searchParams);
    }, []);

    const userList = useSelector(userListPageSelector(stage, toUserListUrlParams(searchParams)));

    const handleOnChange = (newValues: UserFilterFields) => {
        const params: GetUserListParams = { ...toUserListUrlParams(newValues), skip: 0 };
        dispatch(userListLoadAction({ stage, params }));
        setSearchParams(newValues);
    };

    const handleOnPage = (page: number) => {
        const skip = (page - 1) * DEFAULT_USER_LIST_PAGE_SIZE;
        const params = { ...toUserListUrlParams(searchParams), skip };
        dispatch(userListLoadAction({ stage, params }));
        setSearchParams({ ...searchParams, skip });
    };

    const handleOnUserClick = useCallback(
        (item: User) => () => {
            onUserClick(item);
            setIsModalOpen(false);
        },
        []
    );

    return (
        <>
            <Button {...btnProps} onClick={() => setIsModalOpen(true)} />
            <ScrollableModal
                title="Search Users"
                open={isModalOpen}
                width={1300}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <Pagination
                        showQuickJumper
                        showSizeChanger={false}
                        total={userList.total}
                        current={userList.currentPage}
                        onChange={handleOnPage}
                    />
                }>
                <Space direction="vertical">
                    <UserFilterForm value={toUserFilterFormValues(userList.params)} onChange={handleOnChange} />
                    <List
                        itemLayout="horizontal"
                        bordered
                        loading={userList.loading}
                        dataSource={userList.data}
                        renderItem={(item) => (
                            <List.Item actions={[<a onClick={handleOnUserClick(item)}>Select</a>]}>
                                <UserItemMeta item={item} stage={stage} itemType="list-item" />
                            </List.Item>
                        )}
                    />
                </Space>
            </ScrollableModal>
        </>
    );
}
