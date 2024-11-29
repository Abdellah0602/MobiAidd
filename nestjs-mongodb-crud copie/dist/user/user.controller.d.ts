import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(response: any, createUserDto: CreateUserDto): Promise<any>;
    getTypeUser(response: any, req: any): Promise<any>;
    updateUser(response: any, userId: string, updateUserDto: UpdateUserDto): Promise<any>;
    getUsers(response: any): Promise<any>;
    getUser(response: any, userId: string): Promise<any>;
    deleteUser(response: any, userId: string): Promise<any>;
}
