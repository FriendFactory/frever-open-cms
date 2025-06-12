import React from "react";
import { Badge, Button, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { MoreOutlined } from "@ant-design/icons";
import _ from "lodash";

import { ONBOARDING_DETAILS_PAGE_URL } from "urls";
import { updateEntityListAction } from "../../store/actions";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import {
    actionColumnRender,
    ActionColumnRenderProps,
    createCdnURLFromFiles,
    EditableTable,
    EditableTableColumn
} from "shared";
import { OnboardingQuestGroup, QuestGroupListQueryParams } from "../../services";
import { DeleteOnboardingEntityContainer } from "../DeleteOnboardingEntityContainer";
import { CreateQuestGroupContainer } from "./CreateQuestGroupContainer";
import { onboardingEntityPageSelector } from "features/onboarding-moderation/store/reducer/entitySelector";
import { ExpandedRowDataType, ExpandedRowLocalizationTable, RowExpandedWrapper } from "../ExpandedRowLocalizationTable";
import { cleanEmptyValues } from "features/onboarding-moderation/helpers";
import { SelectActionLocalizationDropdownContainer } from "../SelectActionLocalizationDropdownContainer";

export interface QuestGroupListContainerProps {
    stage: string;
    params: QuestGroupListQueryParams;
}

export function QuestGroupListContainer({ stage, params }: QuestGroupListContainerProps) {
    const history = useHistory();
    const dispatch = useDispatch();
    const info = useSelector(onboardingEntityPageSelector(stage, params, "questGroup"));

    const handleOnFinish = (
        updatedQuestGroup: OnboardingQuestGroup,
        sourceQuestGroup?: OnboardingQuestGroup,
        thumbnail?: File
    ) => {
        const files: any = sourceQuestGroup?.files?.length ? sourceQuestGroup?.files : null;

        const mergedObject = _.merge(sourceQuestGroup, updatedQuestGroup);

        dispatch(
            updateEntityListAction({
                stage,
                entityType: "questGroup",
                entity: { ...mergedObject, files },
                thumbnail
            })
        );
    };

    const handleOnFinishLocalization =
        (record: OnboardingQuestGroup) =>
        (updatedQuestGroupLocalization: ExpandedRowDataType, sourceQuestGroupLocalization?: ExpandedRowDataType) => {
            const files: any = record?.files?.length ? record?.files : null;
            const { id, fieldName, ...localization } = {
                ...sourceQuestGroupLocalization,
                ...updatedQuestGroupLocalization
            };
            const entity: OnboardingQuestGroup = cleanEmptyValues({ ...record, [fieldName]: localization, files }, [
                "title",
                "description"
            ]);

            dispatch(
                updateEntityListAction({
                    stage,
                    entityType: "questGroup",
                    entity,
                    thumbnail: undefined
                })
            );
        };

    const onRow = (questGroup: OnboardingQuestGroup) => ({
        onClick: () => history.push(ONBOARDING_DETAILS_PAGE_URL.format({ stage, id: questGroup.id }))
    });

    const columns: EditableTableColumn<OnboardingQuestGroup>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 80
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
            title: "Thumbnail",
            render: (_, item) => {
                const imageUrl = item.files
                    ? createCdnURLFromFiles({
                          id: item.id,
                          entityType: "OnboardingQuestGroup",
                          stage,
                          resolution: "512x512",
                          files: item.files
                      }) || "/assets/no-image.png"
                    : "/assets/no-image.png";

                return (
                    <div onClick={(e) => e.stopPropagation()}>
                        <ThumbnailCard
                            handleUpdate={async (file) => handleOnFinish(item, undefined, file)}
                            imageUrl={imageUrl}
                            width={140}
                        />
                    </div>
                );
            },
            width: 168
        },
        {
            title: "Ordinal",
            dataIndex: "ordinal",
            width: 80,
            editableCellProps: { type: "number" }
        },
        {
            title: "Is Enabled",
            dataIndex: "isEnabled",
            render: (_, { isEnabled }) => (
                <Badge color={isEnabled ? "blue" : "red"} text={isEnabled ? "Enabled" : "Disabled"} />
            ),
            width: 120
        }
    ];

    const actionColumn = {
        title: (
            <Space>
                <CreateQuestGroupContainer />
                <SelectActionLocalizationDropdownContainer>
                    <Button icon={<MoreOutlined />} />
                </SelectActionLocalizationDropdownContainer>
            </Space>
        ),
        render: (props: ActionColumnRenderProps<OnboardingQuestGroup>) =>
            actionColumnRender({
                ...props,
                extra: (entity) => <DeleteOnboardingEntityContainer entity={entity} entityType="questGroup" />
            })
    };

    return (
        <RowExpandedWrapper>
            <EditableTable
                loading={info.loading && !info.data}
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => (
                        <ExpandedRowLocalizationTable data={record} onFinish={handleOnFinishLocalization(record)} />
                    )
                }}
                dataSource={info.data}
                scroll={{ x: 800 }}
                pagination={false}
                onRow={onRow}
                rowKey="id"
                onFinish={handleOnFinish}
                actionColumnProps={actionColumn}
            />
        </RowExpandedWrapper>
    );
}
