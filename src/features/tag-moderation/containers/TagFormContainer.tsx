import React from "react";
import { Card } from "antd";
import { useDispatch } from "react-redux";
import { StoreValue } from "antd/lib/form/interface";

import { TagForm } from "features/tag-moderation/components/TagForm";
import { useExtraData } from "shared/hooks/useExtraData";
import { updateEntityAction } from "shared/store";

export interface TagFormContainerProps {
    stage: string;
    id: number;
}

export function TagFormContainer({ stage, id }: TagFormContainerProps) {
    const dispatch = useDispatch();

    const info = useExtraData({ stage, name: "Tag" });
    const categories = useExtraData({ stage, name: "TagCategory" });

    const data = info.data?.find((el) => el.id.toString() === id.toString());

    const handleOnFinish = (form: StoreValue) =>
        data && dispatch(updateEntityAction({ stage, entityName: "Tag", data: { id: data.id, ...form } }));

    return (
        <Card title="Information" loading={(!info.data && info.loading) || categories.loading}>
            <TagForm data={data} categories={categories?.data ?? []} onFinish={handleOnFinish} />
        </Card>
    );
}
