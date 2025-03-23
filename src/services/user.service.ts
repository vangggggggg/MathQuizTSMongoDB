import { IUser, User } from "../models/user.models";
import { UserDTO } from "../dto/user.create";
import { UserRequest } from "../dto/user.request"
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";

const userRepository = new UserRepository();

interface ResponseUser {
    message: string;
    isSuccess: boolean;
    errors?: Record<string, string>;
}

export class UserService {
    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    static async loginUser(userRequest: UserRequest): Promise<ResponseUser> {
        try {
            // 🔹 1. Validate dữ liệu đầu vào
            const userInstance = plainToInstance(UserRequest, userRequest);
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
            try {
                const user: IUser | null = await userRepository.findUserByUsername(userRequest.username);

                if (!user) {
                    return {
                        message: "Người dùng không tồn tại!",
                        isSuccess: false,
                    };
                }

                const isPasswordValid = await this.comparePassword(userRequest.password, user.password);
                if (!isPasswordValid) {
                    return {
                        message: "Mật khẩu không chính xác!",
                        isSuccess: false,
                    };
                }

                // Nếu qua được cả 2 bước kiểm tra, tức là đăng nhập thành công
                return {
                    message: "Đăng nhập người dùng thành công!",
                    isSuccess: true,
                };

            } catch (error) {
                return {
                    message: "Lỗi khi xử lý dữ liệu người dùng",
                    isSuccess: false,
                    errors: { parsing: "Lỗi chuyển đổi dữ liệu" },
                };
            }
        } catch (error) {
            return {
                message: "Lỗi hệ thống khi tạo người dùng",
                isSuccess: false,
                errors: { system: (error as Error).message },
            };
        }
    }

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
                newUser.password = await this.hashPassword(userDTO.password);
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
            await userRepository.createUser(newUser);

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
