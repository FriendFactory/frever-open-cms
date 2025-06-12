import React from "react";
import { Form, Input, Select, Switch, DatePicker, Collapse, FormProps, FormInstance } from "antd";
import dayjs, { Dayjs } from "dayjs";

import { Task } from "features/video-tasks/services";
import { taskType } from "features/video-tasks/constants";
import { SelectWithExtraDataOptions } from "shared";
import { EditorSettingsFormItem } from "features/video-tasks/components/EditorSettingsFormItem";
import { PagesNavigationsFormItem } from "features/video-tasks/components/PagesNavigationsFormItem";
import { SelectLevelFormItem } from "./SelectLevelFormItem";
import { TaskTemplateFormItem } from "./TaskTemplateFormItem";
import { CharacterReplacementFormItem } from "./CharacterReplacementFormItem";
import { checkIsTaskVotingType } from "../helpers";
import { InitialBattleReward } from "../store/actions";
import { BattleRewardsFormItem } from "./BattleRewardsFormItem";

export type TaskFormData = Partial<
    Omit<Task, "publishingTime" | "deadline" | "pagesNavigation"> & {
        publishingTime: Dayjs;
        deadline: Dayjs;
        pagesNavigationId: number;
        templateCharactersCount: number;
        levelCharactersCount: number;
        defaultRewards: InitialBattleReward[];
    }
>;

export interface CreateTaskFormProps extends FormProps<TaskFormData> {
    stage: string;
}

export function CreateTaskForm({ stage, ...formProps }: CreateTaskFormProps) {
    return (
        <Form layout="vertical" {...formProps}>
            <Form.Item shouldUpdate>
                {(props: FormInstance<TaskFormData>) => <TaskTemplateFormItem {...props} />}
            </Form.Item>
            <Form.Item name="levelCharactersCount" noStyle>
                <div></div>
            </Form.Item>
            <Form.Item shouldUpdate>
                {(props: FormInstance<TaskFormData>) => <SelectLevelFormItem {...props} />}
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
                {(props: FormInstance<TaskFormData>) => <CharacterReplacementFormItem {...props} />}
            </Form.Item>
            <Form.Item rules={requiredFieldRules} name="name" label="Name">
                <Input />
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
                {(props: FormInstance<TaskFormData>) => <EditorSettingsFormItem {...props} />}
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
                {(props: FormInstance<TaskFormData>) => <PagesNavigationsFormItem {...props} />}
            </Form.Item>
            <Form.Item
                name="readinessId"
                label="Readiness"
                rules={requiredFieldRules}
                // The default selected readiness must be "Live in-app". Presently, it's the readiness by id 2
                initialValue={2}>
                <SelectWithExtraDataOptions stage={stage} name="Readiness" />
            </Form.Item>

            <Form.Item name="isDressed" label="Is Dressed" valuePropName="checked">
                <Switch />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
                {({ setFieldValue }) => {
                    const setXpPayout = (value: number) =>
                        setFieldValue("xpPayout", checkIsTaskVotingType(value) ? 500 : null);

                    return (
                        <Form.Item name="taskType" label="Task Type">
                            <Select options={taskTypeOptions} onChange={setXpPayout} />
                        </Form.Item>
                    );
                }}
            </Form.Item>

            <BattleRewardsFormItem />

            <Collapse
                ghost
                items={[
                    {
                        forceRender: true,
                        label: "Show more fields",
                        key: "more-task-creation-fields",
                        children: (
                            <>
                                <Form.Item name="publishingTime" label="Publishing Time" initialValue={dayjs.utc()}>
                                    <DatePicker
                                        style={datePickerStyles}
                                        showTime={dateFormat}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                </Form.Item>

                                <Form.Item name="deadline" label="Deadline" initialValue={dayjs().add(1, "m").utc()}>
                                    <DatePicker
                                        style={datePickerStyles}
                                        showTime={dateFormat}
                                        format="YYYY-MM-DD HH:mm"
                                    />
                                </Form.Item>

                                <Form.Item name="bonusTagId" label="Bonus Tag">
                                    <SelectWithExtraDataOptions allowClear stage={stage} name="Tag" />
                                </Form.Item>

                                <Form.Item name="xpPayout" label="XP Payout">
                                    <Input type="number" />
                                </Form.Item>

                                <Form.Item name="bonusXp" label="Bonus Xp">
                                    <Input type="number" />
                                </Form.Item>

                                <Form.Item name="softCurrencyPayout" label="Soft Currency Payout">
                                    <Input type="number" />
                                </Form.Item>

                                <Form.Item name="bonusSoftCurrency" label="Bonus Soft Currency">
                                    <Input type="number" />
                                </Form.Item>

                                <Form.Item name="description" label="Description">
                                    <Input.TextArea />
                                </Form.Item>

                                <Form.Item name="desletionAllowed" label="Deletion Allowed" valuePropName="checked">
                                    <Switch />
                                </Form.Item>
                            </>
                        )
                    }
                ]}
            />
        </Form>
    );
}

const requiredFieldRules = [{ required: true, message: "This field is required" }];
const datePickerStyles = { width: "100%" };
const dateFormat = { format: "HH:mm" };
const taskTypeOptions = taskType.map((taskType) => ({ value: taskType.id, label: taskType.name }));
