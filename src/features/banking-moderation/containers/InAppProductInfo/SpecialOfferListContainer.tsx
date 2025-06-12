import React, { useCallback } from "react";
import { Card, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { SettingOutlined } from "@ant-design/icons";

import { EditableTable, EditableTableColumn } from "shared";
import { inAppProductInfoPageSelector } from "features/banking-moderation/store/reducer/inAppProducts/inAppProductInfo.reducer";
import { AssetCardContainer, SelectAssetDropdown } from "shared";
import { RewardAssetType } from "features/seasons-moderation/services";
import { createCdnURLFromFiles } from "shared";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { InAppProductDetails } from "features/banking-moderation/services";
import { inAppProductDetailsPostAction } from "features/banking-moderation/store/actions";
import { ProductDetailsModalContainer } from "../ProductDetailsModalContainer";
import { AssetTypes } from "config";
import { assetSelectMenuItems } from "features/banking-moderation/components/InAppProductDetailsForm";
import { AssetDataNames } from "features/search-assets/services";
import { CurrencyPrice } from "shared/components/CurrencyPrice";

export interface InAppProductDetailsFile {
    resolution: "256x256" | "1024x1024";
    file: File;
}

export interface SpecialOfferListContainerProps {
    stage: string;
    id: number;
}

export function SpecialOfferListContainer({ stage, id }: SpecialOfferListContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(inAppProductInfoPageSelector(stage, id));

    const handleOnFinish = useCallback(
        (
            updatedDetails: Partial<InAppProductDetails>,
            sourceReward: InAppProductDetails | undefined,
            thumbnail?: InAppProductDetailsFile
        ) => {
            dispatch(
                inAppProductDetailsPostAction({
                    stage,
                    data: { ...sourceReward, ...updatedDetails },
                    thumbnails: thumbnail && [thumbnail]
                })
            );
        },
        [stage, info.data]
    );

    const handleOnSelectAsset = (id: number) => (assetId: number, assetType: AssetDataNames) => {
        const sourceReward = info.data?.productDetails?.find((el) => el.id == id);
        handleOnFinish({ id, assetId, assetType } as any, sourceReward);
    };

    const handleOnUpload = (id: number, resolution: InAppProductDetailsFile["resolution"]) => async (file: File) => {
        if (file.type !== "image/png") {
            message.error("File extension is not valid");
            return;
        }

        const sourceReward = info.data?.productDetails?.find((el) => el.id == id);
        handleOnFinish({ id }, sourceReward, { file, resolution });
    };

    const columns: EditableTableColumn<InAppProductDetails>[] = [
        { title: "ID", dataIndex: "id", width: 90 },
        {
            title: "Small image",
            width: 200,
            render: (_, item) =>
                item.files && (
                    <ThumbnailCard
                        handleUpdate={handleOnUpload(item.id, "256x256")}
                        imageUrl={
                            createCdnURLFromFiles({
                                id: item.id,
                                entityType: "InAppProductDetails",
                                stage,
                                resolution: "256x256",
                                files: item.files
                            }) || "/assets/no-image.png"
                        }
                        width={168}
                    />
                )
        },
        {
            title: "Large image",
            width: 200,
            render: (_, item) =>
                item.files && (
                    <ThumbnailCard
                        handleUpdate={handleOnUpload(item.id, "1024x1024")}
                        imageUrl={
                            createCdnURLFromFiles({
                                id: item.id,
                                entityType: "InAppProductDetails",
                                stage,
                                resolution: "1024x1024",
                                files: item.files
                            }) || "/assets/no-image.png"
                        }
                        width={168}
                    />
                )
        },
        { title: "Title", dataIndex: "title", width: 200, editableCellProps: { type: "string" } },
        {
            title: "Reward",
            width: 200,
            editableCellProps: (entity) => {
                return {
                    type: "number",
                    disabled: !!entity.assetId,
                    addonAfter: entity.hardCurrency ? "HC" : entity.softCurrency ? "SC" : "",
                    pathname: entity.hardCurrency ? "hardCurrency" : entity.softCurrency ? "softCurrency" : ""
                };
            },
            render: (_, { id, hardCurrency, softCurrency, assetType, assetId }) => {
                if (hardCurrency) return <CurrencyPrice type="hard" value={hardCurrency} />;
                if (softCurrency) return <CurrencyPrice type="soft" value={softCurrency} />;

                if (assetId && assetType !== null) {
                    return (
                        <AssetCardContainer
                            assetId={assetId}
                            assetType={RewardAssetType[assetType] as AssetTypes}
                            stage={stage}
                            width={168}
                            markers={[
                                <SelectAssetDropdown
                                    stage={stage}
                                    onSelect={handleOnSelectAsset(id)}
                                    menuItems={assetSelectMenuItems}>
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
        { title: "Sort Order", dataIndex: "sortOrder", width: 120, editableCellProps: { type: "string" } },
        {
            title: "Offer Group",
            dataIndex: "uniqueOfferGroup",
            width: 120,
            editableCellProps: { type: "number" }
        },
        {
            title: "Active",
            dataIndex: "isActive",
            width: 90,
            align: "center",
            editableCellProps: { type: "checkbox" },
            render: (_, reward) => (reward.isActive ? "Yes" : "No")
        },
        {
            title: "Description",
            dataIndex: "description",
            width: 300,
            editableCellProps: { type: "textarea", autoSize: true }
        }
    ];

    return (
        <Card title="Special Offers" loading={info.loading}>
            <EditableTable
                dataSource={info.data?.productDetails}
                columns={columns}
                loading={info.loading}
                onFinish={handleOnFinish}
                actionColumnProps={{ title: <ProductDetailsModalContainer stage={stage} inAppProductId={id} /> }}
                scroll={{ x: 1440 }}
            />
        </Card>
    );
}
