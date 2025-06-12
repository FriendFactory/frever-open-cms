import React from "react";
import { ButtonProps, CardProps, ColProps, Form, FormProps, Select, Switch } from "antd";
import { UserAddOutlined, UserSwitchOutlined } from "@ant-design/icons";

import { User } from "features/user-moderation/services";
import { knownBotActivitieTypes } from "../constants";
import { Bot } from "../services";

const rules = [{ required: true }];
export const allowedActivityTypesOptions = knownBotActivitieTypes.map((el) => ({ label: el.name, value: el.id }));

export type UserSearchWindow = React.ComponentType<{ btnProps: ButtonProps; onUserClick: (user: User) => void }>;
export type UserCard = React.ComponentType<{ groupId: number; actions?: CardProps["actions"] }>;

export interface BotFormProps extends FormProps<Bot> {
    colProps?: ColProps;
    userSearchWindowComponent: UserSearchWindow;
    userCardComponent: UserCard;
}

export function BotForm({ userCardComponent, userSearchWindowComponent, ...props }: BotFormProps) {
    const UserSearchWindowComponent = userSearchWindowComponent;
    const UserCardComponent = userCardComponent;

    return (
        <Form layout="vertical" {...props}>
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
                                <UserSearchWindowComponent
                                    btnProps={{ type: "link", children: "Select profile", icon: <UserAddOutlined /> }}
                                    onUserClick={onUserClick}
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
                }}
            </Form.Item>

            <Form.Item name="allowedActivityTypes" label="Allowed activity types">
                <Select allowClear mode="multiple" options={allowedActivityTypesOptions} />
            </Form.Item>

            <Form.Item name="isEnabled" label="Enabled" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item name="runInSimulationMode" label="Run in simulation mode" valuePropName="checked">
                <Switch />
            </Form.Item>
        </Form>
    );
}
