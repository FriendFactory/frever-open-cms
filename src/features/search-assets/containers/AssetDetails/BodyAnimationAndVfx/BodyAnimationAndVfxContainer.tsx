import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { App, Button, Card, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

import { FixedPageHeader, parseMillisecondsToSeconds, parseSecondsToMilliseconds } from "shared";
import { BodyAnimationAndVfxForm } from "features/search-assets/components/BodyAnimationAndVfx/BodyAnimationAndVfxForm";
import {
    assetDetailsSelector,
    deleteBundleVfxAndBodyAnimAction,
    updateBundleVfxAndBodyAnimAction
} from "features/search-assets/store";
import { BodyAnimationAsset, BodyAnimationAndVfx } from "features/search-assets/services";

interface BodyAnimationAndVfxContainerProps {
    stage: string;
    id: number;
}

export function BodyAnimationAndVfxContainer({ stage, id }: BodyAnimationAndVfxContainerProps) {
    const dispatch = useDispatch();
    const { message } = App.useApp();
    const [form] = useForm<{ vfxId: number; startTime: number | null; endTime: number | null }>();
    const info = useSelector(assetDetailsSelector(stage, "BodyAnimation", id), shallowEqual);

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    useEffect(() => form.resetFields(), [info.data?.bodyAnimationAndVfx]);

    const showSaveHeader = () => setIsSaveHeaderOpen(true);

    const discard = () => {
        setIsSaveHeaderOpen(false);
        form.resetFields();
    };

    const handleOnClickSave = async () => {
        const formData = await form.validateFields();

        if (!formData || !info.data) {
            message.error("Something went wrong. Source data is missing");
            return;
        }

        const updatedData = {
            id: info.data?.id,
            bodyAnimationAndVfx: [
                {
                    ...formData,
                    startTime: formData.startTime && parseSecondsToMilliseconds(formData.startTime),
                    endTime: formData.endTime && parseSecondsToMilliseconds(formData.endTime)
                }
            ]
        } as BodyAnimationAsset;

        dispatch(
            updateBundleVfxAndBodyAnimAction({
                stage,
                assetType: "BodyAnimation",
                id,
                clearTargetId: formData.vfxId,
                clearTargetType: "VFX",
                data: updatedData
            })
        );

        setIsSaveHeaderOpen(false);
    };

    const deleteBundle = () => dispatch(deleteBundleVfxAndBodyAnimAction({ stage, assetType: "BodyAnimation", id }));

    return (
        <Card
            loading={info.loading}
            title={<Typography.Text>Bundle VFX</Typography.Text>}
            extra={
                <Button danger type="link" onClick={deleteBundle}>
                    Delete
                </Button>
            }>
            <BodyAnimationAndVfxForm
                form={form}
                onFieldsChange={showSaveHeader}
                initialValues={
                    {
                        vfxId: info.data?.bodyAnimationAndVfx?.[0]?.vfxId ?? null,
                        startTime: info.data?.bodyAnimationAndVfx?.[0]?.startTime
                            ? parseMillisecondsToSeconds(info.data?.bodyAnimationAndVfx?.[0]?.startTime)
                            : null,
                        endTime: info.data?.bodyAnimationAndVfx?.[0]?.endTime
                            ? parseMillisecondsToSeconds(info.data?.bodyAnimationAndVfx?.[0]?.endTime)
                            : null
                    } as BodyAnimationAndVfx
                }
            />
            <FixedPageHeader
                title="Unsaved chagnes"
                open={isSaveHeaderOpen}
                extra={
                    <>
                        <Button onClick={discard}>Discard</Button>
                        <Button type="primary" onClick={handleOnClickSave}>
                            Save
                        </Button>
                    </>
                }
            />
        </Card>
    );
}
