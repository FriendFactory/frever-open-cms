import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";

import { Template, TemplateFilterParams } from "../../services";
import { TemplateList } from "../../components/TemplateList";
import { TEMPLATE_DETAILS_URL } from "urls";
import { TEMPLATE_LIST_URL } from "urls";
import { deleteTemplatesAction, templateListPageSelector } from "features/video-templates/store";
import { useExtraDataBundle } from "shared";
import { TableRowSelection } from "antd/es/table/interface";
import { useDispatch } from "react-redux";

export interface TemplateListContainerProps {
    stage: string;
    params: TemplateFilterParams;
}

export function TemplateListContainer({ stage, params }: TemplateListContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();

    const {
        bundle: { TemplateCategory, TemplateSubCategory },
        loading: isExtraDataLoading
    } = useExtraDataBundle(["TemplateCategory", "TemplateSubCategory"]);

    const info = useSelector(templateListPageSelector(stage, params));

    const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);

    const getCategory = (id: number) => {
        const categoryId = TemplateSubCategory?.data?.find((cate) => cate.id === id)?.templateCategoryId;
        return TemplateCategory?.data?.find((cate) => cate.id === categoryId)?.name;
    };

    const rowSelection: TableRowSelection<Template> = {
        onChange: (selectedRowKeys) =>
            setSelectedTemplates(selectedRowKeys.length > 0 ? (selectedRowKeys as number[]) : []),
        selectedRowKeys: selectedTemplates,
        fixed: true
    };

    const onSort = (sortBy: TemplateFilterParams["sortBy"], sortDirection: TemplateFilterParams["sortDirection"]) => {
        const newUrl = TEMPLATE_LIST_URL.replace(location, {}, { sortBy, sortDirection, skip: 0 });
        if (newUrl) history.push(newUrl);
    };

    const onRow = (template: Template) => ({
        onClick: () => history.push(TEMPLATE_DETAILS_URL.format({ stage, id: template.id }))
    });

    const handleOnClickDelete = (template: Template) => {
        const command = template.isDeleted ? "undelete" : "delete";
        const ids = selectedTemplates.includes(template.id) ? selectedTemplates : [template.id];

        dispatch(deleteTemplatesAction({ stage, ids, command }));
    };

    return (
        <TemplateList
            data={info.data}
            loading={(!info.data?.length && info.loading) || isExtraDataLoading}
            stage={stage}
            rowSelection={rowSelection}
            sortBy={params?.sortBy}
            sortDirection={params?.sortDirection}
            onRow={onRow}
            getCategory={getCategory}
            onSort={onSort}
            onClickDelete={handleOnClickDelete}
        />
    );
}
