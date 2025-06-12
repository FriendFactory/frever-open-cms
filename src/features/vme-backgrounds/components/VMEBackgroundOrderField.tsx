import { InputNumber, Space } from "antd";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

export interface VMEBackgroundOrderFieldProps {
    label: string;
    defaultValue: number | null;
    onEditFinish: (value: number | null) => void;
}

export function VMEBackgroundOrderField({ label, onEditFinish, defaultValue }: VMEBackgroundOrderFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (editing) inputRef.current!.focus();
    }, [editing]);

    const enableEditing = () => setEditing(true);

    const save = () => {
        if (inputRef.current) {
            const value = Number(inputRef.current.value) || null;

            if (value !== defaultValue) onEditFinish(value);
        }
        setEditing(false);
    };

    return (
        <SpaceStyled size="small" align="center" onClick={enableEditing}>
            <strong>{label}&nbsp;:</strong>
            {editing ? (
                <InputStyled
                    ref={inputRef}
                    controls={false}
                    defaultValue={defaultValue ?? ""}
                    onPressEnter={save}
                    onBlur={save}
                />
            ) : (
                <strong>{defaultValue ?? "--"}</strong>
            )}
        </SpaceStyled>
    );
}

const InputStyled = styled(InputNumber)`
    width: 80px;
    margin: 0 0 0 -12px;

    .ant-input-number-input {
        font-weight: 600 !important;
        font-size: 14px;
    }
`;

const SpaceStyled = styled(Space)`
    width: 120px;
    cursor: pointer;
`;
