import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { useExtraData } from "shared/hooks/useExtraData";
import { UMA_SHARED_COLOR_DETAILS_URL } from "urls";
import { USColorList } from "features/categories-moderation/components/USColorList";
import { FixedPageHeader, LoadingContainer } from "shared";
import { convertFromIntColor } from "utils";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { updateEntityAction } from "shared/store";

export function USColorListContainer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = UMA_SHARED_COLOR_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const info = useExtraData({ stage: urlMatch.params.stage, name: "UmaSharedColor" });

    const umaSharedColor = info.data?.find((el) => el.id === Number(urlMatch.params.id));

    const [colors, setColors] = useState(umaSharedColor?.colors ?? []);
    const [saveTitle, setSaveTitle] = useState(false);

    useEffect(() => {
        if (umaSharedColor?.colors) {
            setColors(umaSharedColor.colors);
        }
    }, [umaSharedColor]);

    if (info.loading && !info.data) {
        return <LoadingContainer loading />;
    }

    const RgbaColorList = colors.map(convertFromIntColor);

    const changeOrder = (currentIndex: number, direction: "left" | "right") => {
        if (direction === "left" && currentIndex !== 0) {
            const newArr = [...colors];

            newArr[currentIndex - 1] = colors[currentIndex];
            newArr[currentIndex] = colors[currentIndex - 1];

            setColors(newArr);
            setSaveTitle(true);
        }

        if (direction === "right" && currentIndex !== colors.length - 1) {
            const newArr = [...colors];

            newArr[currentIndex + 1] = colors[currentIndex];
            newArr[currentIndex] = colors[currentIndex + 1];

            setColors(newArr);
            setSaveTitle(true);
        }
    };

    const discardChanges = () => {
        setSaveTitle(false);
        setColors(umaSharedColor?.colors ?? []);
    };

    const saveChanges = () => {
        umaSharedColor &&
            dispatch(
                updateEntityAction({
                    stage: urlMatch.params.stage,
                    entityName: "UmaSharedColor",
                    data: { id: umaSharedColor?.id, colors }
                })
            );

        setSaveTitle(false);
    };

    return (
        <>
            <USColorList colorList={RgbaColorList ?? []} changeOrder={changeOrder} />
            {saveTitle && (
                <FixedPageHeader
                    title="Unsaved changes"
                    extra={[
                        <Button key="us-list-discard" onClick={discardChanges}>
                            Discard
                        </Button>,
                        <Button key="us-list-save" onClick={saveChanges}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </>
    );
}
