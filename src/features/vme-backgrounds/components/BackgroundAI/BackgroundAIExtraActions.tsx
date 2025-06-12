import React, { useState } from "react";
import { Button, Form, Dropdown, MenuProps, Modal, Select, Upload, App, Space } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { ExportOutlined, ImportOutlined, MoreOutlined, UploadOutlined } from "@ant-design/icons";

import { BackgroundAI, BackgroundAIOption, BackgroundAIOptionsSet } from "features/vme-backgrounds/services";

interface ModalAction {
    isOpen: boolean;
    actionType?: "Export" | "Import";
    selectedOptions?: string[];
}

export function BackgroundAIExtraActions() {
    const form = Form.useFormInstance<BackgroundAI>();
    const { message } = App.useApp();

    const [modal, setModal] = useState<ModalAction>({ isOpen: false });
    const [importData, setImportData] = useState<BackgroundAIOptionsSet[]>();

    const formSets: BackgroundAIOptionsSet[] = form.getFieldValue(["settings", "sets"]);

    const open = (actionType: ModalAction["actionType"]) => setModal({ isOpen: true, actionType });
    const close = () => setModal({ isOpen: false });

    const handleExportFile = () => {
        const selectedOptions = modal.selectedOptions;
        if (!selectedOptions || !selectedOptions.length) return;

        const data = formSets.filter((set) => selectedOptions.includes(set.title));

        const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${selectedOptions.join(",")}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        message.success("File saved successfully!");
        close();
    };

    const handleImportFile = () => {
        const selectedOptions = modal.selectedOptions;
        if (!selectedOptions || !selectedOptions.length) return;

        const data = importData?.filter((set) => selectedOptions.includes(set.title));
        if (!data) return;

        form.setFieldValue(["settings", "sets"], [...formSets, ...data]);
        form.validateFields();

        message.success("New option sets added successfully!");
        close();
    };

    const handleUploadFile = (file: File) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target && e.target.result) {
                try {
                    const importedData: BackgroundAIOptionsSet[] = JSON.parse(e.target.result as string);
                    if (validateImportedSets(importedData)) {
                        setImportData(importedData);
                        message.success("File read successfully!");
                    } else {
                        message.error("Invalid file structure.");
                    }
                } catch (error) {
                    message.error("Error reading file.");
                }
            }
        };

        reader.readAsText(file);
        return false;
    };

    const items: MenuProps["items"] = [
        {
            label: "Export",
            key: "export",
            icon: <ExportOutlined />,
            onClick: () => open("Export")
        },
        {
            label: "Import",
            key: "import",
            icon: <ImportOutlined />,
            onClick: () => open("Import")
        }
    ];

    const options: DefaultOptionType[] | undefined =
        modal.actionType === "Export"
            ? formSets.map((set) => ({ label: set.title ?? "<Empty Title>", value: set.title }))
            : modal.actionType === "Import"
            ? importData?.map((set) => ({ label: set.title ?? "<Empty Title>", value: set.title }))
            : undefined;

    return (
        <>
            <Dropdown menu={{ items }}>
                <Button icon={<MoreOutlined />} />
            </Dropdown>
            <Modal
                title={`${modal.actionType} Sets`}
                style={{ top: 100 }}
                open={modal.isOpen}
                destroyOnClose
                onCancel={close}
                onOk={modal.actionType === "Export" ? handleExportFile : handleImportFile}
                children={
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {modal.actionType === "Import" && (
                            <Upload
                                accept="application/json"
                                beforeUpload={handleUploadFile}
                                showUploadList
                                maxCount={1}>
                                <Button icon={<UploadOutlined />}>Select File</Button>
                            </Upload>
                        )}

                        <Select
                            mode="multiple"
                            placeholder="Select Sets"
                            options={options}
                            onChange={(selectedOptions) => setModal({ ...modal, selectedOptions })}
                            style={{ width: "100%" }}
                        />
                    </Space>
                }
            />
        </>
    );
}

const validateImportedSets = (sets: BackgroundAIOptionsSet[] | null): boolean => {
    if (!sets || !Array.isArray(sets)) return false;

    return sets.every((set) => {
        const hasTitle = !set.title || typeof set.title === "string";
        const hasColumnsCount =
            !set.columnsCount || typeof set.columnsCount === "string" || typeof set.columnsCount === "number";
        const hasOptions = !set.options || (Array.isArray(set.options) && validateOptions(set.options));

        return hasTitle && hasColumnsCount && hasOptions;
    });
};

const validateOptions = (options: BackgroundAIOption[]): boolean => {
    return options.every((option) => {
        const hasDisplayValue = !option.displayValue || typeof option.displayValue === "string";
        const hasPromptValue = !option.promptValue || typeof option.promptValue === "string";
        const hasLabel = !option.label || typeof option.label === "string";

        return hasDisplayValue && hasPromptValue && hasLabel;
    });
};
