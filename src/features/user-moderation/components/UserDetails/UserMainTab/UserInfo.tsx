import React from "react";
import { Card, Col, Divider, Row, Typography } from "antd";
import dayjs from "dayjs";

import { User } from "features/user-moderation/services";
import { UserFormContainer } from "features/user-moderation/containers/UserDetails/UserMainTab/UserFormContainer";
import { UserGroupFormContainer } from "features/user-moderation/containers/UserDetails/UserMainTab/UserGroupFormContainer";
import { UserCommand } from "../../UserCommand";
import { UserGroupFlagName } from "features/user-moderation/containers/UserDetails/UserMainTab/UserInfoContainer";
import { ExtraDataBundleResult } from "shared/store";

export interface UserInfoProps {
    user?: User;
    stage: string;
    loading: boolean;
    bundleData: ExtraDataBundleResult["bundle"];
    changeFeaturedStatus: () => void;
    updateUserGroupFlag: (flag: UserGroupFlagName) => () => void;
}
const colArgs = { xs: 24, md: 12, xl: 8 };

export function UserInfo({
    user,
    loading,
    stage,
    bundleData,
    changeFeaturedStatus,
    updateUserGroupFlag
}: UserInfoProps) {
    return (
        <Card title="Information" extra={user && <UserCommand user={user} stage={stage} />} loading={loading}>
            {user && (
                <Row gutter={[16, 16]} justify="start">
                    <Col {...colArgs}>ID: {user.id ?? "None"}</Col>

                    <Col {...colArgs}>Nickname: {user.mainGroup.nickName ?? "None"}</Col>

                    <Col {...colArgs}>
                        Created Time:&nbsp;
                        {user.createdTime ? dayjs.utc(user.createdTime).format("DD MMM YYYY  HH:mm:ss") : "<Null>"}
                    </Col>

                    <Col {...colArgs}>
                        Deleted:&nbsp;
                        {user.mainGroup.deletedAt ? (
                            <Typography.Text type="danger">
                                {dayjs.utc(user.mainGroup.deletedAt).format("DD MMM YYYY  HH:mm:ss")}
                            </Typography.Text>
                        ) : (
                            <Typography.Text type="success">No</Typography.Text>
                        )}
                    </Col>

                    <Col {...colArgs}>
                        Blocked:&nbsp;
                        {user.mainGroup?.isBlocked ? (
                            <Typography.Text type="warning">Blocked</Typography.Text>
                        ) : (
                            <Typography.Text type="success">No</Typography.Text>
                        )}
                    </Col>

                    <Col {...colArgs}>
                        Featured: &nbsp;
                        <span>
                            {user.isFeatured ? "Yes" : "No"}&nbsp;
                            <a onClick={changeFeaturedStatus}>Change</a>
                        </span>
                    </Col>

                    <Col {...colArgs}>
                        Star Creator: &nbsp;
                        <span>
                            {user.mainGroup.isStarCreator ? "Yes" : "No"} &nbsp;
                            <a onClick={updateUserGroupFlag("isStarCreator")}>Change</a>
                        </span>
                    </Col>

                    <Col {...colArgs}>
                        Star Creator Candidate: &nbsp;{user.mainGroup.isStarCreatorCandidate ? "Yes" : "No"}&nbsp;
                        <a onClick={updateUserGroupFlag("isStarCreatorCandidate")}>Change</a>
                    </Col>

                    <Col {...colArgs}>
                        Community Builder: &nbsp;{user.mainGroup.isCommunityBuilder ? "Yes" : "No"}&nbsp;
                        <a onClick={updateUserGroupFlag("isCommunityBuilder")}>Change</a>
                    </Col>

                    <Col {...colArgs}>
                        Watchlisted: &nbsp;
                        <span>
                            {user.mainGroup.isOnWatchList ? "Yes" : "No"}&nbsp;
                            <a onClick={updateUserGroupFlag("isOnWatchList")}>Change</a>
                        </span>
                    </Col>

                    <Col {...colArgs}>
                        Level:
                        {bundleData.UserLevel?.data?.find((el) => el.id === user?.mainGroup?.level)?.name ?? "None"}
                    </Col>

                    <Col {...colArgs}>
                        Country:
                        {bundleData.Country?.data?.find((el) => el.id === user?.mainGroup?.taxationCountryId)
                            ?.displayName ?? "Unknown"}
                    </Col>

                    <Col {...colArgs}>
                        Language:
                        {bundleData.Language?.data?.find((el) => el.id === user?.mainGroup?.defaultLanguageId)?.name ??
                            "Unknown"}
                    </Col>

                    <Col {...colArgs}>
                        Birthday:&nbsp;
                        {user.mainGroup.birthDate
                            ? dayjs.utc(user.mainGroup.birthDate).format("DD MMM YYYY")
                            : "Unknown"}
                    </Col>

                    <Col {...colArgs}>
                        <Typography.Paragraph ellipsis={{ expandable: true, symbol: "more" }}>
                            {"Bio: " + (user.mainGroup.bio ?? "<Null>")}
                        </Typography.Paragraph>
                    </Col>

                    <Divider style={{ margin: 0 }} />
                    <Col span={24}>
                        <UserGroupFormContainer />
                    </Col>

                    <Divider style={{ margin: 0 }} />
                    <Col span={24}>
                        <UserFormContainer />
                    </Col>
                </Row>
            )}
        </Card>
    );
}
