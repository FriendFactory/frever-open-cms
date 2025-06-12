import React from "react";
import { Collapse, CollapseProps, Form, Input } from "antd";
import _ from "lodash";
import styled from "styled-components";

import { AVAILABLE_LANGUAGES, ISOCodes, LOCALIZATION_FIELDS } from "../services";

export interface LocalizationFormItemsProps {
    fieldName: typeof LOCALIZATION_FIELDS[number];
}

export const LocalizationFormItems = ({ fieldName }: LocalizationFormItemsProps) => {
    const items: CollapseProps["items"] = [
        {
            key: "1",
            label: `${_.startCase(fieldName)} Localization`,
            children: Object.keys(AVAILABLE_LANGUAGES)
                .filter((isoCode) => isoCode !== "eng")
                .map((isoCode, index) => (
                    <Form.Item key={index} name={[fieldName, isoCode]} label={AVAILABLE_LANGUAGES[isoCode as ISOCodes]}>
                        <Input />
                    </Form.Item>
                ))
        }
    ];
    return <CollapseStyped items={items} ghost size="small" />;
};

const CollapseStyped = styled(Collapse)`
    .ant-collapse-header {
        padding-left: 0 !important;

        .ant-collapse-expand-icon {
            margin-left: 0 !important;
        }
    }
`;
