import React, { useCallback, useState } from "react";
import { Modal } from "antd";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

import { ColorPicker } from "shared/components";
import { convertToInt, RgbaColor } from "utils";
import { useExtraData } from "shared/hooks/useExtraData";
import { updateEntityAction } from "shared/store";
import { UMA_SHARED_COLOR_DETAILS_URL } from "urls";

export function ColorPickerModal() {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlMatch = UMA_SHARED_COLOR_DETAILS_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const info = useExtraData({ stage: urlMatch.params.stage, name: "UmaSharedColor" });
    const umaSharedColor = info.data?.find((el) => el.id === Number(urlMatch.params.id));

    const handleOnSubmit = useCallback(
        (value: RgbaColor) => {
            if (umaSharedColor) {
                const intColor = convertToInt({ ...value, alpha: Math.floor(value.alpha * 255) });

                const newUmaSharedColor = { id: umaSharedColor.id, colors: [...umaSharedColor.colors, intColor] };

                dispatch(
                    updateEntityAction({
                        stage: urlMatch.params.stage,
                        entityName: "UmaSharedColor",
                        data: newUmaSharedColor
                    })
                );
            }
        },
        [umaSharedColor]
    );

    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    return (
        <>
            <a onClick={showModal}>Add color</a>
            <Modal
                title="Add new color"
                width={768}
                open={isModalOpen}
                destroyOnClose
                maskClosable={false}
                footer={false}
                onCancel={hideModal}>
                <ColorPicker onSubmit={handleOnSubmit} />
            </Modal>
        </>
    );
}
