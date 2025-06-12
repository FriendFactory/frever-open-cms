import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Badge, TableProps } from "antd";
import { useHistory } from "react-router";

import { AssetTypes } from "config";
import {
    actionColumnRender,
    ActionColumnRenderProps,
    AssetCardContainer,
    createCdnURLFromFiles,
    createSortableColumnProps,
    EditableTable,
    EditableTableColumn,
    SelectAssetDropdown
} from "shared";
import CoinIcon from "shared/components/CustomIcons/CoinIcon";
import GemIcon from "shared/components/CustomIcons/GemIcon";
import { CurrencyPrice } from "shared/components/CurrencyPrice";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { CrewRewards, RewardAssetType } from "../../services";
import { CrewRewardsQueryParams } from "../../services/getCrewRewards";
import { crewRewardsListSelector } from "../../store/reducer";
import { postCrewRewardEntityAction } from "../../store/actions";
import { seasonRewardAssetTypes } from "features/seasons-moderation/components/AssetSelectionFormField";
import { DeleteCrewRewardEntityContainer } from "./DeleteCrewRewardEntityContainer";
import { LootBox } from "features/lootbox-moderation/services";
import { CreateCrewRewardContainer } from "./CreateCrewRewardContainer";
import { LootBoxCardComponentType, LootBoxSearchWindowComponentType } from "../../components/RewardForm";
import { CREW_REWARDS_LIST_URL } from "urls";

export interface CrewRewardsListContainerProps {
    stage: string;
    params: CrewRewardsQueryParams;
    lootBoxSearchComponent: LootBoxSearchWindowComponentType;
    lootBoxCardComponent: LootBoxCardComponentType;
}

export function CrewRewardsListContainer({
    stage,
    params,
    lootBoxSearchComponent,
    lootBoxCardComponent
}: CrewRewardsListContainerProps) {
    const LootBoxCardComponent = lootBoxCardComponent;
    const LootBoxSearchComponent = lootBoxSearchComponent;
    const dispatch = useDispatch();
    const history = useHistory();

    const info = useSelector(crewRewardsListSelector(stage, params), shallowEqual);

    const handleOnFinish = (updatedReward: CrewRewards, sourceReward?: CrewRewards, thumbnail?: File) => {
        const files: any = sourceReward?.files?.length ? sourceReward?.files : null;
        dispatch(
            postCrewRewardEntityAction({
                data: { ...sourceReward, ...updatedReward, files },
                thumbnail
            })
        );
    };

    const handleOnSelectAsset = (reward: CrewRewards) => (assetId: number, assetType: string) =>
        handleOnFinish({ ...reward, assetId, assetType } as any, reward);

    const handleOnSelectLootBox = (reward: CrewRewards) => (lootBox: LootBox) =>
        handleOnFinish({ ...reward, lootBoxId: lootBox.id }, reward);

    const handleOnChange: TableProps<CrewRewards>["onChange"] = (_paging, _filter, sorterResult) => {
        const sorter = Array.isArray(sorterResult) ? undefined : sorterResult;
        const params: CrewRewardsQueryParams = {
            orderBy: sorter?.order ? (sorter.columnKey as CrewRewardsQueryParams["orderBy"]) : undefined,
            sortDirection: sorter?.order && sorter.columnKey ? (sorter.order === "descend" ? "desc" : "asc") : undefined
        };

        const newUrl = CREW_REWARDS_LIST_URL.replace(location, {}, params);
        newUrl && history.replace(newUrl);
    };

    const sortableColumnProps = createSortableColumnProps<CrewRewardsQueryParams["orderBy"]>(
        params?.orderBy,
        params?.sortDirection
    );

    const columns: EditableTableColumn<CrewRewards>[] = [
        { title: "ID", dataIndex: "id", width: 90, ...sortableColumnProps("id") },
        {
            title: "Thumbnail",
            width: 140,
            render: (_, reward) => {
                const imageUrl = reward.files
                    ? createCdnURLFromFiles({
                          id: reward.id,
                          entityType: "CrewReward",
                          stage,
                          resolution: "512x512",
                          files: reward.files
                      }) || "/assets/no-image.png"
                    : "/assets/no-image.png";
                return (
                    <ThumbnailCard
                        handleUpdate={async (file) => handleOnFinish(reward, undefined, file)}
                        imageUrl={imageUrl}
                        width={140}
                    />
                );
            }
        },
        {
            dataIndex: "title",
            title: "Title",
            width: 150,
            render: (_, { title }) => (title ? <div>{title}</div> : ""),
            editableCellProps: { type: "text" },
            ...sortableColumnProps("title")
        },
        {
            title: "Reward",
            width: 140,
            editableCellProps: (entity) => {
                return {
                    type: "number",
                    disabled: !!entity.assetId || !!entity.lootBoxId,
                    addonAfter: entity.hardCurrency ? <GemIcon /> : entity.softCurrency ? <CoinIcon /> : "",
                    pathname: entity.hardCurrency ? "hardCurrency" : entity.softCurrency ? "softCurrency" : ""
                };
            },
            render: (_, reward) => {
                const { hardCurrency, softCurrency, lootBoxId, assetId, assetType } = { ...reward };

                if (hardCurrency) return <CurrencyPrice type="hard" value={hardCurrency} />;
                if (softCurrency) return <CurrencyPrice type="soft" value={softCurrency} />;

                if (lootBoxId)
                    return (
                        <LootBoxCardComponent
                            lootBoxId={lootBoxId}
                            width={140}
                            markers={[
                                <LootBoxSearchComponent onLootBoxClick={handleOnSelectLootBox(reward)}>
                                    <a>
                                        <SettingOutlined />
                                    </a>
                                </LootBoxSearchComponent>
                            ]}
                        />
                    );

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
            dataIndex: "requiredTrophyScore",
            title: "Trophy Score",
            width: 95,
            align: "center",
            editableCellProps: { type: "number" },
            render: (_, { requiredTrophyScore }) => (requiredTrophyScore !== null ? requiredTrophyScore : ""),
            ...sortableColumnProps("requiredTrophyScore")
        },
        {
            title: "Enabled",
            dataIndex: "isEnabled",
            width: 95,
            align: "center",
            render: (_, reward) => (
                <Badge color={reward.isEnabled ? "blue" : "red"} text={reward.isEnabled ? "Enabled" : "Disabled"} />
            )
        }
    ];

    const actionColumn = {
        title: (
            <CreateCrewRewardContainer
                lootBoxCardComponent={lootBoxCardComponent}
                lootBoxSearchComponent={lootBoxSearchComponent}
            />
        ),
        render: (props: ActionColumnRenderProps<CrewRewards>) =>
            actionColumnRender({
                ...props,
                extra: (reward) => <DeleteCrewRewardEntityContainer entity={reward} params={params} />
            })
    };

    return (
        <EditableTable
            loading={info.loading}
            onFinish={handleOnFinish}
            onChange={handleOnChange}
            columns={columns}
            dataSource={info.data}
            pagination={false}
            scroll={{ x: 1060 }}
            actionColumnProps={actionColumn}
        />
    );
}
