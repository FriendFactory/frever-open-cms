import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

import { cmsAdminRoleDeleteAction, cmsAdminRoleUpdateAction, permissionRolePageSelector } from "../store";

import {
    ActionColumnProps,
    actionColumnRender,
    ActionColumnRenderProps,
    EditableTable,
    EditableTableColumn
} from "shared";
import { AdminRole, AdminRoleData } from "../services";
import { Button, Popconfirm, Tag } from "antd";
import { permissionAccessScopePageSelector } from "../store/reducer/cmsAdminAccessScopeListReducer";
import { CreateRoleFormContainer } from "./CreateRoleFormContainer";

export interface CMSAdminRoleListContainerProps {
    stage: string;
}

export const CMSAdminRoleListContainer = ({ stage }: CMSAdminRoleListContainerProps) => {
    const dispatch = useDispatch();
    const infoRole = useSelector(permissionRolePageSelector(stage));
    const infoAccessScope = useSelector(permissionAccessScopePageSelector(stage));

    const columns: EditableTableColumn<AdminRole>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 50
        },
        {
            title: "Role",
            dataIndex: "name",
            width: 50
        },
        {
            title: "Scope",
            dataIndex: "accessScopes",
            width: 300,
            editableCellProps: {
                mode: "multiple",
                options:
                    infoAccessScope.data &&
                    infoAccessScope.data.map(({ name, value }) => ({ label: name, value: value }))
            },
            render: (_, record) => record.accessScopes.map((item) => <Tag key={item.name}>{item.name}</Tag>)
        }
    ];

    const actionColumnProps: ActionColumnProps = {
        title: <CreateRoleFormContainer />,
        render: (props: ActionColumnRenderProps<AdminRole>) =>
            actionColumnRender({
                ...props,
                extra: (item) => (
                    <Popconfirm
                        title="Delete Role"
                        placement="topLeft"
                        description="Are you sure to delete this role?"
                        onConfirm={handleOnDelete(item)}
                        okText="Confirm"
                        okType="danger"
                        cancelText="Cancel">
                        <Button danger ghost icon={<DeleteOutlined />}></Button>
                    </Popconfirm>
                )
            })
    };

    const handleOnFinish = (newData: any, sourceData: AdminRole) => {
        const data: AdminRoleData = { ...sourceData, ...newData };

        dispatch(cmsAdminRoleUpdateAction({ stage, data }));
    };

    const handleOnDelete = (role: AdminRole) => () => dispatch(cmsAdminRoleDeleteAction({ stage, id: role.id }));

    return (
        <EditableTable
            pagination={false}
            loading={infoRole.loading && !infoRole?.data}
            dataSource={infoRole?.data ?? []}
            columns={columns}
            onFinish={handleOnFinish}
            actionColumnProps={actionColumnProps}
        />
    );
};
