import React, { Fragment, useState } from "react";
import { Button, Drawer, theme } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

export interface ListLayoutFragmentProps {
    children: [searchForm: React.ReactChild, list: React.ReactChild, pager?: React.ReactChild];
    padding?: "paddingXXS" | "paddingXS" | "paddingSM" | "padding" | "paddingMD" | "paddingLG" | "paddingXL";
}

export function ListLayoutFragment({ children, padding }: ListLayoutFragmentProps) {
    const { token } = theme.useToken();
    const screens = useBreakpoint();
    const [searchForm, ...otherChildren] = children;
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    return (
        <Wrapper paginationPadding={padding ? token[padding] : token.paddingLG} padding={padding && token[padding]}>
            {screens.sm ? (
                <SearchContainer>{searchForm}</SearchContainer>
            ) : (
                <Fragment>
                    <Button type="primary" onClick={() => setIsOpenDrawer(true)} icon={<SearchOutlined />}>
                        Search Filters
                    </Button>
                    <Drawer
                        title="Search Filter"
                        placement="right"
                        onClose={() => setIsOpenDrawer(false)}
                        open={isOpenDrawer}>
                        <MobileSearchContainer>{searchForm}</MobileSearchContainer>
                    </Drawer>
                </Fragment>
            )}
            {otherChildren}
        </Wrapper>
    );
}

const MobileSearchContainer = styled.div`
    .ant-col {
        flex: 1 1 100% !important;
    }

    button[type="submit"] {
        width: 100% !important;
    }
`;

const SearchContainer = styled.div`
    .ant-col:has(> .ant-form-item) {
        max-width: 500px;
    }
`;

const Wrapper = styled.div<{ padding?: number; paginationPadding: number }>`
    padding: ${(props) => props.padding && props.padding}px;

    .ant-pagination {
        margin-top: ${(props) => props.paginationPadding}px;
    }
`;
