import ITemplate from './ITemplate';
export type QueryMap = { [key: string]: string };
export type RequestPath = { endpoint: string; queries: QueryMap };
export type RoutesMap = { [key: string]: ITemplate };
