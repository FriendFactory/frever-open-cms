import React, { useState } from "react";
import { Button } from "antd";
import { BaseButtonProps } from "antd/lib/button/button";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

import { ScrollableModal } from "shared/components/ScrollableModal";
import { SeasonCopyForm, SeasonCopyFormData } from "../components/SeasonCopyForm";
import { CopySeasonType } from "../services/copySeason";
import { copySeasonEntityAction } from "../store/actions";

export interface CopySeasonContainerProps extends BaseButtonProps {
    stage: string;
    id: number;
    children?: React.ReactNode;
}

const seasonFormId = "copy-season";

export function CopySeasonContainer({ stage, id, children, ...restProps }: CopySeasonContainerProps) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => setIsModalOpen(true);

    const handleOnSubmit = (form: SeasonCopyFormData) => {
        const { startDate, endDate } = form;

        const data: CopySeasonType = {
            id,
            startDate: startDate?.format("YYYY-MM-DD"),
            endDate: endDate?.format("YYYY-MM-DD")
        };

        dispatch(copySeasonEntityAction({ stage, data }));
        destroyModal();
    };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <span {...restProps} onClick={showModal}>
                {children}
            </span>
            <ScrollableModal
                title="Copy Season"
                open={isModalOpen}
                destroyOnClose
                maskClosable={false}
                onCancel={destroyModal}
                footer={[
                    <Button key="copy-season-cancel" onClick={destroyModal}>
                        Cancel
                    </Button>,
                    <Button key="copy-season-create" htmlType="submit" type="primary" form={seasonFormId}>
                        Create Copy
                    </Button>
                ]}>
                <SeasonCopyForm
                    id={seasonFormId}
                    initialValues={{ startDate: dayjs.utc(), endDate: dayjs.utc() }}
                    onFinish={handleOnSubmit}
                />
            </ScrollableModal>
        </div>
    );
}
