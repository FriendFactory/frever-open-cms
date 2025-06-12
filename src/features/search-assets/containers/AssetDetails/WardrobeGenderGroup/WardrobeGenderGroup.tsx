import React from "react";
import { Divider, Space, Typography } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { useExtraData } from "shared/hooks/useExtraData";
import { DETAILS_ASSET_URL } from "urls";
import { assetDetailsSelector } from "features/search-assets/store";
import { JoinToGenderGroupContainer } from "./JoinToGenderGroupContainer";
import { RemoveFromGroupContainer } from "./ExitFromGroupContainer";
import { CreateGenderGroup } from "./CreateGenderGroup";

export const WardrobeGenderGroup = () => {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = DETAILS_ASSET_URL.match(location);

    if (!urlMatch.isMatched) return null;
    const { stage, asset, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, "Wardrobe", id));
    const gender = useExtraData({ stage, name: "Gender" });

    const redirectToAnotherVariant = (id: number) => () =>
        history.replace(DETAILS_ASSET_URL.format({ stage, asset, id }));

    if ((info.loading && !info.data) || gender.loading) return <br />;

    return (
        <span style={{ padding: "0 24px" }}>
            <Typography.Text type="secondary">Gender group: </Typography.Text>
            <Space size={0} split={<Divider type="vertical" />}>
                {!!info.data?.wardrobeGenderGroupId ? (
                    <>
                        {info.data.wardrobeGenderGroup?.wardrobe?.map((wardrobe) => (
                            <Typography.Link key={wardrobe.id} onClick={redirectToAnotherVariant(wardrobe.id)}>
                                {gender.data?.find((el) => el.id === wardrobe.genderId)?.name ?? ""}
                            </Typography.Link>
                        ))}

                        <Typography.Link type="danger" key="exit-from-group">
                            <RemoveFromGroupContainer
                                stage={stage}
                                targetWardrobeId={info.data?.id}
                                genderGroupId={info.data?.wardrobeGenderGroupId}
                            />
                        </Typography.Link>
                    </>
                ) : (
                    info.data?.id && (
                        <>
                            <Typography.Link key="create-new-gender-group">
                                <CreateGenderGroup stage={stage} targetWardrobeId={info.data.id} />
                            </Typography.Link>
                            <Typography.Link key="join-to-existing-gender-group">
                                <JoinToGenderGroupContainer
                                    stage={stage}
                                    genderIdFilter={info.data.genderId}
                                    targetWardrobeId={info.data.id}
                                />
                            </Typography.Link>
                        </>
                    )
                )}
            </Space>
        </span>
    );
};
