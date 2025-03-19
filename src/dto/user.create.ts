import { IsString, IsEmail, IsDate, Matches } from "class-validator";
import { Type, Transform } from "class-transformer";

export class UserDTO {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsEmail()
    email: string;

    @IsString()
    fullName: string;

    @Transform(({ value }) => new Date(value)) // Chuyển string thành Date
    @IsDate({ message: "Ngày sinh không hợp lệ" }) // Kiểm tra đúng kiểu Date
    dateOfBirth: Date;

    @Matches(/^[0-9]{10,11}$/, { message: "Số điện thoại không hợp lệ" })
    phoneNumber: string;
}

export const userData = new UserDTO();
