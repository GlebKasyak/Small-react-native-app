

export type Style = {
    [key: string]: number | string
};

export type Action<T, P> = {
    type: T,
    payload: P
};