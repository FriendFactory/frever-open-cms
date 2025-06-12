import React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { Card } from "antd";
import { useDispatch } from "react-redux";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";

import { RewardAssetType, SeasonReward } from "features/seasons-moderation/services";
import { useExtraData } from "shared/hooks/useExtraData";
import { seasonDetailsPageSelector } from "features/seasons-moderation/store/reducer/seasonDetails.reducer";
import { postSeasonEntityAction } from "features/seasons-moderation/store/actions";
import { CreateSeasonRewardContainer } from "../CreateSeasonRewardContainer";
import { DeleteSeasonEntityContainer } from "./DeleteSeasonEntityContainer";
import {
    actionColumnRender,
    ActionColumnRenderProps,
    createCdnURLFromFiles,
    EditableTable,
    EditableTableColumn
} from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { AssetCardContainer, SelectAssetDropdown } from "shared";
import { seasonRewardAssetTypes } from "features/seasons-moderation/components/AssetSelectionFormField";
import { AssetTypes } from "config";
import { CurrencyPrice } from "shared/components/CurrencyPrice";
import GemIcon from "shared/components/CustomIcons/GemIcon";
import CoinIcon from "shared/components/CustomIcons/CoinIcon";

interface RewardsTableContainerProps {
    stage: string;
    id: number;
}

export function RewardsTableContainer({ stage, id }: RewardsTableContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(seasonDetailsPageSelector(stage, id), shallowEqual);
    const levels = useExtraData({ stage, name: "UserLevel" });

    const getSeasonQuestTitle = (reward: SeasonReward) =>
        info.data?.quests?.find((el) => el.id === reward.seasonQuestId)?.title ?? "";

    const handleOnFinish = (updatedReward: SeasonReward, sourceReward?: SeasonReward, thumbnail?: File) => {
        const files: any = sourceReward?.files?.length ? sourceReward?.files : null;
        dispatch(
            postSeasonEntityAction({
                stage,
                entityName: "rewards",
                data: { ...sourceReward, ...updatedReward, files },
                thumbnail
            })
        );
    };

    const handleOnSelectAsset = (reward: SeasonReward) => (assetId: number, assetType: string) =>
        handleOnFinish({ ...reward, assetId, assetType } as any, reward);

    const columns: EditableTableColumn<SeasonReward>[] = [
        { title: "ID", dataIndex: "id", width: 90 },
        {
            title: "Thumbnail",
            width: 130,
            render: (_, reward) => {
                const imageUrl = reward.files
                    ? createCdnURLFromFiles({
                          id: reward.id,
                          entityType: "SeasonReward",
                          stage,
                          resolution: "512x512",
                          files: reward.files
                      }) || "/assets/no-image.png"
                    : "/assets/no-image.png";

                return (
                    <ThumbnailCard
                        handleUpdate={async (file) => handleOnFinish(reward, undefined, file)}
                        imageUrl={imageUrl}
                        width={120}
                    />
                );
            }
        },
        {
            title: "Level",
            dataIndex: "level",
            width: 100,
            editableCellProps: { options: levels.data?.map((el) => ({ label: el.name, value: el.level })) },
            render: (_, reward) => levels.data?.find((el) => el.level === reward.level)?.name ?? reward.level,
            sorter: (a, b) => a.level - b.level
        },
        {
            title: "Season Quest",
            dataIndex: "seasonQuestId",
            width: 120,
            editableCellProps: { options: info.data?.quests?.map((el) => ({ label: el.title, value: el.id })) },
            render: (_, reward) => getSeasonQuestTitle(reward),
            sorter: (a, b) =>
                getSeasonQuestTitle(a).localeCompare(getSeasonQuestTitle(b), undefined, {
                    numeric: true,
                    sensitivity: "base"
                })
        },
        {
            title: "Reward",
            width: 130,
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
                const { hardCurrency, softCurrency, assetType, assetId, xp } = { ...reward };
                if (hardCurrency) return <CurrencyPrice type="hard" value={hardCurrency} />;
                if (softCurrency) return <CurrencyPrice type="soft" value={softCurrency} />;
                if (xp) return xp + " XP";
                if (assetId && assetType !== null) {
                    return (
                        <AssetCardContainer
                            assetId={assetId}
                            assetType={RewardAssetType[assetType] as AssetTypes}
                            stage={stage}
                            width={120}
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
            title: "Enabled",
            dataIndex: "isEnabled",
            width: 95,
            align: "center",
            editableCellProps: { type: "checkbox" },
            render: (_, reward) => (reward.isEnabled ? "Yes" : "No")
        },
        {
            title: "Premium",
            dataIndex: "isPremium",
            width: 95,
            align: "center",
            editableCellProps: { type: "checkbox" },
            render: (_, reward) => (reward.isPremium ? "Yes" : "No")
        }
    ];

    const actionColumn = {
        title: <CreateSeasonRewardContainer type="primary" ghost icon={<PlusOutlined />} />,
        render: (props: ActionColumnRenderProps<SeasonReward>) =>
            actionColumnRender({
                ...props,
                extra: (reward) => <DeleteSeasonEntityContainer entity={reward} entityName="rewards" />
            })
    };

    return (
        <Card title="Rewards">
            <EditableTable
                loading={info.loading}
                onFinish={handleOnFinish}
                columns={columns}
                dataSource={info.data?.rewards?.sort((a, b) => a.level - b.level)}
                pagination={false}
                actionColumnProps={actionColumn}
            />
        </Card>
    );
}
