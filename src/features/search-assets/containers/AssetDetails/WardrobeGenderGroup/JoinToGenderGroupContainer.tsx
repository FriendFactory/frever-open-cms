import { Button, Modal } from "antd";
import { ColumnType } from "antd/lib/table";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { WardrobeAsset } from "features/search-assets/services";
import { executeGenderGroupCommandAction } from "features/search-assets/store";
import { AssetSearchTableContainer } from "shared/containers/AssetSearchTableContainer";

export interface JoinToGenderGroupContainerProps {
    stage: string;
    genderIdFilter: number;
    targetWardrobeId: number;
}

export function JoinToGenderGroupContainer({
    stage,
    targetWardrobeId,
    genderIdFilter
}: JoinToGenderGroupContainerProps) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const executeCommand = (genderGroupId?: number | null) => () => {
        genderGroupId &&
            dispatch(
                executeGenderGroupCommandAction({
                    stage,
                    command: { type: "join-to-group", genderGroupId, wardrobeId: targetWardrobeId }
                })
            );
        setIsModalOpen(false);
    };

    const actionColumn: ColumnType<WardrobeAsset> = {
        title: "",
        render: (_, entity) => (
            <Button type="primary" ghost onClick={executeCommand(entity.wardrobeGenderGroupId)}>
                Join
            </Button>
        )
    };

    return (
        <>
            <span onClick={() => setIsModalOpen(true)}>Join to existing</span>
            <Modal
                title="Search for Wardrobe"
                width={1024}
                centered
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={false}>
                <AssetSearchTableContainer
                    rowKey={(entity) => entity.id}
                    stage={stage}
                    asset="Wardrobe"
                    baseSearchParams={{ wardrobeGenderGroupIdFilter: genderIdFilter }}
                    actionColumn={actionColumn as any}
                />
            </Modal>
        </>
    );
}
