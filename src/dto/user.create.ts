import { 
    IsString, 
    IsEmail, 
    IsDate, 
    Matches, 
    Length 
} from "class-validator";
import { Type, Transform } from "class-transformer";

export class UserDTO {
    @IsString()
    @Length(3, 20, { message: "Tên người dùng phải có từ 3 đến 20 ký tự" })
    username: string;

    @IsString()
    @Length(8, 100, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    password: string;

    @IsEmail({}, { message: "Email không hợp lệ" })
    email: string;

    @IsString()
    fullName: string;

    @Transform(({ value }) => {
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date; 
    })
    @IsDate({ message: "Ngày sinh không hợp lệ" }) 
    dateOfBirth: Date;

    @Matches(/^[0-9]{10,11}$/, { message: "Số điện thoại không hợp lệ" })
    phoneNumber: string;
}

