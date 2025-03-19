import { Request, Response } from "express";
import { User } from "../models/user.models";
import { UserDTO } from "../dto/user.create";
import { UserService } from "../services/user.service";

// Lấy danh sách người dùng
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Lỗi khi lấy danh sách người dùng" });
    }
};

// Thêm người dùng mới
export const createUser = async (req: Request, res: Response) => {
    try {
        const userDTO: UserDTO = req.body;
        const response = await UserService.createUser(userDTO);
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
