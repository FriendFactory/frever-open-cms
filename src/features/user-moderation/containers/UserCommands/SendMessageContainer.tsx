import React, { useState } from "react";
import { Button, Drawer, Flex, Select } from "antd";
import { useChatInfo } from "features/community-moderation/hooks/useChatInfo";
import { useCurrentStage } from "shared";
import { SelectProps } from "antd/lib";
import { ChatContainer } from "features/community-moderation/containers";
import { createGlobalStyle } from "styled-components";

interface SendMessageContainerProps {
    groupId: number;
}

export function SendMessageContainer({ groupId }: SendMessageContainerProps) {
    const stage = useCurrentStage();
    const { freverofficialGroups, chatId, loading, startChat, closeChat } = useChatInfo({ stage });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedOfficialAccount, setSelectedOfficialAccount] = useState<number | null>(null);

    const openChat = () => {
        if (selectedOfficialAccount) startChat(selectedOfficialAccount, groupId);
    };

    const openDrawer = () => setIsDrawerOpen(true);

    const closeDrawer = () => {
        closeChat();
        setSelectedOfficialAccount(null);
        setIsDrawerOpen(false);
    };

    const options: SelectProps["options"] = freverofficialGroups.map((val) => ({ label: val.nickName, value: val.id }));

    return (
        <div>
            <div onClick={openDrawer}>Send Message</div>
            <GlobalStyle />
            <Drawer
                maskClosable={false}
                size="large"
                destroyOnClose
                onClose={closeDrawer}
                open={isDrawerOpen}
                extra={
                    <Flex justify="space-between" gap="middle">
                        <Select
                            placeholder="Select official account..."
                            loading={loading}
                            options={options}
                            onChange={(value: number) => setSelectedOfficialAccount(value)}
                            style={{ width: 190 }}
                        />
                        <Button type="primary" onClick={openChat} disabled={!selectedOfficialAccount}>
                            Start Chat
                        </Button>
                    </Flex>
                }>
                {chatId && <ChatContainer chatId={chatId} handleCloseChat={closeChat} />}
            </Drawer>
        </div>
    );
}

const GlobalStyle = createGlobalStyle`
.ant-drawer{
    z-index: 1000 !important;
}
`;
