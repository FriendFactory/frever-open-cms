import React, { useCallback, useMemo, useState } from "react";
import { Table, Avatar } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { ColumnsType, SorterResult } from "antd/lib/table/interface";
import dayjs from "dayjs";

import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { User } from "../../services/api";
import { USER_DETAILS_INFO_URL } from "urls";
import { UserStatus } from "./UserStatus";
import { ExpandedRow } from "./UserExpandedRow";
import { GetUserListParams } from "features/user-moderation/services";
import { UserCommand } from "../UserCommand";
import { UserTableCommand } from "../UserTableCommand";
import { createSortableColumnProps } from "shared";

export interface UserGridProps {
    loading: boolean;
    kpiLoading: boolean;
    data?: User[];
    stage: string;
    orderBy: GetUserListParams["orderBy"];
    sortDirection: GetUserListParams["sortDirection"];
    onRow: (user: any) => { onClick: () => void };
    onSort: (orderBy: GetUserListParams["orderBy"], sortDirection: GetUserListParams["sortDirection"]) => void;
}

export function UserGrid({ data, loading, kpiLoading, orderBy, sortDirection, stage, onRow, onSort }: UserGridProps) {
    const [selectedUsers, setSelectedUsers] = useState<User[] | undefined>();
    const screens = useBreakpoint();

    const sortableProps = createSortableColumnProps<GetUserListParams["orderBy"]>(orderBy, sortDirection);

    const handleOnChange = useCallback(
        (_paging: unknown, _filter: unknown, sorter: SorterResult<any>) => {
            if (sorter.columnKey) {
                if (sorter.order === undefined) {
                    onSort(undefined, undefined);
                } else {
                    onSort(sorter.columnKey as any, sorter.order === "ascend" ? "asc" : "desc");
                }
            }
        },
        [onSort]
    );

    const rowSelection = useMemo(
        () => ({
            onChange: (_: unknown, selectedRows: User[]) => setSelectedUsers(selectedRows),
            selectedRowKeys: selectedUsers?.map((user: User) => user.id),
            fixed: true
        }),
        [selectedUsers]
    );

    const templateText = useMemo(() => (kpiLoading ? "..." : "??"), [kpiLoading]);

    const columns: ColumnsType<User> = [
        {
            title: "User",
            width: 100,
            render: (_, user) =>
                screens.md ? (
                    user.id
                ) : (
                    <ProtectedLink
                        feature="Social"
                        to={USER_DETAILS_INFO_URL.format({
                            stage,
                            selector: "id",
                            id: user.id
                        })}>
                        {user.id}
                    </ProtectedLink>
                ),

            ...sortableProps("id")
        },
        {
            title: "Profile",
            width: 97,
            render: (_, { mainCharacter }) => (
                <Avatar
                    shape="square"
                    size={65}
                    src={
                        mainCharacter
                            ? createCdnURLFromFiles({
                                  id: mainCharacter?.id ?? "",
                                  files: mainCharacter.files ?? [],
                                  stage: stage,
                                  entityType: "character",
                                  resolution: "128x128"
                              })
                            : ""
                    }
                />
            )
        },
        {
            title: "Nickname",
            width: 160,
            render: (_, user) => user.mainGroup?.nickName ?? "Unknown",
            ...sortableProps("mainGroup/nickname")
        },
        {
            title: "Email/phone",
            width: 160,
            render: (_, user) => (user.email ? user.email : user.phoneNumber ? user.phoneNumber : "Unknown")
        },
        {
            title: "Group",
            width: 100,
            render: (_, user) => user.mainGroupId ?? "Unknown",
            ...sortableProps("mainGroupId")
        },
        {
            title: "Created Date",
            width: 160,
            render: (_, user) =>
                user.createdTime ? dayjs.utc(user.createdTime).format("DD MMM YYYY  HH:mm:ss") : "Unknown"
        },
        {
            title: "Chara",
            width: 75,
            render: (_, user) => user.userProfileKPI?.characterCount ?? templateText
        },
        {
            title: "Outfit",
            width: 75,
            render: (_, user) => user.userProfileKPI?.outfitCount ?? templateText
        },
        {
            title: "Level",
            width: 75,
            render: (_, user) => <div>{user.userProfileKPI?.totalLevelsCount ?? templateText}</div>
        },
        {
            title: "Deleted",
            width: 140,
            render: (_, user) => <UserStatus deletedAt={user.mainGroup.deletedAt} />,
            ...sortableProps("mainGroup/deletedAt")
        },
        {
            title: "Blocked",
            width: 110,
            render: (_, user) => <UserStatus isBlocked={user.mainGroup.isBlocked} />
        },
        {
            title: <UserTableCommand stage={stage} users={selectedUsers} />,
            width: 65,
            fixed: "right",
            render: (_, user) => (
                <a onClick={stopPropagation}>
                    <UserCommand user={user} stage={stage} />
                </a>
            )
        }
    ];

    return (
        <Table
            sticky
            rowKey="id"
            dataSource={data}
            columns={columns}
            loading={loading}
            pagination={false}
            rowSelection={rowSelection}
            onChange={handleOnChange as any}
            onRow={screens.md ? onRow : undefined}
            expandable={{
                rowExpandable: () => !screens.md,
                expandedRowRender: (record) => <ExpandedRow data={record} />,
                fixed: "left"
            }}
            scroll={{ x: 700 }}
        />
    );
}

const stopPropagation = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => e.stopPropagation();
