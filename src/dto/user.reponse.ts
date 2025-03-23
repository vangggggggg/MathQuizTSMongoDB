export interface ResponseUser {
    message: string;
    isSuccess: boolean;
    errors?: Record<string, string>;
}
