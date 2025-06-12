import dayjs from "dayjs";

import { ODATA_DATE_FORMAT, URL_DATE_FORMAT, URL_DATE_RANGE_SEPARATOR } from "shared";

export const dateToODataFormat = (date: string) => {
    const dates = date.split(URL_DATE_RANGE_SEPARATOR).map((s) => dayjs.utc(s, URL_DATE_FORMAT));

    if (dates.every((d) => d.isValid())) {
        if (dates.length === 1) {
            dates.push(dates[0].clone().add(1, "day"));
        }

        const [start, end] = dates;

        return { start: start.format(ODATA_DATE_FORMAT), end: end.format(ODATA_DATE_FORMAT) };
    }

    return undefined;
};

export const dateToUrl = (date: [dayjs.Dayjs, dayjs.Dayjs]) =>
    date
        .filter((v) => !!v)
        .map((v) => v.format(URL_DATE_FORMAT))
        .join(URL_DATE_RANGE_SEPARATOR);

export const dateToForm = (date: string): [dayjs.Dayjs, dayjs.Dayjs] | undefined => {
    const dates = date
        .split(URL_DATE_RANGE_SEPARATOR)
        .map((v) => dayjs.utc(v, URL_DATE_FORMAT))
        .filter((m) => m.isValid());

    return dates.length ? [dates[0], dates[1]] : undefined;
};
