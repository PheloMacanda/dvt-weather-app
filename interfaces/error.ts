export interface IError {
    message: string;
    stack?: string;
    [key: string]: any;
};