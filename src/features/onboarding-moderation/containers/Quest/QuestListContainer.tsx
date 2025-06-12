import React from "react";
import { Badge, Card, Pagination, Space } from "antd";
import { useDispatch } from "react-redux";
import _ from "lodash";

import { actionColumnRender, ActionColumnRenderProps, EditableTable, EditableTableColumn } from "shared";
import { OnboardingQuest, QuestListQueryParams } from "../../services";
import { DeleteOnboardingEntityContainer } from "../DeleteOnboardingEntityContainer";
import { CreateQuestContainer } from "./CreateQuestContainer";
import { updateEntityListAction } from "../../store/actions";
import { useSearchEntity } from "../../hooks/useSearchEntity";
import { ExpandedRowDataType, ExpandedRowLocalizationTable, RowExpandedWrapper } from "../ExpandedRowLocalizationTable";
import { cleanEmptyValues } from "features/onboarding-moderation/helpers";

export interface QuestListContainerProps {
    stage: string;
    params: QuestListQueryParams;
}

export function QuestListContainer({ stage, params }: QuestListContainerProps) {
    const dispatch = useDispatch();

    const { info, infoPager, pageChange } = useSearchEntity({ stage, baseSearchParams: params, entityType: "quest" });

    const handleOnFinish = (updatedQuestGroup: OnboardingQuest, sourceQuestGroup?: OnboardingQuest) => {
        const entity = _.merge(sourceQuestGroup, updatedQuestGroup);
        dispatch(
            updateEntityListAction({
                stage,
                entityType: "quest",
                entity
            })
        );
    };

    const handleOnFinishLocalization =
        (record: OnboardingQuest) =>
        (updatedQuestGroupLocalization: ExpandedRowDataType, sourceQuestGroupLocalization?: ExpandedRowDataType) => {
            const { id, fieldName, ...localization } = {
                ...sourceQuestGroupLocalization,
                ...updatedQuestGroupLocalization
            };

            const entity: OnboardingQuest = cleanEmptyValues({ ...record, [fieldName]: localization }, [
                "title",
                "description"
            ]);

            dispatch(
                updateEntityListAction({
                    stage,
                    entityType: "quest",
                    entity
                })
            );
        };

    const columns: EditableTableColumn<OnboardingQuest>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 120
        },
        {
            title: "Title",
            dataIndex: ["title", "eng"],
            width: 180,
            editableCellProps: { type: "text" }
        },
        {
            title: "Description",
            dataIndex: ["description", "eng"],
            width: 180,
            editableCellProps: { type: "textarea" },
            ellipsis: true
        },
        {
            title: "Quest Type",
            dataIndex: "questType",
            width: 180
        },
        {
            title: "Quest Parameter",
            dataIndex: "questParameter",
            width: 180,
            editableCellProps: { type: "number" }
        },
        {
            title: "Ordinal",
            dataIndex: "ordinal",
            width: 120,
            editableCellProps: { type: "number" }
        },
        {
            title: "Is Enabled",
            render: (_, { isEnabled }) => (
                <Badge color={isEnabled ? "blue" : "red"} text={isEnabled ? "Enabled" : "Disabled"} />
            ),
            width: 120
        }
    ];

    const actionColumn = {
        title: params.onboardingQuestGroupId && (
            <CreateQuestContainer stage={stage} questGroupId={params.onboardingQuestGroupId} />
        ),
        render: (props: ActionColumnRenderProps<OnboardingQuest>) =>
            actionColumnRender({
                ...props,
                extra: (entity) => <DeleteOnboardingEntityContainer entity={entity} entityType="quest" />
            })
    };

    return (
        <Card title="Quests">
            <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
                <RowExpandedWrapper>
                    <EditableTable
                        loading={info.loading && !info.data}
                        columns={columns}
                        dataSource={info.data}
                        expandable={{
                            expandedRowRender: (record) => (
                                <ExpandedRowLocalizationTable
                                    data={record}
                                    onFinish={handleOnFinishLocalization(record)}
                                />
                            )
                        }}
                        scroll={{ x: 800 }}
                        pagination={false}
                        rowKey="id"
                        onFinish={handleOnFinish}
                        actionColumnProps={actionColumn}
                    />
                </RowExpandedWrapper>
                <Pagination
                    showQuickJumper
                    showSizeChanger={false}
                    total={infoPager.total}
                    pageSize={infoPager.pageSize}
                    current={infoPager.currentPage}
                    onChange={pageChange}
                />
            </Space>
        </Card>
    );
}
