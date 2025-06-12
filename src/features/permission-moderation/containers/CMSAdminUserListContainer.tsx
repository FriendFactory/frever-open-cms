import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tag } from "antd";

import { AdminUser, AdminUsersQueryParams } from "../services";
import { cmsAdminUserUpdateAction, permissionRolePageSelector, permissionUserPageSelector } from "../store";
import {
    ActionColumnProps,
    actionColumnRender,
    ActionColumnRenderProps,
    EditableTable,
    EditableTableColumn,
    ProtectedLink
} from "shared";
import { permissionFreverOfficialPageSelector } from "../store/reducer/cmsAdminFreverOfficialListReducer";
import { CreateUserFormContainer } from "./CreateUserFormContainer";
import { USER_DETAILS_INFO_URL } from "urls";

type CMSAdminUserWithId = AdminUser & { id: number; roleIds: number[] };

export interface CMSAdminUserListContainerProps {
    stage: string;
    params?: AdminUsersQueryParams;
}

export const CMSAdminUserListContainer = ({ stage, params }: CMSAdminUserListContainerProps) => {
    const dispatch = useDispatch();

    const infoUsers = useSelector(permissionUserPageSelector(stage, params));
    const infoRoles = useSelector(permissionRolePageSelector(stage));
    const infoFreverOfficial = useSelector(permissionFreverOfficialPageSelector(stage));

    const handleOnFinish = (newData: CMSAdminUserWithId, sourceData: CMSAdminUserWithId) => {
        const { id, roleIds, ...dataProps } = { ...sourceData, ...newData };
        const data: AdminUser = {
            ...dataProps,
            roles: infoRoles.data?.filter((role) => roleIds.includes(role.id)) ?? []
        };

        dispatch(cmsAdminUserUpdateAction({ stage, data }));
    };

    const handleOnDelete = (sourceData: CMSAdminUserWithId) => {
        const { id, roleIds, ...dataProps } = { ...sourceData };
        const data: AdminUser = {
            ...dataProps,
            roles: []
        };

        dispatch(cmsAdminUserUpdateAction({ stage, data }));
    };

    const linkedFreverOfficialAccounts = useCallback(
        (user: CMSAdminUserWithId) =>
            infoFreverOfficial?.data?.filter((val) => user.freverOfficialGroupIds?.some((v) => v === val.id)),
        [infoFreverOfficial.data]
    );

    const columns: EditableTableColumn<CMSAdminUserWithId>[] = [
        {
            title: "Group ID",
            dataIndex: "groupId",
            width: 50,
            render: (_, record) => (
                <ProtectedLink
                    feature="Social"
                    to={USER_DETAILS_INFO_URL.format({ stage, id: record.groupId, selector: "mainGroupId" })}>
                    {record.groupId}
                </ProtectedLink>
            )
        },
        {
            title: "Email",
            dataIndex: "email",
            width: 120
        },
        {
            title: "Roles",
            dataIndex: "roleIds",
            width: 120,
            editableCellProps: {
                allowClear: true,
                type: "select",
                mode: "multiple",
                options: infoRoles.data && infoRoles.data.map(({ name, id }) => ({ label: name, value: id }))
            },
            render: (_, record) => record?.roles?.map((item) => <Tag key={item.id}>{item.name}</Tag>)
        },
        {
            title: "Chat Account",
            dataIndex: "freverOfficialGroupIds",
            width: 120,
            editableCellProps: {
                allowClear: true,
                type: "select",
                mode: "multiple",
                options:
                    infoFreverOfficial.data &&
                    infoFreverOfficial.data.map(({ id, nickName }) => ({ label: nickName, value: id }))
            },
            render: (_, record) =>
                linkedFreverOfficialAccounts(record) &&
                linkedFreverOfficialAccounts(record)?.map((item) => <Tag key={item.nickName}>{item.nickName}</Tag>)
        }
    ];

    const actionColumnProps: ActionColumnProps = {
        title: <CreateUserFormContainer />,
        render: (props: ActionColumnRenderProps<CMSAdminUserWithId>) =>
            actionColumnRender({
                ...props,
                extra: (item) => (
                    <Popconfirm
                        title="Delete User"
                        description="Are you sure to delete this user?"
                        placement="topLeft"
                        onConfirm={() => handleOnDelete(item)}
                        okText="Confirm"
                        okType="danger"
                        cancelText="Cancel">
                        <Button danger ghost icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                )
            })
    };

    const data = useMemo(() => addIdToUsers(infoUsers.data), [infoUsers.loading]);

    return (
        <EditableTable
            pagination={false}
            loading={infoUsers.loading && !data}
            dataSource={data ?? []}
            columns={columns}
            onFinish={handleOnFinish}
            actionColumnProps={actionColumnProps}
        />
    );
};

function addIdToUsers(users?: AdminUser[]) {
    return users?.map((el, index) => ({ ...el, id: index + 1, roleIds: el.roles.map((role) => role.id) }));
}
