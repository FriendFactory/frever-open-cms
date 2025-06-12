import { Typography, InputNumber, Space } from "antd";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

export interface VideoPosition {
    label: string;
    defaultValue: number | null;
    onEditFinish: (value: number) => void;
}

export function VideoPosition({ label, onEditFinish, defaultValue }: VideoPosition) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing) inputRef.current!.focus();
    }, [editing]);

    const enableEditing = () => setEditing(true);

    const save = () => {
        if (inputRef.current) {
            const value = Number(inputRef.current.value);

            if (value !== defaultValue) onEditFinish(value);
        }
        setEditing(false);
    };

    return (
        <SpaceStyled size="small" align="center" onClick={enableEditing}>
            <Typography.Title level={5}>{label}&nbsp;:&nbsp;&nbsp;</Typography.Title>
            {editing ? (
                <InputStyled
                    ref={inputRef}
                    min={1}
                    defaultValue={defaultValue ?? ""}
                    onPressEnter={save}
                    onBlur={save}
                />
            ) : (
                <Typography.Title level={5}>{defaultValue}</Typography.Title>
            )}
        </SpaceStyled>
    );
}

const InputStyled = styled(InputNumber)`
    width: 100px;
    margin: 0 0 0 -12px;

    .ant-input-number-input {
        font-weight: 600 !important;
        font-size: 16px;
    }
`;

const SpaceStyled = styled(Space)`
    cursor: pointer;

    h5 {
        padding: 0;
        margin: 4px 0;
    }
`;
