import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { FixedPageHeader } from "shared";
import { SortingOrderTemplateList } from "features/video-templates/components/TemplateSortingMode/SortingOrderTemplateList";
import { SortOrderTypes, Template } from "features/video-templates/services";
import {
    templateSortingClearUpAction,
    templateSortingModeSelector,
    updateSortingOrderAction
} from "features/video-templates/store";

export interface SortingModeListContainerProps {
    stage: string;
    sortOrderType: SortOrderTypes;
}

export function SortingModeListContainer({ stage, sortOrderType }: SortingModeListContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(templateSortingModeSelector);

    const [templatesToUpdate, setTemplatesToUpdate] = useState<Template[]>([]);

    const data = info.data
        ?.map((sourceEntity) => {
            const updated = templatesToUpdate.find((updatedValues) => sourceEntity.id === updatedValues.id);
            return updated ? { ...sourceEntity, ...updated } : sourceEntity;
        })
        .sort((a, b) => b.usageCount - a.usageCount)
        .sort((a, b) => {
            const aValue = a[sortOrderType];
            const bValue = b[sortOrderType];

            return aValue === null ? 1 : bValue === null ? -1 : aValue - bValue;
        });

    useEffect(() => {
        return () => {
            dispatch(templateSortingClearUpAction({}));
            setTemplatesToUpdate([]);
        };
    }, [stage, sortOrderType]);

    const updateTemplSortingValue = (template: Template, newSortOrder: number | null) => {
        if (template[sortOrderType] === newSortOrder) {
            return;
        }

        const result = updateList({
            template,
            newSortOrder,
            sortOrderType,
            templates: data,
            templatesToUpdate
        });

        setTemplatesToUpdate(result.templatesToUpdate);
    };

    const handleSaveChanges = () => {
        dispatch(updateSortingOrderAction({ stage, data: templatesToUpdate }));

        setTemplatesToUpdate([]);
    };

    const cancel = () => setTemplatesToUpdate([]);

    return (
        <>
            <SortingOrderTemplateList
                data={data}
                loading={info.loading}
                sortOrderType={sortOrderType}
                updateTemplSortingValue={updateTemplSortingValue}
            />
            {!!templatesToUpdate.length && (
                <FixedPageHeader
                    title="Unsaved sorting changes"
                    extra={[
                        <Button key="cancel" onClick={cancel}>
                            Cancel
                        </Button>,
                        <Button key="save" type="primary" onClick={handleSaveChanges}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </>
    );
}

export interface UpdateListParams {
    template: Template;
    newSortOrder: number | null;
    sortOrderType: SortOrderTypes;
    templates: Template[];
    templatesToUpdate: Template[];
}

export const updateList = ({
    template,
    newSortOrder,
    sortOrderType,
    templates,
    templatesToUpdate
}: UpdateListParams): { newTemplateList: Template[]; templatesToUpdate: Template[] } => {
    const updatedTemplate: Template = { ...template, [sortOrderType]: newSortOrder };
    const newTemplateList = templates.map((el) => (el.id === template.id ? updatedTemplate : el));

    const newListToUpdate = [...templatesToUpdate];
    const indexOfInListToUpdate = newListToUpdate.findIndex((el) => el.id === updatedTemplate.id);

    indexOfInListToUpdate !== -1
        ? (newListToUpdate[indexOfInListToUpdate] = updatedTemplate)
        : newListToUpdate.push(updatedTemplate);

    const oldValue = newSortOrder ? templates.find((el) => el[sortOrderType] === newSortOrder) : undefined;
    if (oldValue && newSortOrder) {
        return updateList({
            template: oldValue,
            newSortOrder: newSortOrder + 1,
            sortOrderType,
            templates: newTemplateList,
            templatesToUpdate: newListToUpdate
        });
    }

    return { newTemplateList, templatesToUpdate: newListToUpdate };
};
