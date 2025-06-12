import React, { useState } from "react";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Button, Card, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { SeasonBaseInfoForm, SeasonCreationFormData } from "features/seasons-moderation/components/SeasonBaseInfoForm";
import { SeasonBaseInfo } from "features/seasons-moderation/services";
import { postSeasonAction } from "features/seasons-moderation/store/actions";
import { FixedPageHeader } from "shared";
import { seasonDetailsPageSelector } from "../../store/reducer/seasonDetails.reducer";
import { SEASON_DETAILS_PAGE_URL } from "urls";
import { CopySeasonContainer } from "../CopySeasonContainer";

export function SeasonInfoContainer() {
    const location = useLocation();
    const dispatch = useDispatch();

    const urlMatch = SEASON_DETAILS_PAGE_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const { stage, id } = urlMatch.params;
    const seasonFormId = `form/${stage}/${id}`;

    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState(false);
    const info = useSelector(seasonDetailsPageSelector(urlMatch.params.stage, urlMatch.params.id), shallowEqual);

    const handleOnSubmit = (form: SeasonCreationFormData) => {
        const { startDate, endDate, ...restFields } = form;

        if (info.data) {
            const data: SeasonBaseInfo = {
                ...restFields,
                id: info.data.id,
                startDate: startDate?.format("YYYY-MM-DD") ?? "",
                endDate: endDate?.format("YYYY-MM-DD") ?? ""
            };

            dispatch(postSeasonAction({ stage, data }));
        } else {
            message.error("The source data is missing");
        }
        setIsSaveHeaderOpen(false);
    };

    return (
        <Card
            title="Information"
            loading={!info.data && info.loading}
            extra={
                <CopySeasonContainer stage={stage} id={id}>
                    <Button ghost type="primary" icon={<CopyOutlined />}>
                        Copy Season
                    </Button>
                </CopySeasonContainer>
            }>
            <SeasonBaseInfoForm
                id={seasonFormId}
                onFieldsChange={() => setIsSaveHeaderOpen(true)}
                initialValues={
                    info.data && {
                        ...info.data,
                        startDate: dayjs.utc(info.data.startDate),
                        endDate: dayjs.utc(info.data.endDate)
                    }
                }
                onFinish={handleOnSubmit}
            />
            {isSaveHeaderOpen && (
                <FixedPageHeader
                    title={"Unsaved changes"}
                    extra={[
                        <Button key="update-season-cancel" htmlType="reset" form={seasonFormId}>
                            Cancel
                        </Button>,
                        <Button key="update-season-create" htmlType="submit" type="primary" form={seasonFormId}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Card>
    );
}
