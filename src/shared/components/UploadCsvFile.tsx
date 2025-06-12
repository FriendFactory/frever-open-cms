import React from "react";
import { Upload, App } from "antd";
import Papa, { ParseConfig } from "papaparse";

interface UploadCsvFileProps {
    children: React.ReactChild;
    onParsedData: (data: any[][]) => void;
    validate?: (data: any[][]) => boolean;
    parseConfig?: ParseConfig;
}

export const UploadCsvFile = ({ children, onParsedData, validate, parseConfig }: UploadCsvFileProps) => {
    const { message } = App.useApp();

    const handleFileUpload = (file: File) => {
        if (file.type !== "text/csv") {
            message.error("Invalid file format. Please upload a CSV file.");
            return false;
        }

        Papa.parse<string[]>(file, {
            ...parseConfig,
            complete: (result) => {
                const parsedData = result.data;

                if (validate && !validate(parsedData)) {
                    message.error("Validation failed: Contain invalid data.");
                    return;
                }

                onParsedData(parsedData);

                message.success("CSV file read successfully!");
            },
            error: (error) => {
                message.error(`Error reading file: ${error.message}`);
            }
        });
        return false;
    };

    return (
        <Upload beforeUpload={handleFileUpload} accept=".csv" showUploadList={false}>
            {children}
        </Upload>
    );
};
