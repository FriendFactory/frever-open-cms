import React from "react";
import { Result } from "antd";

import { BlankLayout } from "layout";

export const PageURLNotMatch = () => (
    <BlankLayout>
        <Result
            status="500"
            title="Sorry, something went wrong."
            subTitle="The page URL does not match the current page."
        />
    </BlankLayout>
);
