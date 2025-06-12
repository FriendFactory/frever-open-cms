import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Button, Card, message } from "antd";
import { useForm } from "antd/lib/form/Form";

import { replaceFalsyValuesWithNull } from "utils";
import { FixedPageHeader, useExtraData } from "shared";
import { updateTaskAction } from "../store/actions";
import { taskDetailsPageSelector } from "../store/reducer";
import { eventsOfLevelSelector } from "features/video-moderation";
import { TaskForm } from "../components/TaskForm";
import { TaskFormData } from "../components/CreateTaskForm";

export interface TaskFormContainerProps {
    stage: string;
    id: number;
}

export function TaskFormContainer({ stage, id }: TaskFormContainerProps) {
    const dispatch = useDispatch();
    const [form] = useForm<TaskFormData>();
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);

    const info = useSelector(taskDetailsPageSelector(stage, id));
    const events = useSelector(eventsOfLevelSelector(stage, info.data?.levelId));
    const pagesNavigations = useExtraData({ stage, name: "PagesNavigation" });

    useEffect(() => {
        if (info.data) {
            form.resetFields();
        }
    }, [info.data]);

    const handleOnFinish = async () => {
        const formData = await form.validateFields();
        const pages = pagesNavigations.data?.find((el) => el.id === formData.pagesNavigationId)?.pages;

        try {
            if (info.data?.id && formData.isDressed !== undefined && pages) {
                const isValid = isDressedValueValid(formData.isDressed, pages);

                if (!isValid) {
                    throw new Error(
                        'The value of isDressed must be set to "true" when the Character Editor is not selected as the starting point for Pages Navigation. Please update the value of isDressed to "true" or choose a different starting point.'
                    );
                }

                dispatch(
                    updateTaskAction({
                        stage,
                        id: info.data.id,
                        data: replaceFalsyValuesWithNull(formData)
                    })
                );
                setIsSaveHeaderOpen(false);
            } else {
                throw new Error("PagesNavigation pages data or task data is missing");
            }
        } catch (e) {
            message.error((e as Error).toString());
        }
    };

    const hadnelOnReset = () => {
        form.resetFields();
        setIsSaveHeaderOpen(false);
    };

    return (
        <Card loading={!info.data && info.loading}>
            <TaskForm
                form={form}
                initialValues={
                    info.data && {
                        ...info.data,
                        pagesNavigationId: info.data.pagesNavigation?.id,
                        publishingTime: dayjs.utc(info.data.publishingTime),
                        deadline: dayjs.utc(info.data.deadline)
                    }
                }
                onValuesChange={() => setIsSaveHeaderOpen(true)}
                events={events?.data}
                eventsLoading={(events?.loading && !events?.data) ?? false}
                stage={stage}
            />
            {isSaveHeaderOpen && (
                <FixedPageHeader
                    title="Unsaved changes"
                    extra={[
                        <Button key="reset" onClick={hadnelOnReset}>
                            Discard
                        </Button>,
                        <Button
                            disabled={info.loading || events.loading || pagesNavigations.loading}
                            key="save"
                            type="primary"
                            onClick={handleOnFinish}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Card>
    );
}

// All tasks starts not with CE (newPagesNavigation?.pages[0] !== 2) isDressed value must be equal to true
export const isDressedValueValid = (isDressed: boolean, pages: number[]) =>
    pages[0] !== 2 ? isDressed === true : true;
