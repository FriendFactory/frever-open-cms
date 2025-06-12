import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "antd";

import { themeCollectionsByWardrobeIdSelector } from "../store/reducer/collectionListReducer";
import { ThemeCollectionsList } from "../components/ThemeCollectionsList";
import { ThemeCollection } from "../services";
import { upsertSingleCollectionAction } from "../store/actions";
import { AddWardrobeToThemeCollectionContainer } from "./AddWardrobeToThemeCollectionContainer";

interface ThemeCollectionsWardrobeListContainerProps {
    stage: string;
    wardrobeId: number;
}

export function ThemeCollectionsWardrobeListContainer({
    stage,
    wardrobeId
}: ThemeCollectionsWardrobeListContainerProps) {
    const dispatch = useDispatch();
    const info = useSelector(themeCollectionsByWardrobeIdSelector(stage, wardrobeId));

    const [selectedThemeId, setSelectedThemeId] = useState<null | number>(null);

    const onSelectThemeCollection = (themeId: number | null) => setSelectedThemeId(themeId);

    const handleOnUpdate = (item: ThemeCollection) => dispatch(upsertSingleCollectionAction({ stage, data: { item } }));

    return (
        <Card
            title="Theme Collections"
            extra={<AddWardrobeToThemeCollectionContainer wardrobeIds={[Number(wardrobeId)]} />}>
            <ThemeCollectionsList
                loading={info.loading && !info.data}
                data={info.data}
                currentSelectedThemeId={selectedThemeId}
                currentWardrobeId={Number(wardrobeId)}
                onUpdate={handleOnUpdate}
                onSelectThemeCollection={onSelectThemeCollection}
            />
        </Card>
    );
}
