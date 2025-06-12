import React from "react";
import { Tag } from "antd";

import { ExtendedEditableColumn, PagesNavigation } from "shared";
import { editorSettingsPages } from "features/video-tasks/constants";

export const pagesColumn: ExtendedEditableColumn<PagesNavigation> = {
    title: "Pages",
    dataIndex: "pages",
    width: 225,
    editableCellProps: {
        type: "select",
        mode: "multiple",
        options: editorSettingsPages.map((el) => ({ label: el.name, value: el.id }))
    },
    render: (_, entity) =>
        entity.pages.map((page) => (
            <Tag key={page}>{editorSettingsPages.find((esPage) => page === esPage.id)?.name ?? page}</Tag>
        ))
};

export const descriptionColumn: ExtendedEditableColumn<PagesNavigation> = {
    title: "Description",
    dataIndex: "description",
    width: 160,
    editableCellProps: { type: "string" }
};
