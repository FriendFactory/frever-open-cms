import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { Link } from "react-router-dom";

import { TEMPLATE_SORTING_MODE_URL } from "urls";
import { useExtraData } from "shared/hooks/useExtraData";
import { MenuItemGroupType, MenuItemType } from "antd/lib/menu/hooks/useItems";

export interface SortingModeDrowdownProps {
    stage: string;
}

export function SortingModeDrowdown({ stage }: SortingModeDrowdownProps) {
    const templateCategories = useExtraData({ stage, name: "TemplateCategory" });

    const items: Array<MenuItemType | MenuItemGroupType> = [
        {
            key: "challenge",
            label: (
                <Link to={TEMPLATE_SORTING_MODE_URL.format({ stage, sortOrderType: "challengeSortOrder" })}>
                    Challenge Sort Order
                </Link>
            )
        },
        {
            key: "onboarding",
            label: (
                <Link to={TEMPLATE_SORTING_MODE_URL.format({ stage, sortOrderType: "onBoardingSortingOrder" })}>
                    On Boarding Sorting Order
                </Link>
            )
        },
        {
            key: "trending",
            label: (
                <Link to={TEMPLATE_SORTING_MODE_URL.format({ stage, sortOrderType: "trendingSortingOrder" })}>
                    Trending Sorting Order
                </Link>
            )
        },
        {
            type: "group",
            label: "Category Sorting Order",
            children: templateCategories.data?.map((category) => ({
                key: category.name,
                label: (
                    <Link
                        to={TEMPLATE_SORTING_MODE_URL.format(
                            {
                                stage,
                                sortOrderType: "categorySortingOrder"
                            },
                            { categoryId: category.id }
                        )}>
                        {category.name}
                    </Link>
                )
            }))
        }
    ];

    return (
        <Dropdown menu={{ items }}>
            <Button loading={templateCategories.loading}>
                <Space>
                    Sort Order Mode
                    <DownOutlined />
                </Space>
            </Button>
        </Dropdown>
    );
}
