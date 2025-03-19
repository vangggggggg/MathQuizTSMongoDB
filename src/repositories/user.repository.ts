import { User, IUser } from "../models/user.models";

export class UserRepository {
    static async createUser(user: IUser): Promise<IUser> {
        return await new User(user).save();
    }
}
