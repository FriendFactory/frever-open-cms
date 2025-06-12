import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { USER_ACTIVITY_TAB_URL } from "urls";
import { UserActionType, UserActivityQueryParams } from "features/user-moderation/services";
import { UserActivitySearchFilter } from "features/user-moderation/components/UserActivitySearchFilter";
import { getActionTypeName } from "features/user-moderation/constants/action-types-names";

const actionTypes = (Object.keys(UserActionType) as unknown as Array<keyof typeof UserActionType>).map((key) => ({
    label: getActionTypeName(key),
    value: key
}));

export function UserActivitySearchFilterContainer() {
    const [form] = Form.useForm<UserActivityQueryParams>();
    const location = useLocation();
    const history = useHistory();

    const urlMatch = USER_ACTIVITY_TAB_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const values: UserActivityQueryParams = {
        orderBy: "occurredAt",
        ...urlMatch.query
    };

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = USER_ACTIVITY_TAB_URL.replace(location, {}, params);
        if (newUrl) history.push(newUrl);
    };

    const handleChangeSortDirection = () => {
        form.setFieldValue("sortDirection", values?.sortDirection === "asc" ? "desc" : "asc");
        handleOnSearch();
    };

    return (
        <UserActivitySearchFilter
            form={form}
            values={values}
            actionTypes={actionTypes}
            onSearch={handleOnSearch}
            changeSortDirection={handleChangeSortDirection}
        />
    );
}
