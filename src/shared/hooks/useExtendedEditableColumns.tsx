import React from "react";
import { Tag } from "antd";
import dayjs from "dayjs";
import { DefaultOptionType } from "antd/es/select";

import { EditableTableV2Column } from "shared/components/EditableTableV2/EditableTableV2";
import { CommonExtraDataType, ExtraDataName, UserLevel, useExtraDataBundle, Country } from "shared";

export type ExtendedEditableColumn<T = any> = Pick<
    EditableTableV2Column<T>,
    "title" | "editableCellProps" | "align" | "fixed" | "validation" | "render" | "sorter"
> & {
    dataIndex: keyof T extends string ? keyof T : never;
    width: number;
    extraDataName?: ExtraDataName;
    localSortByExtraData?: boolean;
    isBoolean?: boolean;
    isDate?: boolean;
};

export function useExtendedEditableColumns<T = any>(baseColumns: ExtendedEditableColumn<T>[]) {
    const extraDataNames = baseColumns.map((el) => el.extraDataName!).filter(Boolean);
    const { loading, bundle } = useExtraDataBundle(extraDataNames);

    const getExtraDataName = (extraDataName: ExtraDataName, valueId: T[string & keyof T]) =>
        bundle[extraDataName]?.data?.find((el) => el.id === valueId)?.name;

    const getExtraCountryDataName = (isoName: T[string & keyof T]) =>
        bundle["Country"]?.data?.find((el) => el.isoName === isoName)?.displayName;

    const columns = baseColumns.map((col: ExtendedEditableColumn<T>): EditableTableV2Column<T> => {
        const {
            extraDataName,
            localSortByExtraData,
            sorter: sourceSorter,
            dataIndex,
            isDate,
            isBoolean,
            editableCellProps: sourceEditableCellProps
        } = col;

        if (extraDataName) {
            const extraData = bundle[extraDataName]?.data;

            const sorter = localSortByExtraData
                ? (a: T, b: T) => {
                      const valueA = getExtraDataName(extraDataName, a[dataIndex]) ?? "";
                      const valueB = getExtraDataName(extraDataName, b[dataIndex]) ?? "";
                      return valueA.localeCompare(valueB);
                  }
                : sourceSorter;

            const editableCellProps =
                sourceEditableCellProps?.type !== "select"
                    ? sourceEditableCellProps
                    : {
                          ...sourceEditableCellProps,
                          options:
                              col.extraDataName === "UserLevel"
                                  ? createLevelOptions(extraData as UserLevel[])
                                  : col.extraDataName === "Country"
                                  ? createCountryOptions(extraData as Country[])
                                  : createOptions(extraData)
                      };

            return {
                render: (_, record) => {
                    const value = record[dataIndex];

                    if (Array.isArray(value)) {
                        if (extraDataName === "Country")
                            return value?.map((isoName) => <Tag key={isoName}>{getExtraCountryDataName(isoName)}</Tag>);

                        return value?.map((el) => <Tag>{getExtraDataName(extraDataName, el)}</Tag>);
                    }

                    return getExtraDataName(extraDataName, value);
                },
                ...col,
                sorter,
                editableCellProps
            };
        }

        if (isBoolean) {
            return {
                render: (_, record) => (record[dataIndex] ? "True" : "False"),
                ...col
            };
        }

        if (isDate) {
            return {
                render: (_, record) => {
                    const value = record[dataIndex];
                    return typeof value === "string" ? dayjs.utc(value).format("DD MMM YYYY  HH:mm:ss") : "<null>";
                },
                ...col
            };
        }

        return { render: (_, record) => record[dataIndex] ?? "<null>", ...col };
    });

    return { columns, loading };
}

const createOptions = (data?: CommonExtraDataType[]): DefaultOptionType[] | undefined =>
    data?.map((el) => ({ label: el.name, value: el.id }));

const createLevelOptions = (data?: UserLevel[]): DefaultOptionType[] | undefined =>
    data?.map((el) => ({ label: el.name, value: el.level }));

const createCountryOptions = (data?: Country[]): DefaultOptionType[] | undefined => {
    if (data === null) return [];
    return data?.map((el) => ({ label: el.displayName, value: el.isoName }));
};
