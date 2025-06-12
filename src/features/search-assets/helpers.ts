import _ from "lodash";

export const validateKeyframeJSON = (data: any): boolean => {
    if (!_.isObject(data) || !("keys" in data) || !_.isArray((data as any).keys)) {
        return false;
    }

    return (data as any).keys.every(
        (key: any) =>
            _.isNumber(key.time) &&
            _.isNumber(key.value) &&
            _.isNumber(key.inTangent) &&
            _.isNumber(key.outTangent) &&
            _.isNumber(key.tangentMode) &&
            _.isNumber(key.weightedMode) &&
            _.isNumber(key.inWeight) &&
            _.isNumber(key.outWeight)
    );
};

function trimTo6DecimalPlaces(num: any) {
    if (typeof num === "number") {
        return parseFloat(num.toFixed(6));
    }
    return num;
}

export function isEqualWithPrecision(obj1: any, obj2: any) {
    const customizer = (value1: number, value2: number) => {
        if (typeof value1 === "number" && typeof value2 === "number") {
            return trimTo6DecimalPlaces(value1) === trimTo6DecimalPlaces(value2);
        }

        return undefined;
    };

    return _.isEqualWith(obj1, obj2, customizer);
}
