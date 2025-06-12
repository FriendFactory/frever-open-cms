import React from "react";
import { Button, Select, SelectProps, Spin } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

import { useUserSearch } from "./useUserSearch";
import { UserListItem } from "./UserListItem";

export function UserSearchFieldContainer(props: SelectProps) {
    const { info, isShowMoreAvailable, onSearch, showMore } = useUserSearch();

    return (
        <Select
            allowClear
            filterOption={false}
            style={{ width: "100%" }}
            {...props}
            showSearch
            suffixIcon={<SearchOutlined />}
            onSearch={onSearch}
            onInputKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.stopPropagation();
                    onSearch((e.target as HTMLInputElement).value);
                }
            }}
            dropdownRender={(menu) => (
                <div>
                    <MenuWrapper>
                        {info.loading && (
                            <LoadingWrapper>
                                <SpinStyled />
                            </LoadingWrapper>
                        )}
                        {menu}
                    </MenuWrapper>
                    {isShowMoreAvailable && (
                        <Button type="link" onClick={showMore}>
                            Load more
                        </Button>
                    )}
                </div>
            )}>
            {info.data?.map((el) => (
                <Select.Option key={el.id} value={el.mainGroup.id} name={el.mainGroup.nickName}>
                    <UserListItem user={el} />
                </Select.Option>
            ))}
        </Select>
    );
}

const MenuWrapper = styled.div`
    position: "relative";
    height: 100%;
    width: 100%;

    .ant-avatar {
        width: 40px !important;
        height: 40px !important;
    }
`;

const LoadingWrapper = styled.div`
    height: 100%;
    width: 100%;
    background: rgba(255, 255, 255, 0.2);
`;

const SpinStyled = styled(Spin)`
    position: absolute;
    bottom: 0;
    top: 25%;
    right: 0;
    left: 0;
`;
