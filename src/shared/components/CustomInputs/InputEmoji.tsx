import React, { useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Input, InputProps, Modal } from "antd";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import styled from "styled-components";

import { getThemeParams } from "shared/containers/ThemeProvider";

export interface InputEmojiProps extends InputProps {
    onSave?: (newVal: string) => void;
}

export const InputEmoji = ({ onSave, onChange, ...props }: InputEmojiProps) => {
    const themeParams = getThemeParams();
    const [visible, setVisible] = useState(false);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    const onSelectEmoji = (emojiData: any) => {
        const cleanedEmoji = removeVariationSelectorsFromEmoji(emojiData.native);
        onChange && onChange(cleanedEmoji);
        onSave && onSave(emojiData.native);
        close();
    };

    return (
        <>
            <InputStyled {...props} addonAfter={<SmileOutlined onClick={open} />} />
            <ModalStyled
                destroyOnClose
                open={visible}
                footer={false}
                onCancel={close}
                closeIcon={false}
                width={"fit-content"}>
                <Picker
                    data={data}
                    onEmojiSelect={onSelectEmoji}
                    theme={themeParams.dark ? "dark" : "light"}
                    skinTonePosition="none"
                    searchPosition="sticky"
                    maxFrequentRows={0}
                />
            </ModalStyled>
        </>
    );
};

export const InputStyled = styled(Input)`
    .ant-input-group-addon {
        padding: 0;
        cursor: pointer;
    }
    .anticon {
        padding: 8px 11px;
    }
`;

const ModalStyled = styled(Modal)`
    .ant-modal-content {
        background: none;
        box-shadow: none;
    }
`;

const removeVariationSelectorsFromEmoji = (emoji: string): any => {
    const variationSelectorRegex = /[\uFE00-\uFE0F]/g;
    const cleanedEmoji = emoji.replace(variationSelectorRegex, "");
    return cleanedEmoji;
};
