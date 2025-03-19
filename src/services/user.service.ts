import { User } from "../models/user.models";
import { UserDTO } from "../dto/user.create";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

interface ResponseUser {
    message: string;
    isSuccess: boolean;
    errors?: Record<string, string>;
}

export class UserService {
    static async createUser(userDTO: UserDTO): Promise<ResponseUser> {
        try {
            // Validate dữ liệu từ DTO
            const userInstance = plainToInstance(UserDTO, userDTO);
            const validationErrors = await validate(userInstance);

            if (validationErrors.length > 0) {
                return {
                    message: "Dữ liệu không hợp lệ",
                    isSuccess: false,
                    errors: validationErrors.reduce((acc, err) => {
                        acc[err.property] = Object.values(err.constraints || {}).join(", ");
                        return acc;
                    }, {} as Record<string, string>),
                };
            }

            // Chuyển đổi dữ liệu từ DTO sang User
            const newUser = new User();
            const errors: Record<string, string> = {};

            try {
                newUser.username = userDTO.username;
                newUser.password = userDTO.password;
                newUser.email = userDTO.email;
                newUser.fullName = userDTO.fullName;
                newUser.dateOfBirth = new Date(userDTO.dateOfBirth);
                newUser.phoneNumber = userDTO.phoneNumber;
            } catch (error) {
                errors["parsing"] = "Lỗi dữ liệu User";
            }

            if (Object.keys(errors).length > 0) {
                return {
                    message: "Lỗi khi xử lý dữ liệu người dùng",
                    isSuccess: false,
                    errors,
                };
            }

            // Lưu vào database
            await newUser.save();

            return {
                message: "Tạo người dùng thành công!",
                isSuccess: true,
            };
        } catch (error) {
            return {
                message: "Lỗi hệ thống khi tạo người dùng",
                isSuccess: false,
                errors: { system: (error as Error).message },
            };
        }
    }
}
