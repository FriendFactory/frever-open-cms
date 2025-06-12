import React, { useEffect, useState } from "react";
import { Button, Card, Form } from "antd";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import { FixedPageHeader } from "shared";
import { inAppProductPostAction } from "features/banking-moderation/store/actions";
import { inAppProductInfoPageSelector } from "features/banking-moderation/store/reducer/inAppProducts/inAppProductInfo.reducer";
import {
    InAppProductForm,
    InAppProductFormInitialValues
} from "features/banking-moderation/components/InAppProductForm";

const IN_APP_PRODUCT_FORM_ID = "IN_APP_PRODUCT_FORM";

interface InAppProductFormContainerProps {
    stage: string;
    id: number;
}

export const InAppProductFormContainer = ({ stage, id }: InAppProductFormContainerProps) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState(false);
    const showSaveHeader = () => !isSaveHeaderOpen && setIsSaveHeaderOpen(true);
    const hideSaveHeader = () => isSaveHeaderOpen && setIsSaveHeaderOpen(false);

    const { data, loading } = useSelector(inAppProductInfoPageSelector(stage, id), shallowEqual);

    const initialValues: InAppProductFormInitialValues = {
        ...data,
        publicationDate: data?.publicationDate ? dayjs.utc(data?.publicationDate) : null,
        depublicationDate: data?.depublicationDate ? dayjs.utc(data?.depublicationDate) : null
    };

    useEffect(() => data && form.setFieldsValue(initialValues), [data]);

    const handleOnReset = () => {
        form.setFieldsValue(initialValues);
        hideSaveHeader();
    };

    const handleOnFinish = async () => {
        const formData = await form.validateFields();

        const dataToUpdate = {
            ...data,
            ...formData,
            publicationDate: formData?.publicationDate ? dayjs.utc(formData?.publicationDate).format() : null,
            depublicationDate: formData?.depublicationDate ? dayjs.utc(formData?.depublicationDate).format() : null,
            id: data?.id
        };

        dispatch(inAppProductPostAction({ stage, data: dataToUpdate }));
        hideSaveHeader();
    };

    return (
        <Card title="Information" loading={!data && loading}>
            <InAppProductForm
                stage={stage}
                id={IN_APP_PRODUCT_FORM_ID}
                form={form}
                disabled={loading}
                initialValues={initialValues}
                onFieldsChange={showSaveHeader}
            />
            {isSaveHeaderOpen && (
                <FixedPageHeader
                    title="Unsaved changes"
                    extra={[
                        <Button key="reset" onClick={handleOnReset}>
                            Discard
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleOnFinish}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Card>
    );
};
