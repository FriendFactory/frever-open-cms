import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, message } from "antd";

import { getLevelCharacters, Task } from "features/video-tasks/services";
import { CreateTaskForm, TaskFormData } from "features/video-tasks/components/CreateTaskForm";
import { createTaskAction } from "features/video-tasks/store/actions";
import { useForm } from "antd/lib/form/Form";
import { isDressedValueValid } from "../TaskFormContainer";
import { LoadingContainer, ScrollableModal, useExtraData } from "shared";

const TaskCreationFormId = "create-task-form";

export interface CreateTaskContainerProps {
    stage: string;
    levelId?: number | null;
    templateId?: number | null;
    button: React.ReactNode;
}

export function CreateTaskContainer({ stage, button, levelId = null, templateId = null }: CreateTaskContainerProps) {
    const dispatch = useDispatch();
    const [form] = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const pagesNavigations = useExtraData({ stage, name: "PagesNavigation" });

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    useEffect(() => {
        (async () => {
            if (levelId) {
                const characters = await getLevelCharacters(stage, levelId);
                if (characters.length) {
                    form.setFieldValue(
                        "characterReplacement",
                        characters.map((el, index) => ({
                            originalCharacterId: el.id,
                            replaceCharacterId: null,
                            replaceWithMainCharacter: index === 0,
                            originalCharacter: el
                        }))
                    );
                }
            }
        })();
    }, []);

    const handleOnFinish = (formData: TaskFormData) => {
        const {
            publishingTime,
            deadline,
            characterReplacement,
            levelCharactersCount,
            templateCharactersCount,
            isDressed,
            defaultRewards,
            ...restFields
        } = formData;
        const data: Partial<Task> = { ...restFields };

        if (levelCharactersCount && templateCharactersCount && !(levelCharactersCount >= templateCharactersCount)) {
            form.setFields([
                {
                    name: "levelCharactersCount",
                    errors: [
                        "Level unique characters count must be >= template character count.",
                        `Level Characters Count: ${levelCharactersCount}`
                    ]
                },
                {
                    name: "templateCharactersCount",
                    errors: [
                        "Level unique characters count must be >= template character count.",
                        `Template Characters Count: ${templateCharactersCount}`
                    ]
                }
            ]);

            return;
        }

        const pages = pagesNavigations.data?.find((el) => el.id === formData.pagesNavigationId)?.pages;
        if (!pages) return;

        const isValid = isDressedValueValid(!!isDressed, pages);
        if (!isValid) {
            message.warning(
                'Warning: The value of isDressed must be set to "true" when the Character Editor is not selected as the starting point for Pages Navigation. Please update the value of isDressed to "true" or choose a different starting point.'
            );
            return;
        } else {
            data.isDressed = isDressed;
        }

        if (publishingTime) data.publishingTime = publishingTime.utc().format();
        if (deadline) data.deadline = deadline.utc().format();
        if (characterReplacement) {
            data.characterReplacement = characterReplacement.filter(
                (el) => el.replaceWithMainCharacter || el.replaceCharacterId
            );
        }

        if (!data.levelId && !data.templateId) {
            message.warning("LevelId or TemplateId must be not null");
            return;
        }

        dispatch(createTaskAction({ stage, data, battleRewards: defaultRewards }));
        destroyModal();
    };

    return (
        <>
            <div onClick={showModal}>{button}</div>
            <ScrollableModal
                title="Create Task"
                width={768}
                open={isModalOpen}
                destroyOnClose
                footer={[
                    <Button key="create-task-cancel" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button key="create-task-submit" htmlType="submit" type="primary" form={TaskCreationFormId}>
                        Create Task
                    </Button>
                ]}
                onCancel={destroyModal}
                maskClosable={false}>
                <LoadingContainer loading={pagesNavigations.loading} />
                <CreateTaskForm
                    scrollToFirstError
                    stage={stage}
                    id={TaskCreationFormId}
                    form={form}
                    initialValues={{ useLevelVideo: true, levelId, templateId }}
                    onFinish={handleOnFinish}
                />
            </ScrollableModal>
        </>
    );
}
