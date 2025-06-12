import React from "react";
import { ButtonProps, CardProps, Form } from "antd";

import { User } from "features/user-moderation/services";
import { UserFilterFields } from "features/user-moderation/components/UserFilterForm";
import { FormInstance } from "antd/lib/form/Form";
import { UserAddOutlined, UserSwitchOutlined } from "@ant-design/icons";

export type UserSearchWindow = React.ComponentType<{
    btnProps: ButtonProps;
    baseSearchParams?: UserFilterFields;
    onUserClick: (user: User) => void;
}>;
export type UserCard = React.ComponentType<{ groupId: number; actions?: CardProps["actions"] }>;

export interface GroupIdFormItemProps extends FormInstance<{ groupId: number }> {
    userSearchWindowComponent: UserSearchWindow;
    userCardComponent: UserCard;
}

export function GroupIdFormItem({
    userCardComponent,
    userSearchWindowComponent,
    getFieldValue,
    setFieldValue,
    validateFields
}: GroupIdFormItemProps) {
    const UserSearchWindowComponent = userSearchWindowComponent;
    const UserCardComponent = userCardComponent;

    const groupId = getFieldValue("groupId");
    const onUserClick = (item: User) => {
        setFieldValue("groupId", item.mainGroupId);
        validateFields();
    };

    return (
        <>
            {!groupId ? (
                <UserSearchWindowComponent
                    btnProps={{ type: "link", children: "Select profile", icon: <UserAddOutlined /> }}
                    onUserClick={onUserClick}
                    baseSearchParams={{ isStarCreator: "true" }}
                />
            ) : (
                <UserCardComponent
                    groupId={groupId}
                    actions={[
                        <UserSearchWindowComponent
                            btnProps={{
                                type: "link",
                                children: "Change profile",
                                icon: <UserSwitchOutlined />
                            }}
                            onUserClick={onUserClick}
                        />
                    ]}
                />
            )}
            <Form.Item name="groupId" noStyle>
                <></>
            </Form.Item>
        </>
    );
}
