export interface ErrorType {
    response?: {
        data?: {
            error?: string;
        };
    };
    message: string;
}
