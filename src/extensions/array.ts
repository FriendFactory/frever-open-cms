export {};

declare global {
    interface Array<T> {
        groupBy<TGroupKey>(this: T[], groupKey: KeySelector<T, TGroupKey>): Array<{ key: TGroupKey; items: T[] }>;

        groupReduce<TGroupKey, TResult>(
            this: T[],
            groupKey: KeySelector<T, TGroupKey>,
            reducer: (arr: T[], groupKey?: TGroupKey, groupIndex?: number) => TResult
        ): TResult[];

        hashReduce<TResult>(
            this: T[],
            hashKey: KeySelector<T, string>,
            reducer: (arr: T[], groupKey?: string, groupIndex?: number) => TResult
        ): { [hashKey: string]: TResult };

        toHash<TResult = T>(
            this: T[],
            keySelector: KeySelector<T, string>,
            valueSelector?: KeySelector<T, TResult>
        ): { [key: string]: TResult[] };

        orderBy(this: T[], ...sortKeySelector: SorterSelector<T, any>[]): T[];

        mapPairs<TResult>(
            this: T[],
            selector: (
                elem: T,
                prevElem?: T | undefined,
                nextElem?: T | undefined,
                index?: number,
                arr?: T[]
            ) => TResult
        ): TResult[];

        /**
         * Adds up all values returned by valueSelector for each element in array.
         * If there is no elements in array the default result will be returned.
         */
        sum<TResult extends number | null = number | null>(
            valueSelector: KeySelector<T, number>,
            defaultResult?: TResult
        ): TResult;

        /**
         * Calculates an average of all values returned by valueSelector for each element in array.
         * If there is no elements in array the default result will be returned.
         */
        avg<TResult extends number | null = number | null>(
            valueSelector: KeySelector<T, number>,
            defaultResult?: TResult
        ): TResult;

        /**
         * Return minimal from all values returned by valueSelector for each element in array.
         * If there is no elements in array the default result will be returned.
         */
        min<TResult, TDefaultValue extends TResult | undefined = TResult | undefined>(
            valueSelector: KeySelector<T, TResult>,
            defaultResult?: TDefaultValue
        ): TDefaultValue;

        /**
         * Return maximal from all values returned by valueSelector for each element in array.
         * If there is no elements in array the default result will be returned.
         */
        max<TResult, TDefaultValue extends TResult | null | undefined = TResult | null>(
            valueSelector: KeySelector<T, TResult>,
            defaultResult?: TDefaultValue
        ): TDefaultValue;
    }

    type KeySelector<TElement, TKey> = (elem: TElement, index?: number, array?: TElement[]) => TKey;

    type SorterSelector<TElement, TKey> =
        | KeySelector<TElement, TKey>
        | { keySelector: KeySelector<TElement, TKey>; direction: "asc" | "desc" };
}

if (!Array.prototype.groupBy) {
    Array.prototype.groupBy = function <T, TGroupKey>(
        this: T[],
        getGroupKey: (elem: T, index?: number, array?: T[]) => TGroupKey
    ): Array<{ key: TGroupKey; items: T[] }> {
        const items = this.map((elem, index, arr) => ({
            element: elem,
            groupKey: getGroupKey(elem, index, arr)
        })).orderBy((e) => e.groupKey);

        const result: Array<{ key: TGroupKey; items: T[] }> = [];

        let groupContent: T[] = [];
        let groupKey: TGroupKey | undefined = undefined;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (i === 0) {
                groupKey = item.groupKey;
            }

            if (groupKey !== item.groupKey) {
                result.push({
                    key: groupKey!,
                    items: groupContent
                });
                groupContent = [];
                groupKey = item.groupKey;
            }

            groupContent.push(item.element);
        }

        if (groupContent.length) {
            result.push({ key: groupKey!, items: groupContent });
        }

        return result;
    };
}

if (!Array.prototype.groupReduce) {
    Array.prototype.groupReduce = function <T, TGroupKey, TResult>(
        this: T[],
        groupKey: KeySelector<T, TGroupKey>,
        reducer: (arr: T[], groupKey?: TGroupKey, groupIndex?: number) => TResult
    ): TResult[] {
        return this.groupBy(groupKey).map((e, index) => reducer(e.items, e.key, index));
    };
}

if (!Array.prototype.hashReduce) {
    Array.prototype.hashReduce = function <T, TResult>(
        this: T[],
        hashKey: KeySelector<T, string>,
        reducer: (arr: T[], groupKey?: string, groupIndex?: number) => TResult
    ): { [hashKey: string]: TResult } {
        return this.groupBy(hashKey)

            .map((e, index) => ({ key: e.key, result: reducer(e.items, e.key, index) }))
            .reduce((result, item) => {
                result[item.key] = item.result;
                return result;
            }, {} as any);
    };
}

