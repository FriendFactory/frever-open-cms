import React, { useState } from "react";
import { Form, Modal, Select } from "antd";
import { useDispatch } from "react-redux";
import { useForm } from "antd/lib/form/Form";

import { useExtraData } from "shared/hooks/useExtraData";
import { bulkAssetUpdateAction } from "../store";
import { AssetDataNames } from "../services";
import { replaceFalsyValuesWithNull } from "utils";

export interface BulkAssetFormContainerProps {
    stage: string;
    assetType: AssetDataNames;
    assetIds: number[];
}

export function BulkAssetFormContainer({ stage, assetIds, assetType }: BulkAssetFormContainerProps) {
    const dispatch = useDispatch();
    const [form] = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const assetTiers = useExtraData({ stage, name: "AssetTier" });

    const handleOnFinish = async () => {
        const values = await form.validateFields();
        setIsModalOpen(false);

        const assetList = assetIds.map((id) => ({ id, ...replaceFalsyValuesWithNull(values) }));
        dispatch(bulkAssetUpdateAction({ stage, assetType, assetList }));
    };

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>Bulk Tier Add</div>
            <Modal
                title={`Bulk Tier Adding (${assetIds.length} assets selected)`}
                okText="Submit"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleOnFinish}
                destroyOnClose>
                <Form form={form} initialValues={{ assetTierId: null }}>
                    <Form.Item label="Asset Tier" name="assetTierId">
                        <Select allowClear loading={assetTiers.loading}>
                            {assetTiers.data?.map((el) => (
                                <Select.Option key={el.id} value={el.id}>
                                    {el.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
