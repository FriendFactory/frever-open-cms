import React, { useState } from "react";
import { Button } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { SeasonBaseInfoForm, SeasonCreationFormData } from "../components/SeasonBaseInfoForm";
import { ScrollableModal } from "shared/components/ScrollableModal";
import { SeasonBaseInfo } from "../services";
import { postSeasonAction } from "../store/actions";

export interface CreateSeasonContainerProps extends BaseButtonProps {
    stage: string;
    children?: React.ReactNode;
}

const seasonFormId = "create-season";

export function CreateSeasonContainer({ stage, children, ...restProps }: CreateSeasonContainerProps) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = (form: SeasonCreationFormData) => {
        const { startDate, endDate, ...restFields } = form;

        const data: SeasonBaseInfo = {
            ...restFields,
            startDate: startDate?.format("YYYY-MM-DD") ?? "",
            endDate: endDate?.format("YYYY-MM-DD") ?? "",
            id: 0
        };

        dispatch(postSeasonAction({ stage, data }));
        destroyModal();
    };

    return (
        <>
            <Button {...restProps} onClick={showModal}>
                {children}
            </Button>
            <ScrollableModal
                title="Create Season"
                open={isModalOpen}
                destroyOnClose
                maskClosable={false}
                onCancel={destroyModal}
                footer={[
                    <Button key="create-season-cancel" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button key="create-season-create" htmlType="submit" type="primary" form={seasonFormId}>
                        Create
                    </Button>
                ]}>
                <SeasonBaseInfoForm
                    id={seasonFormId}
                    initialValues={{ startDate: dayjs.utc(), endDate: dayjs.utc() }}
                    onFinish={handleOnSubmit}
                />
            </ScrollableModal>
        </>
    );
}
