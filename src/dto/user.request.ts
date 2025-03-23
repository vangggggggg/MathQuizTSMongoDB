import { 
    IsString, 
    Length 
} from "class-validator";

export class UserRequest {
    @IsString()
    @Length(3, 20, { message: "Tên người dùng phải có từ 3 đến 20 ký tự" })
    username: string;

    @IsString()
    @Length(8, 100, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    password: string;
}