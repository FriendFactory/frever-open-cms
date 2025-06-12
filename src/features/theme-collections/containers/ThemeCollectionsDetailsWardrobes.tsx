import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "antd";

import { themeCollectionInfoByIdSelector } from "../store/reducer/collectionListReducer";
import { ThemeCollectionWardrobes } from "../components/ThemeCollectionWardrobes";
import { updateThemeCollectionWardrobesAction, upsertSingleCollectionAction } from "../store/actions";
import { ThemeCollectionWardrobeAction, WardrobeShortInfo } from "../services";
import { WardrobeSearchContainer } from "./WardrobeSearchContainer";

export interface ThemeCollectionsDetailsWardrobesProps {
    stage: string;
    id: number;
}

export function ThemeCollectionsDetailsWardrobes({ stage, id }: ThemeCollectionsDetailsWardrobesProps) {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(themeCollectionInfoByIdSelector(stage, id));

    const onUpdate = (wardrobes: WardrobeShortInfo[]) =>
        dispatch(upsertSingleCollectionAction({ stage, data: { item: { ...data, wardrobes } } }));

    const handleBulkUpdate = (action: "add" | "remove", newWardrobes: WardrobeShortInfo[]) => {
        if (!data) return;

        dispatch(
            updateThemeCollectionWardrobesAction({
                stage,
                item: data,
                targetWardrobeIds: newWardrobes.map((val) => val.id),
                action: action === "add" ? "Add" : "Delete"
            })
        );
    };

    const isLinked = (id: number) => !!data?.wardrobes.some((el) => el.id === id);

    const updateThemeCollection = (wardrobeId: number, action: ThemeCollectionWardrobeAction) => {
        if (!data) return;

        dispatch(
            updateThemeCollectionWardrobesAction({
                stage,
                item: data,
                targetWardrobeIds: [wardrobeId],
                action
            })
        );
    };

    return (
        <Card
            title="Wardrobes"
            loading={loading && !data}
            extra={
                <WardrobeSearchContainer
                    changeStatusOfLinking={({ id }) => updateThemeCollection(id, isLinked(id) ? "Delete" : "Add")}
                    bulkUpdate={handleBulkUpdate}
                    isLinked={isLinked}
                />
            }>
            <ThemeCollectionWardrobes
                stage={stage}
                wardrobes={data?.wardrobes}
                onUpdate={onUpdate}
                onDelete={(id) => updateThemeCollection(id, "Delete")}
            />
        </Card>
    );
}
