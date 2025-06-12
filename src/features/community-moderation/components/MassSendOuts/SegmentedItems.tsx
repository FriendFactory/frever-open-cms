import React, { useState } from "react";
import { Divider, Segmented } from "antd";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";

import { FormUserGroupIds } from "./FormUserGroupIds";
import { FormAudienceSegmentation } from "./FormAudienceSegmentation";

type SegmentTypes = "groupIds" | "audienceSegmentation";

export function SegmentedItems() {
    const [value, setValue] = useState<SegmentTypes>("groupIds");
    return (
        <>
            <Segmented
                value={value}
                onChange={(v) => setValue(v as SegmentTypes)}
                size="large"
                options={[
                    { label: "List of Group IDs", value: "groupIds", icon: <BarsOutlined /> },
                    { label: "Audience Segmentation", value: "audienceSegmentation", icon: <AppstoreOutlined /> }
                ]}
            />
            <Divider />
            {value === "groupIds" && <FormUserGroupIds />}
            {value === "audienceSegmentation" && <FormAudienceSegmentation />}
        </>
    );
}
