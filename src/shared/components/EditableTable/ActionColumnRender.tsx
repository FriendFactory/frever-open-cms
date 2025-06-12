import React from "react";
import { Button, Space } from "antd";
import { CheckOutlined, CloseOutlined, FormOutlined } from "@ant-design/icons";

import { ActionColumnRenderProps } from ".";

export const actionColumnRender = <T extends Record<string, any>>({
    isEditing,
    item,
    onSave,
    onCancel,
    onEdit,
    extra
}: ActionColumnRenderProps<T>) => {
    if (!item?.id) return null;

    return (
        <Space size="small" onClick={(e) => e.stopPropagation()}>
            {isEditing ? (
                <>
                    <Button type="primary" ghost onClick={() => onSave(item.id)} icon={<CheckOutlined />} />
                    <Button type="primary" ghost danger onClick={onCancel} icon={<CloseOutlined />} />
                </>
            ) : (
                <>
                    <Button icon={<FormOutlined />} onClick={() => onEdit(item)} />
                    {extra && extra(item)}
                </>
            )}
        </Space>
    );
};
