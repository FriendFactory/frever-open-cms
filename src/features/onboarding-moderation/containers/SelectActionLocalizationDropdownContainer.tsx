import React from "react";
import { Dropdown } from "antd";
import { useDispatch } from "react-redux";

import { LocalizationExport } from "../components/LocalizationExport";
import { LocalizationImport } from "../components/LocalizationImport";
import { LocalizationImportType } from "../services";
import { localizationImportAction } from "../store/actions";
import { useCurrentStage } from "shared";

interface SelectActionLocalizationDropdownContainerProps {
    children: JSX.Element;
}

export function SelectActionLocalizationDropdownContainer({
    children
}: SelectActionLocalizationDropdownContainerProps) {
    const dispatch = useDispatch();
    const stage = useCurrentStage();

    const handleUpdate = (importType: LocalizationImportType) => (file: File) => {
        dispatch(localizationImportAction({ stage, importType, csvFile: file as unknown as File }));
    };

    return (
        <Dropdown
            placement="bottomRight"
            menu={{
                items: [
                    {
                        key: "group-localization",
                        type: "group",
                        label: "Localization:",
                        children: [
                            {
                                key: "export ",
                                label: <LocalizationExport />
                            },
                            {
                                key: "replace",
                                label: (
                                    <LocalizationImport
                                        title="Replace"
                                        importType="Replace"
                                        description="Delete all existing localizations and import new ones."
                                        handleUpdate={handleUpdate("Replace")}
                                    />
                                )
                            },
                            {
                                key: "merge",
                                label: (
                                    <LocalizationImport
                                        title="Merge"
                                        importType="Merge"
                                        description="Import new ones, and override localizations for existing ones."
                                        handleUpdate={handleUpdate("Merge")}
                                    />
                                )
                            },
                            {
                                key: "add-new",
                                label: (
                                    <LocalizationImport
                                        title="Add New"
                                        importType="AddNew"
                                        description="Import only new localizations, if the same localizations already exist, they remain unchanged."
                                        handleUpdate={handleUpdate("AddNew")}
                                    />
                                )
                            }
                        ]
                    }
                ]
            }}>
            {children}
        </Dropdown>
    );
}
