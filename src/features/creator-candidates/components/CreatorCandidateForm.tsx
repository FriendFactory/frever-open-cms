import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Input, Space, Tag } from "antd";

import { ColumnsLayout } from "layout/ColumnsLayout";

export interface CreatorCandidateFormProps {
    onFinish: (emails: string[]) => void;
    onValidate: (isValid: boolean) => void;
}

export const CreatorCandidateForm = forwardRef(({ onValidate, onFinish }: CreatorCandidateFormProps, ref) => {
    const [emailString, setEmailString] = useState("");
    const [emails, setEmails] = useState<{ isValid: boolean; email: string }[]>([]);

    const handleOnValidate = () => {
        const newEmails = [
            ...new Set([
                ...emails,
                ...emailString
                    .split(",")
                    .map((el) => {
                        const email = el.trim();
                        return { email, isValid: validateEmail(email) };
                    })
                    .filter((el) => !!el.email)
            ])
        ];

        setEmails(newEmails);
        setEmailString("");
        onValidate(newEmails.every((el) => el.isValid));
    };

    const handleOnCloseTag = (email: string) => () => {
        const newEmails = emails.filter((el) => el.email !== email);
        setEmails(newEmails);
        onValidate(newEmails.every((el) => el.isValid));
    };

    useImperativeHandle(ref, () => ({
        onSubmit: () => onFinish(emails.map((el) => el.email))
    }));

    return (
        <ColumnsLayout>
            <ColumnsLayout>
                <Input.TextArea rows={6} value={emailString} onChange={(e) => setEmailString(e.target.value)} />
                <Button type="primary" onClick={handleOnValidate}>
                    Validate
                </Button>
            </ColumnsLayout>

            <Space size={[0, 8]} wrap>
                {emails.map((el) => (
                    <Tag
                        key={el.email}
                        color={el.isValid ? "success" : "error"}
                        closable
                        onClose={handleOnCloseTag(el.email)}>
                        {el.email}
                    </Tag>
                ))}
            </Space>
        </ColumnsLayout>
    );
});

function validateEmail(email: string) {
    var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return re.test(email);
}
