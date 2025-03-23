import { Request, Response } from "express";
import { IUser, User } from "../models/user.models";
import { UserDTO } from "../dto/user.create";
import { UserService } from "../services/user.service";
import { UserRequest } from "../dto/user.request";
import { ResponseUser } from "../dto/user.reponse";

export class UserController {
    // Lấy danh sách người dùng
    static getUsers = async (req: Request, res: Response) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng" });
        }
    };

    // Thêm người dùng mới
    static createUser = async (req: Request, res: Response) => {
        try {
            const userDTO: UserDTO = req.body;
            const response: ResponseUser = await UserService.createUser(userDTO);
            if (response.isSuccess) {
                res.status(201).json(response);
            } else {
                res.status(400).json(response);
            }
        } catch (error) {
            const err = error as Error;
            console.error(error); // Log lỗi ra console
            res.status(400).json({ error: err.message || "Lỗi khi tạo người dùng" });
        }
    };

    static loginUser = async (req: Request, res: Response) => {
        try {
            const userRequest: UserRequest = req.body;
            const response: ResponseUser = await UserService.loginUser(userRequest);
            if (response.isSuccess) {
                res.status(200).json(response);
            } else {
                res.status(400).json(response);
            }
        } catch (error) {
            const err = error as Error;
            console.error(error); // Log lỗi ra console
            res.status(400).json({ error: err.message || "Lỗi khi người dùng đăng nhập" });
        }
    };
}
