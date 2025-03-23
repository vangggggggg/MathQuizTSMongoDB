export class ErrorHandler {
    static handleValidationErrors(validationErrors: any[]) {
        return {
            message: "Dữ liệu không hợp lệ",
            isSuccess: false,
            errors: validationErrors.reduce((acc, err) => {
                acc[err.property] = Object.values(err.constraints || {}).join(", ");
                return acc;
            }, {} as Record<string, string>),
        };
    }

    static handleSystemError(error: unknown, customMessage = "Lỗi hệ thống") {
        return {
            message: customMessage,
            isSuccess: false,
            errors: { system: (error as Error).message },
        };
    }

    static handleUserNotFound() {
        return {
            message: "Người dùng không tồn tại!",
            isSuccess: false,
        };
    }

    static handleIncorrectPassword() {
        return {
            message: "Mật khẩu không chính xác!",
            isSuccess: false,
        };
    }

    static handleDataParsingError() {
        return {
            message: "Lỗi khi xử lý dữ liệu người dùng",
            isSuccess: false,
            errors: { parsing: "Lỗi chuyển đổi dữ liệu" },
        };
    }
}
