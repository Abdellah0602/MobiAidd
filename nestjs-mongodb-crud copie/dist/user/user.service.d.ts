import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interface/user.interface';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: Model<IUser>);
    createUser(createUserDto: CreateUserDto): Promise<IUser>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser>;
    getAllUsers(): Promise<IUser[]>;
    getUser(userId: string): Promise<IUser>;
    deleteUser(userId: string): Promise<IUser>;
    findByEmail(email: string): Promise<IUser>;
    getUserTypeById(userId: string): Promise<string | undefined>;
}
