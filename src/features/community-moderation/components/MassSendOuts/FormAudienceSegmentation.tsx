import React from "react";
import { Col, DatePicker, Form, Row, Select } from "antd";
import { createOptionsExtraBundle, selectFilterProps, useExtraDataBundle } from "shared";
import dayjs, { Dayjs } from "dayjs";

export function FormAudienceSegmentation() {
    const extra = useExtraDataBundle(["Country"]);
    const form = Form.useFormInstance();

    const getDisabledDateBefore = (compareField: string) => (currentDate: Dayjs | null) => {
        const compareDate = form.getFieldValue(compareField);
        return currentDate && compareDate ? currentDate.isBefore(dayjs(compareDate), "day") : false;
    };

    const getDisabledDateAfter = (compareField: string) => (currentDate: Dayjs | null) => {
        const compareDate = form.getFieldValue(compareField);
        return currentDate && compareDate ? currentDate.isAfter(dayjs(compareDate), "day") : false;
    };

    // Validate dates to ensure one is not before the other
    const validateDateRange = (compareField: string, errorMessage: string) => ({
        validator: async (_: any, value: Dayjs | null) => {
            const compareDate = form.getFieldValue(compareField);

            if (!value || !compareDate) {
                return Promise.resolve();
            }

            const valueDate = dayjs(value);
            const compareFieldDate = dayjs(compareDate);

            const isBeforeConditionMet = compareField.includes("Before") && valueDate.isAfter(compareFieldDate);
            const isAfterConditionMet = !compareField.includes("Before") && valueDate.isBefore(compareFieldDate);

            if (isBeforeConditionMet || isAfterConditionMet) {
                return Promise.reject(new Error(errorMessage));
            }

            return Promise.resolve();
        }
    });

    return (
        <Row gutter={24} align="bottom">
            <Col span={24}>
                <Form.Item name="countryIds" label="Country">
                    <Select
                        mode="multiple"
                        loading={extra.loading}
                        options={createOptionsExtraBundle("Country", extra.bundle, (data) => ({
                            label: data.displayName,
                            value: data.id
                        }))}
                        showSearch
                        {...selectFilterProps}
                    />
                </Form.Item>
            </Col>

            <Col xs={24} xl={12}>
                <Form.Item
                    name="registrationAfterDate"
                    label="Registration After Date"
                    dependencies={["registrationBeforeDate"]}
                    rules={[
                        validateDateRange(
                            "registrationBeforeDate",
                            "Registration After Date cannot be later than Registration Before Date"
                        )
                    ]}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                        disabledDate={getDisabledDateAfter("registrationBeforeDate")}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
                <Form.Item
                    name="registrationBeforeDate"
                    label="Registration Before Date"
                    dependencies={["registrationAfterDate"]}
                    rules={[
                        validateDateRange(
                            "registrationAfterDate",
                            "Registration Before Date cannot be earlier than Registration After Date"
                        )
                    ]}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                        disabledDate={getDisabledDateBefore("registrationAfterDate")}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
                <Form.Item
                    name="lastLoginAfterDate"
                    label="Last Login After Date"
                    dependencies={["lastLoginBeforeDate"]}
                    rules={[
                        validateDateRange(
                            "lastLoginBeforeDate",
                            "Last Login After Date cannot be later than Last Login Before Date"
                        )
                    ]}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                        disabledDate={getDisabledDateAfter("lastLoginBeforeDate")}
                    />
                </Form.Item>
            </Col>
            <Col xs={24} xl={12}>
                <Form.Item
                    name="lastLoginBeforeDate"
                    label="Last Login Before Date"
                    dependencies={["lastLoginAfterDate"]}
                    rules={[
                        validateDateRange(
                            "lastLoginAfterDate",
                            "Last Login Before Date cannot be earlier than Last Login After Date"
                        )
                    ]}>
                    <DatePicker
                        style={{ width: "100%" }}
                        format="YYYY-MM-DD"
                        disabledDate={getDisabledDateBefore("lastLoginAfterDate")}
                    />
                </Form.Item>
            </Col>
        </Row>
    );
}