if (!Array.prototype.toHash) {
    Array.prototype.toHash = function <T, TResult = T>(
        this: T[],
        keySelector: (elem: T, index?: number, array?: T[]) => string,
        valueSelector?: KeySelector<T, TResult>
    ): { [key: string]: TResult[] } {
        const vs = valueSelector || ((e: T) => (e as never) as TResult);

        return this.reduce((result, currentElement, currentIndex, arr) => {
            const key = keySelector(currentElement, currentIndex, arr);

            let items: TResult[] = (result as any)[key];
            if (!items) {
                items = [];
                (result as any)[key] = items;
            }

            items.push(vs(currentElement, currentIndex, arr));

            return result;
        }, {});
    };
}

if (!Array.prototype.orderBy) {
    Array.prototype.orderBy = function (this: any[], ...sortKeySelector: SorterSelector<any, any>[]): any[] {
        const selectors = sortKeySelector.map((k) => {
            if (typeof k === "function") {
                return {
                    keySelector: k,
                    direction: "asc"
                };
            }

            return k;
        });

        const arr = this.map((element, index, array) => ({
            element,
            sortKeys: selectors.map((s) => s.keySelector(element, index, array))
        }));

        arr.sort((a, b) => {
            for (let i = 0; i < selectors.length; i++) {
                const aKey = a.sortKeys[i];
                const bKey = b.sortKeys[i];
                const direction = selectors[i].direction;

                const coeff = direction === "asc" ? 1 : -1;

                if (aKey > bKey) {
                    return 1 * coeff;
                }
                if (bKey > aKey) {
                    return -1 * coeff;
                }
            }

            return 0;
        });

        return arr.map((i) => i.element);
    };
}

if (!Array.prototype.mapPairs) {
    Array.prototype.mapPairs = function <T, TResult>(
        this: T[],
        selector: (elem: T, prevElem: T | undefined, nextElem: T | undefined, index: number, arr: T[]) => TResult
    ): TResult[] {
        return this.map((item, index, arr) => {
            const prev = arr[index - 1];
            const next = arr[index + 1];
            return selector(item, prev, next, index, arr);
        });
    };
}

if (!Array.prototype.sum) {
    Array.prototype.sum = function sum<TElement, TResult extends number | null = number | null>(
        this: TElement[],
        valueSelector: KeySelector<TElement, number>,
        defaultResult: TResult = null as any
    ): TResult {
        if (!this.length) {
            return defaultResult;
        }

        return this.reduce((sum, item, currentIndex, arr) => {
            const currValue = valueSelector(item, currentIndex, arr);
            return sum + currValue;
        }, 0) as any;
    };
}

if (!Array.prototype.avg) {
    Array.prototype.avg = function avg<TElement, TResult extends number | null = number | null>(
        this: TElement[],
        valueSelector: KeySelector<TElement, number>,
        defaultResult: TResult = null as any
    ): TResult {
        if (!this.length) {
            return defaultResult;
        }

        return (this.sum(valueSelector, 0) / this.length) as any;
    };
}

if (!Array.prototype.min) {
    Array.prototype.min = function min<
        TElement,
        TResult,
        TDefaultValue extends TResult | undefined = TResult | undefined
    >(this: TElement[], valueSelector: KeySelector<TElement, TResult>, defaultResult?: TDefaultValue): TDefaultValue {
        if (!this.length) {
            return defaultResult as any;
        }

        return this.reduce<TDefaultValue>(
            (min: TDefaultValue, item: TElement, index: number, arr: TElement[]): TDefaultValue => {
                const value = valueSelector(item, index, arr);
                if (index === 0) {
                    return value as any;
                }

                return (min! < value ? min : value) as any;
            },
            null as any
        );
    } as any;
}

if (!Array.prototype.max) {
    Array.prototype.max = function max<
        TElement,
        TResult,
        TDefaultValue extends TResult | undefined = TResult | undefined
    >(this: TElement[], valueSelector: KeySelector<TElement, TResult>, defaultResult?: TDefaultValue): TDefaultValue {
        if (!this.length) {
            return defaultResult as any;
        }

        return this.reduce<TDefaultValue>(
            (max: TDefaultValue, item: TElement, index: number, arr: TElement[]): TDefaultValue => {
                const value = valueSelector(item, index, arr);
                if (index === 0) {
                    return value as any;
                }

                return (max! > value ? max : value) as any;
            },
            null as any
        );
    } as any;
}
