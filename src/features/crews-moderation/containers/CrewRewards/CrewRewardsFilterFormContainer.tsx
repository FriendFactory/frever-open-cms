import React from "react";
import { Alert, Form } from "antd";
import { useHistory, useLocation } from "react-router";

import { CREW_REWARDS_LIST_URL } from "urls";
import { CrewRewardsFilterForm, CrewRewardsFilterFormFields } from "../../components/CrewRewardsFilterForm";

export function CrewRewardsFilterFormContainer() {
    const [form] = Form.useForm<CrewRewardsFilterFormFields>();
    const location = useLocation();
    const history = useHistory();

    const urlMatch = CREW_REWARDS_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleOnSearch = async () => {
        const params = await form.validateFields();
        const newUrl = CREW_REWARDS_LIST_URL.replace(location, {}, params);
        if (newUrl) history.replace(newUrl);
    };

    return <CrewRewardsFilterForm form={form} value={urlMatch.query || {}} onSearch={handleOnSearch} />;
}
