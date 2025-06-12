import React, { useMemo, useState } from "react";
import { Checkbox, Modal } from "antd";
import { useDispatch } from "react-redux";
import { runAssetMigrationAction } from "../store";
import { getNxtStageByCurrStageId } from "features/auth";

export const globalUmaBundles = [
    { name: "global_female_base", id: 580 },
    { name: "global_male_base", id: 581 },
    { name: "global_shared", id: 582 }
];

export interface GlobalUmaBundleMigrateProps {
    stage: string;
}

export function GlobalUmaBundleMigrate({ stage }: GlobalUmaBundleMigrateProps) {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState(globalUmaBundles.map((el) => el.id));

    const nextStage = useMemo(() => getNxtStageByCurrStageId(stage), []);

    const executeMigrationPreview = () =>
        nextStage &&
        dispatch(
            runAssetMigrationAction({
                params: { operation: "preview", fromStage: stage, toStage: nextStage.id, assetType: "UmaBundle" },
                assetList: selectedValues
            })
        );

    const handleOnOk = () => {
        setIsModalOpen(false);
        executeMigrationPreview();
    };

    return (
        <>
            <div onClick={() => setIsModalOpen(true)}>Migrate global Uma Bundles</div>
            <Modal
                width="1280px"
                style={{ top: "20px" }}
                styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 152px)" } }}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleOnOk}
                destroyOnClose>
                <div>Select Uma bandles that you want migrate to {}</div>
                <br />
                <Checkbox.Group value={selectedValues} onChange={(e: any) => setSelectedValues(e)}>
                    {globalUmaBundles.map((el) => (
                        <Checkbox key={el.id} value={el.id}>
                            {el.name}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </Modal>
        </>
    );
}
