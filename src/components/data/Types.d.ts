export type QueryMap = { [key: string]: string[] };
export type RequestParams = { endpoint: string; queries?: QueryMap };
export type I = HTMLInputElement;
export type E = HTMLElement;
export type CartItem = { id: number; amount: number; productPrice: number };
export type DiscountItem = { key: string; name: string; percent: number };
