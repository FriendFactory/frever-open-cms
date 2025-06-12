import React from "react";
import { Avatar, Button, Card, List, Popconfirm } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { AssetListParams } from "features/search-assets/services";
import { createCdnURLFromFiles } from "shared";
import { DETAILS_ASSET_URL } from "urls";
import {
    assetListHandleLoadAction,
    assetListPageSelector,
    bodyAnimationLinkerAction
} from "features/search-assets/store";
import { SpawnsSearchContainer } from "./SpawnsSearchContainer";

export interface SpawnPositionListBlockProps {
    stage: string;
    bodyAnimationId: string;
}

export function SpawnPositionListBlock({ stage, bodyAnimationId }: SpawnPositionListBlockProps) {
    const dispatch = useDispatch();

    const params: AssetListParams = { spawnPosBodyAnimId: Number(bodyAnimationId), take: 100 };

    useEffect(() => {
        dispatch(assetListHandleLoadAction({ stage, asset: "CharacterSpawnPosition", params }));
    }, [stage, bodyAnimationId]);

    const info = useSelector(assetListPageSelector(stage, params, "CharacterSpawnPosition"));

    const handleOnClick = (action: "add" | "remove", characterSpawnPositionId: number) => {
        dispatch(
            bodyAnimationLinkerAction({
                stage,
                bodyAnimId: Number(bodyAnimationId),
                updateAfter: { type: "single" },
                data: [
                    {
                        characterSpawnPositionId:
                            action === "remove" ? -characterSpawnPositionId : characterSpawnPositionId
                    }
                ]
            })
        );
    };

    return (
        <Card
            title="Character Spawn Position List"
            extra={
                <SpawnsSearchContainer
                    checkIsLinked={(id) => !!info.data?.some((spawn) => spawn.id === id)}
                    onChangeLinkingStatus={handleOnClick}
                />
            }>
            <List
                dataSource={info?.data}
                loading={info?.loading ?? false}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                        extra={
                            <Popconfirm title="Remove?" onConfirm={() => handleOnClick("remove", item.id)}>
                                <Button type="link" danger>
                                    Remove
                                </Button>
                            </Popconfirm>
                        }>
                        <List.Item.Meta
                            title={
                                <Link
                                    to={DETAILS_ASSET_URL.format({
                                        stage,
                                        asset: "CharacterSpawnPosition",
                                        id: item.id
                                    })}>
                                    {item.name}
                                </Link>
                            }
                            description={"ID: " + item.id}
                            avatar={
                                <Avatar
                                    size={80}
                                    shape="square"
                                    src={createCdnURLFromFiles({
                                        stage,
                                        entityType: "CharacterSpawnPosition",
                                        id: item.id,
                                        files: item.files,
                                        resolution: "128x128"
                                    })}
                                />
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}
