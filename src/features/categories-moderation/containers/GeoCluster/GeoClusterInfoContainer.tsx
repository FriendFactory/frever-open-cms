import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form } from "antd";

import { geoClustersDetailsPageSelector } from "../../store/reducer/geoClusters/geoClustersDetailsPageReducer";
import { GeoClusterFormContainer } from "./GeoClusterFormContainer";
import { FixedPageHeader } from "shared";
import { executeUpdateGeoClusterAction } from "features/categories-moderation/store/actions";
import { GeoCluster } from "features/categories-moderation/services";

export interface GeoClusterInfoContainerProps {
    stage: string;
    id: number;
}

export function GeoClusterInfoContainer({ stage, id }: GeoClusterInfoContainerProps) {
    const [openSaveHeader, setOpenSaveHeader] = useState<boolean>(false);
    const dispatch = useDispatch();

    const [form] = Form.useForm<GeoCluster>();

    const info = useSelector(geoClustersDetailsPageSelector(stage, id));

    const handleOnSave = async () => {
        const data = await form.validateFields();
        dispatch(executeUpdateGeoClusterAction({ stage, id, data }));

        setOpenSaveHeader(false);
    };

    const handleOnCancel = () => {
        form.resetFields();
        setOpenSaveHeader(false);
    };

    return (
        <Card title="Information" loading={info.loading && !info.data}>
            <GeoClusterFormContainer initialValues={info.data} form={form} onChange={() => setOpenSaveHeader(true)} />
            {openSaveHeader && (
                <FixedPageHeader
                    title="Unsaved changes"
                    extra={[
                        <Button onClick={handleOnCancel}>Cancel</Button>,
                        <Button type="primary" onClick={handleOnSave}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Card>
    );
}
