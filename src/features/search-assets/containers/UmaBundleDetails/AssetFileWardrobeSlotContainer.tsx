import React, { useState } from "react";
import { Button, Select, Space } from "antd";
import { useDispatch } from "react-redux";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { UmaAsset } from "features/search-assets/services";
import { editUmaAssetAction } from "features/search-assets/store";
import { useExtraData } from "shared/hooks/useExtraData";

const { Option } = Select;

export interface AssetFileWardrobeSlotContainerProps {
    stage: string;
    data: UmaAsset;
}

export function AssetFileWardrobeSlotContainer({ stage, data }: AssetFileWardrobeSlotContainerProps) {
    const dispatch = useDispatch();

    const assetWardrobeSlot = useExtraData({ stage, name: "AssetWardrobeSlot" });

    const [slotId, setSlotId] = useState<number | undefined>(data.assetWardrobeSlotId ?? undefined);
    const [saveBtnStatus, setSaveBtnStatus] = useState(false);

    const handleChangeSlot = (id: number | undefined) => {
        setSlotId(id);
        setSaveBtnStatus(true);
    };

    const handleSaveSlot = () => {
        dispatch(editUmaAssetAction({ stage, data: { id: data.id, assetWardrobeSlotId: slotId ?? null } }));
        setSaveBtnStatus(false);
    };

    const handleCancel = () => {
        setSlotId(data.assetWardrobeSlotId ?? undefined);
        setSaveBtnStatus(false);
    };

    return (
        <Space wrap={false}>
            <Select
                style={{ width: "180px" }}
                value={slotId}
                loading={assetWardrobeSlot.loading}
                allowClear
                onChange={handleChangeSlot}>
                {assetWardrobeSlot.data?.map((el) => (
                    <Option key={el.id} value={el.id}>
                        {el.name}
                    </Option>
                ))}
            </Select>

            {saveBtnStatus && (
                <>
                    <Button
                        disabled={!saveBtnStatus}
                        type="primary"
                        ghost
                        onClick={handleSaveSlot}
                        icon={<CheckOutlined />}
                    />

                    <Button
                        disabled={!saveBtnStatus}
                        danger
                        type="primary"
                        ghost
                        onClick={handleCancel}
                        icon={<CloseOutlined />}
                    />
                </>
            )}
        </Space>
    );
}
