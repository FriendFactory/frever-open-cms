import { ButtonProps, CardProps } from "antd";
import { UserFilterFields } from "features/user-moderation/components/UserFilterForm";
import { User } from "features/user-moderation/services";

export type UserCard = React.ComponentType<{ groupId: number; actions?: CardProps["actions"] }>;

export type UserSearchWindow = React.ComponentType<{
    btnProps: ButtonProps;
    baseSearchParams?: UserFilterFields;
    onUserClick: (user: User) => void;
}>;
