import { User, IUser } from "../models/user.models";

export class UserRepository {
    async createUser(user: IUser): Promise<IUser> {
        return await new User(user).save();
    }

    async findUserByUsername(username: string): Promise<IUser | null> {
        return await User.findOne({ username });
    }

    async findUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }
}


