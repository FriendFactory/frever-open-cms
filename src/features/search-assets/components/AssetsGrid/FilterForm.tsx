import React from "react";
import {
    Row,
    Col,
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Checkbox,
    SelectProps,
    FormProps,
    Radio,
    RadioChangeEvent
} from "antd";
import { Dayjs } from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

import { AssetTypes } from "config";
import { AssetListParams, ExtraFilterName } from "features/search-assets/services";
import { selectFilterProps, SelectMarketingCountries } from "shared";

const { Option } = Select;
const { RangePicker } = DatePicker;
const allowEmpty: [boolean, boolean] = [true, true];

export interface FilterFormFields extends Omit<AssetListParams, "modifiedTime" | "createdTime" | "caseSensitive"> {
    modifiedTime?: [Dayjs, Dayjs];
    createdTime?: [Dayjs, Dayjs];
    caseSensitive?: boolean;
}

export type ExtraFilter = {
    width: number;
    name: ExtraFilterName;
    options: SelectProps["options"];
    label: string;
};

export interface FilterFormProps extends FormProps<FilterFormFields> {
    assetType?: AssetTypes;
    extraFilters: ExtraFilter[];
    onChangeExtraFilter: (fieldName: string) => (value: string | string[]) => void;
}

export const FilterForm = ({ assetType, extraFilters, onChangeExtraFilter, ...formProps }: FilterFormProps) => {
    const handleChangeRadio =
        (fieldName: "hasGenderPair" | "marketingCountries" | "price" | "availableForBaking" | "bodyAnimationAndVfx") =>
        (event: RadioChangeEvent) =>
            formProps.onFinish!({ ...formProps.initialValues, [fieldName]: event.target.value });
    return (
        <Form layout="horizontal" {...formProps}>
            <Row gutter={16}>
                <Col flex="1 0 640px">
                    <Row gutter={8}>
                        <Col flex="1 0 200px">
                            <Form.Item name="searchFilter">
                                <Select>
                                    <Option value="contains">Contains</Option>
                                    <Option value="eq">Equals</Option>
                                    <Option value="startswith">Starts with</Option>
                                    <Option value="endswith">Ends with</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="1 0 290px">
                            <Form.Item name="search">
                                <Input name="search" placeholder="Input ID or Name" />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="caseSensitive" valuePropName="checked">
                                <Checkbox name="caseSensitive">Case sensitive</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>

                {assetType === "CharacterSpawnPosition" && (
                    <Col flex="360px">
                        <Form.Item name="spawnPositionGroupId" label="Spawn Pos. Group">
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                )}

                {assetType === "SetLocation" && (
                    <Col flex="360px">
                        <Form.Item name="setLocationBundle" label="Bundle">
                            <Input />
                        </Form.Item>
                    </Col>
                )}

                {assetType !== "CameraAnimationTemplate" && (
                    <>
                        <Col flex="1 0 360px">
                            <Form.Item name="createdTime" label="Created">
                                <RangePicker style={{ width: "100%" }} allowEmpty={allowEmpty} />
                            </Form.Item>
                        </Col>
                        <Col flex="1 0 360px">
                            <Form.Item name="modifiedTime" label="Modified">
                                <RangePicker style={{ width: "100%" }} allowEmpty={allowEmpty} />
                            </Form.Item>
                        </Col>
                    </>
                )}

                <Col>
                    <Form.Item>
                        <Button type="primary" ghost htmlType="submit" icon={<SearchOutlined />}>
                            Search
                        </Button>
                    </Form.Item>
                </Col>

                {extraFilters.map((el) => (
                    <Col key={el.name} flex={`1 0 ${el.width}px`}>
                        <Form.Item label={el.label} name={el.name}>
                            <Select
                                allowClear
                                mode="multiple"
                                maxTagCount="responsive"
                                options={el.options}
                                onChange={onChangeExtraFilter(el.name)}
                                optionRender={
                                    el.name === "wardrobeSubCategoryId"
                                        ? (option) => option.data.wardrobeSubCategory
                                        : undefined
                                }
                                {...selectFilterProps}
                            />
                        </Form.Item>
                    </Col>
                ))}

                {(assetType === "BodyAnimation" || assetType === "VFX") && (
                    <Col>
                        <Form.Item
                            name="bodyAnimationAndVfx"
                            label={`Bundle ${assetType === "BodyAnimation" ? "VFX" : "BodyAnimation"}`}>
                            <Radio.Group onChange={handleChangeRadio("bodyAnimationAndVfx")}>
                                <Radio.Button value={undefined}>All</Radio.Button>
                                <Radio.Button value="true">Yes</Radio.Button>
                                <Radio.Button value="false">No</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                )}
                {assetType === "Song" && (
                    <Col flex="1 0 360px">
                        <Form.Item name="marketingCountries" label="Market countries/areas">
                            <SelectMarketingCountries
                                maxTagCount="responsive"
                                onChange={onChangeExtraFilter("marketingCountries")}
                            />
                        </Form.Item>
                    </Col>
                )}
                {assetType === "Wardrobe" && (
                    <>
                        <Col>
                            <Form.Item name="hasGenderPair" label="Has Gender Pair">
                                <Radio.Group onChange={handleChangeRadio("hasGenderPair")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value="true">Yes</Radio.Button>
                                    <Radio.Button value="false">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="price" label="Price">
                                <Radio.Group onChange={handleChangeRadio("price")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value="sc">Soft</Radio.Button>
                                    <Radio.Button value="hc">Hard</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item name="availableForBaking" label="Available For Baking">
                                <Radio.Group onChange={handleChangeRadio("availableForBaking")}>
                                    <Radio.Button value={undefined}>All</Radio.Button>
                                    <Radio.Button value="true">Yes</Radio.Button>
                                    <Radio.Button value="false">No</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                    </>
                )}
            </Row>
        </Form>
    );
};
