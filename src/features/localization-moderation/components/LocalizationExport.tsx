import React from "react";
import { message, Typography } from "antd";

import { useCurrentStage } from "shared";
import { exportLocalizationCSV } from "../services";

export const LocalizationExport = () => {
    const stage = useCurrentStage();

    const handleDownload = async () => {
        try {
            const data = await exportLocalizationCSV(stage);
            const blob = new Blob([data as string], { type: "text/csv; charset=utf-8" });

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `localization-${stage}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            message.error(`Something went wrong while exporting the file. ${error}`);
        }
    };

    return <Typography.Link onClick={handleDownload}>Export</Typography.Link>;
};
