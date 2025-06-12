import React from "react";
import { Col, Form, FormProps, Row, Select } from "antd";
import { Gutter } from "antd/es/grid/row";
import { Rule } from "antd/es/form";
import { UserAddOutlined, UserSwitchOutlined } from "@ant-design/icons";

import { AdminRole } from "../services";
import { UserSearchWindow } from "features/user-moderation/containers/UserSearchWindow";
import { User } from "features/user-moderation/services";
import { UserCardContainer } from "features/user-moderation/containers/UserCardContainer";

const gutter: [Gutter, Gutter] = [24, 12];
const rules: Rule[] = [{ required: true }];

export interface CreateUserFormProps extends FormProps {
    roles: AdminRole[];
}

export const CreateUserForm = ({ roles, ...fromProps }: CreateUserFormProps) => {
    return (
        <Form layout="vertical" {...fromProps}>
            <Row gutter={gutter}>
                <Col span={24}>
                    <Form.Item shouldUpdate label="Profile" rules={rules}>
                        {({ getFieldValue, setFieldValue, validateFields }) => {
                            const groupId = getFieldValue("groupId");
                            const onUserClick = (item: User) => {
                                setFieldValue("groupId", item.mainGroupId);
                                validateFields();
                            };

                            return (
                                <>
                                    {!groupId ? (
                                        <UserSearchWindow
                                            btnProps={{
                                                type: "link",
                                                children: "Select profile",
                                                icon: <UserAddOutlined />
                                            }}
                                            onUserClick={onUserClick}
                                        />
                                    ) : (
                                        <UserCardContainer
                                            groupId={groupId}
                                            actions={[
                                                <UserSearchWindow
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
                        }}
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Form.Item label="Roles" name="roleIds" rules={rules}>
                        <Select
                            mode="multiple"
                            allowClear
                            options={roles?.map((role) => ({
                                label: role.name,
                                value: role.id
                            }))}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};
