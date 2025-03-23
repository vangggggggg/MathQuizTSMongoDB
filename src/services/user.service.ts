import { IUser, User } from "../models/user.models";
import { UserDTO } from "../dto/user.create";
import { UserRequest } from "../dto/user.request"
import { ResponseUser } from "../dto/user.reponse";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "../repositories/user.repository";
import { ErrorHandler } from "../errors/user.error.handle";
import bcrypt from "bcryptjs";

const userRepository = new UserRepository();

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
                return ErrorHandler.handleValidationErrors(validationErrors);
            }

            try {
                const user: IUser | null = await userRepository.findUserByUsername(userRequest.username);

                if (!user) return ErrorHandler.handleUserNotFound();

                const isPasswordValid = await this.comparePassword(userRequest.password, user.password);
                if (!isPasswordValid) return ErrorHandler.handleIncorrectPassword();

                return {
                    message: "Đăng nhập người dùng thành công!",
                    isSuccess: true,
                };
            } catch (error) {
                return ErrorHandler.handleDataParsingError();
            }
        } catch (error) {
            return ErrorHandler.handleSystemError(error, "Lỗi hệ thống khi đăng nhập");
        }
    }

    static async createUser(userDTO: UserDTO): Promise<ResponseUser> {
        try {
            // 🔹 1. Validate dữ liệu đầu vào
            const userInstance = plainToInstance(UserDTO, userDTO);
            const validationErrors = await validate(userInstance);

            if (validationErrors.length > 0) {
                return ErrorHandler.handleValidationErrors(validationErrors);
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
                return ErrorHandler.handleDataParsingError();
            }

            // 🔹 3. Lưu vào database thông qua Repository
            await userRepository.createUser(newUser);

            return {
                message: "Tạo người dùng thành công!",
                isSuccess: true,
            };
        } catch (error) {
            return ErrorHandler.handleSystemError(error, "Lỗi hệ thống khi tạo người dùng");
        }
    }
}
