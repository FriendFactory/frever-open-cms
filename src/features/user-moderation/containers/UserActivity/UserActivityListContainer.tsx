import React from "react";
import { useSelector } from "react-redux";

import { UserActivity, UserActivityQueryParams } from "features/user-moderation/services";
import { userActivityPageSelector } from "features/user-moderation/store/reducer/userActivityReducer";
import { getFieldsByActionType } from "features/user-moderation/constants/fields-by-action";
import { UserActivityList } from "features/user-moderation/components/UserActivityList";

interface UserActivityListContainerProps {
    stage: string;
    groupId: number;
    params: UserActivityQueryParams;
}

export function UserActivityListContainer({ stage, groupId, params }: UserActivityListContainerProps) {
    const info = useSelector(userActivityPageSelector(stage, groupId, params));

    return (
        <UserActivityList
            stage={stage}
            loading={info.loading}
            dataSource={info.data}
            renderItemActions={renderFieldsForAction(stage)}
        />
    );
}

const renderFieldsForAction = (stage: string) => (item: UserActivity) => {
    const fields = getFieldsByActionType(item.actionType);

    return fields.map(({ render, dataIndex, title }) => {
        const value = render ? render(item, stage) : dataIndex ? item[dataIndex] : "";
        return (
            <div key={dataIndex}>
                {title}: {value}
            </div>
        );
    });
};
