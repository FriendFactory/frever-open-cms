import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Form, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AdminUser, AdminUserData } from "../services";
import { CMS_ADMIN_USERS_PAGE_URL } from "urls";
import { cmsAdminUserUpdateAction, permissionRolePageSelector } from "../store";
import { CreateUserForm } from "../components/CreateUserForm";

export function CreateUserFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [form] = Form.useForm<AdminUserData>();

    const urlMatch = CMS_ADMIN_USERS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;

    const infoRoles = useSelector(permissionRolePageSelector(stage));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async () => {
        const formData = await form.validateFields();

        const data: AdminUser = {
            groupId: formData.groupId!,
            roles: infoRoles.data?.filter((val) => formData.roleIds.some((id) => id === val.id)) ?? [],
            freverOfficialGroupIds: [],
            email: "",
            nickname: ""
        };

        dispatch(cmsAdminUserUpdateAction({ stage, data }));

        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <Modal
                title="Add User"
                open={isModalOpen}
                destroyOnClose
                onCancel={hideModal}
                footer={[
                    <Button key="close" onClick={hideModal}>
                        Close
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOnFinish}>
                        Submit
                    </Button>
                ]}>
                <CreateUserForm form={form} roles={infoRoles?.data ?? []} />
            </Modal>
        </>
    );
}
