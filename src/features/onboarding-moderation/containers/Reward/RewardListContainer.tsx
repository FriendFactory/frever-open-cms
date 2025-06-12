import React from "react";
import { useDispatch } from "react-redux";
import { Badge, Card, Pagination, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";

import { ThumbnailCard } from "shared/components/ThumbnailCard";
import {
    actionColumnRender,
    ActionColumnRenderProps,
    AssetCardContainer,
    createCdnURLFromFiles,
    EditableTable,
    EditableTableColumn,
    SelectAssetDropdown
} from "shared";
import { OnboardingReward, RewardListQueryParams } from "../../services";
import { RewardAssetType } from "features/seasons-moderation/services";
import { AssetTypes } from "config";
import { CurrencyPrice } from "shared/components/CurrencyPrice";
import { DeleteOnboardingEntityContainer } from "../DeleteOnboardingEntityContainer";
import { updateEntityListAction } from "../../store/actions";
import GemIcon from "shared/components/CustomIcons/GemIcon";
import CoinIcon from "shared/components/CustomIcons/CoinIcon";
import { CreateRewardContainer } from "./CreateRewardContainer";
import { seasonRewardAssetTypes } from "features/seasons-moderation/components/AssetSelectionFormField";
import { useSearchEntity } from "../../hooks/useSearchEntity";

export interface RewardListContainerProps {
    stage: string;
    params: RewardListQueryParams;
}

export function RewardListContainer({ stage, params }: RewardListContainerProps) {
    const dispatch = useDispatch();

    const { info, infoPager, pageChange } = useSearchEntity({ stage, baseSearchParams: params, entityType: "reward" });

    const handleOnFinish = (updatedReward: OnboardingReward, sourceReward?: OnboardingReward, thumbnail?: File) => {
        const files: any = sourceReward?.files?.length ? sourceReward?.files : null;
        dispatch(
            updateEntityListAction({
                stage,
                entityType: "reward",
                entity: { ...sourceReward, ...updatedReward, files },
                thumbnail
            })
        );
    };
    const handleOnSelectAsset = (reward: OnboardingReward) => (assetId: number, assetType: string) =>
        handleOnFinish({ ...reward, assetId, assetType } as any, reward);

    const columns: EditableTableColumn<OnboardingReward>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 120
        },
        {
            title: "Title",
            dataIndex: "title",
            width: 180,
            editableCellProps: { type: "text" }
        },
        {
            title: "Thumbnail",
            render: (_, item) => {
                const imageUrl = item.files
                    ? createCdnURLFromFiles({
                          id: item.id,
                          entityType: "OnboardingReward",
                          stage,
                          resolution: "512x512",
                          files: item.files
                      }) || "/assets/no-image.png"
                    : "/assets/no-image.png";

                return (
                    <ThumbnailCard
                        handleUpdate={async (file) => handleOnFinish(item, undefined, file)}
                        imageUrl={imageUrl}
                        width={140}
                    />
                );
            },
            width: 168
        },
        {
            title: "Reward",
            width: 168,
            editableCellProps: (entity) => {
                return {
                    type: "number",
                    disabled: !!entity.assetId,
                    addonAfter: entity.hardCurrency ? (
                        <GemIcon />
                    ) : entity.softCurrency ? (
                        <CoinIcon />
                    ) : entity.xp ? (
                        "XP"
                    ) : (
                        ""
                    ),
                    pathname: entity.hardCurrency
                        ? "hardCurrency"
                        : entity.softCurrency
                        ? "softCurrency"
                        : entity.xp
                        ? "xp"
                        : ""
                };
            },
            render: (_, reward) => {
                const { hardCurrency, softCurrency, xp, assetId, assetType } = reward;

                if (hardCurrency) return <CurrencyPrice type="hard" value={hardCurrency} />;
                if (softCurrency) return <CurrencyPrice type="soft" value={softCurrency} />;
                if (xp) return xp + " XP";

                if (assetId && assetType !== null) {
                    return (
                        <AssetCardContainer
                            assetId={assetId}
                            assetType={RewardAssetType[assetType] as AssetTypes}
                            stage={stage}
                            width={140}
                            markers={[
                                <SelectAssetDropdown
                                    stage={stage}
                                    onSelect={handleOnSelectAsset(reward)}
                                    menuItems={seasonRewardAssetTypes}>
                                    <a>
                                        <SettingOutlined />
                                    </a>
                                </SelectAssetDropdown>
                            ]}
                        />
                    );
                }
                return "Unknown";
            }
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
            <CreateRewardContainer stage={stage} questGroupId={params.onboardingQuestGroupId} />
        ),
        render: (props: ActionColumnRenderProps<OnboardingReward>) =>
            actionColumnRender({
                ...props,
                extra: (entity) => <DeleteOnboardingEntityContainer entity={entity} entityType="reward" />
            })
    };

    return (
        <Card title="Rewards">
            <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
                <EditableTable
                    loading={info.loading && !info.data}
                    columns={columns}
                    dataSource={info.data}
                    scroll={{ x: 800 }}
                    pagination={false}
                    rowKey="id"
                    onFinish={handleOnFinish}
                    actionColumnProps={actionColumn}
                />
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
