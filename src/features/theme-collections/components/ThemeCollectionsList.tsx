import React from "react";
import { Button, Empty, Space, List as AntdList } from "antd";
import styled from "styled-components";

import { useCurrentStage } from "shared";
import { ThemeCollection } from "../services";
import { ThemeCollectionListItemMeta } from "./ThemeCollectionListItemMeta";
import { ThemeCollectionWardrobes } from "./ThemeCollectionWardrobes";

export interface ThemeCollectionsListProps {
    loading: boolean;
    data?: ThemeCollection[];
    currentSelectedThemeId: number | null;
    currentWardrobeId: number;
    onSelectThemeCollection: (id: number | null) => void;
    onUpdate: (item: ThemeCollection) => void;
}

export function ThemeCollectionsList({
    data,
    currentSelectedThemeId,
    currentWardrobeId,
    onSelectThemeCollection,
    onUpdate
}: ThemeCollectionsListProps) {
    const stage = useCurrentStage();

    return data?.length ? (
        <AntdList itemLayout="vertical">
            {data?.map((item) => (
                <AntdList.Item key={item.id}>
                    <ThemeCollectionListItemMeta
                        item={item}
                        avatarSize={100}
                        stage={stage}
                        extra={
                            <Button
                                type="link"
                                onClick={() =>
                                    onSelectThemeCollection(item.id === currentSelectedThemeId ? null : item.id)
                                }>
                                {item.id !== currentSelectedThemeId ? "Show Wardrobes" : "Hide"}
                            </Button>
                        }
                    />
                    {currentSelectedThemeId === item.id && (
                        <Styled>
                            <ThemeCollectionWardrobes
                                stage={stage}
                                wardrobes={item.wardrobes}
                                currentWardrobeId={Number(currentWardrobeId)}
                                onUpdate={(wardrobes) => onUpdate({ ...item, wardrobes })}
                                onDelete={(id) =>
                                    onUpdate({
                                        ...item,
                                        wardrobes: item.wardrobes.filter((el) => el.id !== id)
                                    })
                                }
                            />
                        </Styled>
                    )}
                </AntdList.Item>
            ))}
        </AntdList>
    ) : (
        <Space style={{ width: "100%" }} align="center" direction="vertical">
            <Empty />
        </Space>
    );
}

const Styled = styled.div`
    @keyframes growDown {
        0% {
            transform: scaleY(0);
        }
        100% {
            transform: scaleY(1);
        }
    }

    animation: growDown 300ms ease-in-out forwards;
    transform-origin: top center;
`;
