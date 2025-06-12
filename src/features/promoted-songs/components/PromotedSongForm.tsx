import React, { useState } from "react";
import { Alert, Button, Form, FormProps, Input, InputNumber, Space, Switch } from "antd";

import { PromotedSong } from "../services";
import { ImageSelect } from "./ImageSelect";
import { SelectSongDropdownContainer } from "../containers/SelectSongDropdownContainer";
import { SelectMarketingCountries } from "shared";
import { MarketingCountries } from "../containers/SelectSongModalContainer";

export type PromotedSongFormValues = Partial<PromotedSong> & {
    file?: File;
    songName?: string;
    songCountries?: MarketingCountries;
};

const SuccessMessage = { type: "success", message: "Selected Song is available in banner market" } as const;
const ErrorMessage = {
    type: "error",
    message: "Error. Selected Song is not available in all the banner markets."
} as const;
type MarketMessage = typeof SuccessMessage | typeof ErrorMessage;

export interface PromotedSongFormProps extends FormProps {
    initialValues?: PromotedSongFormValues;
    stage: string;
}

export const PromotedSongForm = ({ stage, ...formProps }: PromotedSongFormProps) => {
    const [marketMessage, setMarketMessage] = useState<MarketMessage | null>(null);
    const form = formProps.form!;

    const validateMarkets = () => {
        const validateMarkets = checkSongAvailabilityInBannerMarket(
            form.getFieldValue("availableForCountries"),
            form.getFieldValue("songCountries")
        );

        if (validateMarkets) setMarketMessage(SuccessMessage);
        else setMarketMessage(ErrorMessage);
    };

    return (
        <Form layout="vertical" {...formProps}>
            <Form.Item label="Image" shouldUpdate>
                {({ setFieldValue, getFieldValue, validateFields }) => {
                    const fileValue = getFieldValue("file");
                    const handleOnChange = (value: File) => {
                        setFieldValue("file", value);
                        validateFields();
                    };

                    return (
                        <>
                            <Form.Item name="file" noStyle>
                                <div></div>
                            </Form.Item>
                            <ImageSelect value={fileValue} onChange={handleOnChange} />
                        </>
                    );
                }}
            </Form.Item>

            <Form.Item name="availableForCountries" label="Marketing countries/areas">
                <SelectMarketingCountries onChange={validateMarkets} />
            </Form.Item>

            <Form.Item label="Song" shouldUpdate>
                {({ setFieldValue, getFieldValue }) => {
                    const name = getFieldValue("name");

                    return (
                        <>
                            <Form.Item name="songId" noStyle>
                                <div></div>
                            </Form.Item>

                            <Form.Item name="externalSongId" noStyle>
                                <div></div>
                            </Form.Item>

                            <Form.Item name="songCountries" noStyle>
                                <div></div>
                            </Form.Item>

                            {name && (
                                <>
                                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                                        <Input value={name} />
                                        {(getFieldValue("songId") || getFieldValue("externalSongId")) &&
                                        marketMessage ? (
                                            <Alert {...marketMessage} showIcon />
                                        ) : null}
                                    </Space>
                                    <br />
                                    <br />
                                </>
                            )}

                            <Form.Item>
                                <SelectSongDropdownContainer
                                    stage={stage}
                                    children={
                                        <Button ghost type="primary">
                                            {name ? "Change" : "Select"}
                                        </Button>
                                    }
                                    onSelect={(type, id, name, songCountries) => {
                                        setFieldValue("songCountries", songCountries);
                                        setFieldValue("name", name);
                                        setFieldValue(type, id);
                                        validateMarkets();
                                    }}
                                />
                            </Form.Item>
                        </>
                    );
                }}
            </Form.Item>

            <Form.Item label="Sort Order" name="sortOrder">
                <InputNumber controls={false} />
            </Form.Item>

            <Form.Item label="Is Enabled" name="isEnabled" valuePropName="checked">
                <Switch />
            </Form.Item>
        </Form>
    );
};

export const checkSongAvailabilityInBannerMarket = (bannerCountries?: string[], songCountries?: MarketingCountries) => {
    if (!bannerCountries || bannerCountries.length === 0) return true;
    if (songCountries?.asset === "Song" && songCountries.marketingCountries.length === 0) return true;

    const includesCountry = (country: string) => bannerCountries.includes(country);

    return songCountries?.asset === "Song"
        ? songCountries.marketingCountries?.some(includesCountry)
        : !songCountries?.marketingCountries?.some(includesCountry);
};
