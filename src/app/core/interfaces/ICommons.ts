export interface IResponseGeneric<T> {
    success: boolean;
    message: string;
    data: T;
    errors: string[];
    totalCount: number
}