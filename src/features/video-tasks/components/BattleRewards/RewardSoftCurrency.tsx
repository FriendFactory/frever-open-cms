import React, { useRef, useState, useEffect } from "react";
import { InputNumber, Space } from "antd";
import styled from "styled-components";

import CoinIcon from "shared/components/CustomIcons/CoinIcon";
import { ListTitle } from "./ListTitle";

interface RewardSoftCurrencyProps {
    defaultValue: number;
    onEditFinish: (newSoftCurrency: number) => void;
}

export function RewardSoftCurrency({ onEditFinish, defaultValue }: RewardSoftCurrencyProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing) inputRef.current!.focus();
    }, [editing]);

    const toggleEdit = () => setEditing(!editing);

    const save = () => {
        if (inputRef.current) {
            const newSoftCurrency = Number(inputRef.current.value);
            onEditFinish(newSoftCurrency);
        }
        toggleEdit();
    };

    return editing ? (
        <InputStyled
            ref={inputRef}
            controls={false}
            prefix={<CoinIcon />}
            style={{ margin: "0 -16px 0 0" }}
            defaultValue={defaultValue}
            onPressEnter={save}
            onBlur={save}
        />
    ) : (
        <Space size="small" align="baseline" onClick={toggleEdit}>
            <CoinIcon />
            <ListTitle level={5}>{defaultValue}</ListTitle>
        </Space>
    );
}

const InputStyled = styled(InputNumber)`
    width: 80px;

    .ant-input-number-input {
        font-weight: 600 !important;
        font-size: 16px;
        line-height: 1.5;
        letter-spacing: 1px;
    }

    .ant-input-number-prefix {
        margin-inline-end: 8px;
    }
`;
