import React from "react";
import { Dropdown } from "antd";
import { useDispatch } from "react-redux";

import { LocalizationExport } from "../components/LocalizationExport";
import { LocalizationImportType } from "../services";
import { localizationImportAction } from "../store";
import { LocalizationImport } from "../components/LocalizationImport";

interface SelectActionDropdownContainerProps {
    stage: string;
    children: JSX.Element;
}

export function SelectActionDropdownContainer({ stage, children }: SelectActionDropdownContainerProps) {
    const dispatch = useDispatch();

    const handleUpdate = (action: LocalizationImportType) => (file: File) => {
        dispatch(localizationImportAction({ stage, importType: action, csvFile: file as unknown as File }));
    };

    return (
        <Dropdown
            placement="bottomRight"
            menu={{
                items: [
                    {
                        key: "export",
                        label: <LocalizationExport />
                    },
                    {
                        key: "replace",
                        label: (
                            <LocalizationImport
                                importType="Replace"
                                title="Replace"
                                description="Delete all existing terms and import new ones."
                                handleUpdate={handleUpdate("Replace")}
                            />
                        )
                    },
                    {
                        key: "merge",
                        label: (
                            <LocalizationImport
                                importType="Merge"
                                title="Merge"
                                description="Import new ones, and override values for existing ones if they have the same Keys."
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
                                description="Import only new terms, in case the same Keys already exist then leave them untouched."
                                handleUpdate={handleUpdate("AddNew")}
                            />
                        )
                    }
                ]
            }}>
            {children}
        </Dropdown>
    );
}
