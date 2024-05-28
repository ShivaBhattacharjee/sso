export interface ErrorType {
    response?: {
        data?: {
            message?: string;
        };
    };
    message: string;
}
