export type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;

export type ReturnTypeExt<T extends (...args: any) => any> = T extends (...args: any) => infer R
    ? UnwrapPromise<R>
    : any;
