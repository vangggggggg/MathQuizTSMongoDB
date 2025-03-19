import { User } from "../models/user.models";
import { UserDTO } from "../dto/user.create";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "../repositories/user.repository";

interface ResponseUser {
    message: string;
    isSuccess: boolean;
    errors?: Record<string, string>;
}

export class UserService {
    static async createUser(userDTO: UserDTO): Promise<ResponseUser> {
        try {
            // 🔹 1. Validate dữ liệu đầu vào
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

            // 🔹 2. Chuyển DTO thành Entity
            const newUser = new User();
            try {
                newUser.username = userDTO.username;
                newUser.password = userDTO.password;
                newUser.email = userDTO.email;
                newUser.fullName = userDTO.fullName;
                newUser.dateOfBirth = new Date(userDTO.dateOfBirth);
                newUser.phoneNumber = userDTO.phoneNumber;
            } catch (error) {
                return {
                    message: "Lỗi khi xử lý dữ liệu người dùng",
                    isSuccess: false,
                    errors: { parsing: "Lỗi chuyển đổi dữ liệu" },
                };
            }

            // 🔹 3. Lưu vào database thông qua Repository
            await UserRepository.createUser(newUser);

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
