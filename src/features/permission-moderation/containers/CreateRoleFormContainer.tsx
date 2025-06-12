import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Form, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { AdminRoleData } from "../services";
import { CMS_ADMIN_ROLES_PAGE_URL } from "urls";
import { cmsAdminRoleUpdateAction } from "../store";
import { CreateRoleForm } from "../components/CreateRoleForm";
import { permissionAccessScopePageSelector } from "../store/reducer/cmsAdminAccessScopeListReducer";

export function CreateRoleFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [form] = Form.useForm<AdminRoleData>();

    const urlMatch = CMS_ADMIN_ROLES_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const { stage } = urlMatch.params;

    const infoAccessScope = useSelector(permissionAccessScopePageSelector(stage));

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const handleOnFinish = async () => {
        const data = await form.validateFields();

        dispatch(cmsAdminRoleUpdateAction({ stage, data }));

        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <Modal
                title="Add Role"
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
                <CreateRoleForm form={form} accessScopes={infoAccessScope?.data ?? []} />
            </Modal>
        </>
    );
}
