import React, { useState } from "react";
import { Card, Descriptions, Flex, Modal } from "antd";

import { LoadingContainer, ProtectedLink } from "shared";
import { useCurrentCMSAdminUser } from "../hooks/useCurrentCMSAdminUser";
import { USER_DETAILS_INFO_URL } from "urls";

export function CurrentCMSUserContainer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const { cmsAdminUserInfo, email, loading } = useCurrentCMSAdminUser();

    return (
        <>
            <span onClick={showModal}>My roles</span>
            <Modal
                title={`My profile → ${email}`}
                open={isModalOpen}
                onCancel={hideModal}
                footer={false}
                style={{ top: 20 }}>
                <Flex vertical gap="small">
                    {cmsAdminUserInfo &&
                        Object.keys(cmsAdminUserInfo).map((stage) => (
                            <Card key={stage} type="inner">
                                <Descriptions layout="horizontal" size="small">
                                    <Descriptions.Item span={24} label="Environment">
                                        {stage}
                                    </Descriptions.Item>
                                    <Descriptions.Item span={24} label="Group ID">
                                        <ProtectedLink
                                            feature="Social"
                                            to={USER_DETAILS_INFO_URL.format({
                                                stage,
                                                id: Number(cmsAdminUserInfo[stage].groupId),
                                                selector: "mainGroupId"
                                            })}>
                                            {cmsAdminUserInfo[stage].groupId}
                                        </ProtectedLink>
                                    </Descriptions.Item>
                                    <Descriptions.Item span={24} label="Roles">
                                        {cmsAdminUserInfo[stage].scopes.map((val) => val.name).join(", ")}
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        ))}
                </Flex>
                <LoadingContainer loading={loading} />
            </Modal>
        </>
    );
}
