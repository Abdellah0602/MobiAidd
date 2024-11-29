import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { HttpStatus } from '@nestjs/common';

describe('UserController', () => {
    let controller: UserController;
    let service: UserService;

    const mockUserService = {
        createUser: jest.fn(),
        getUserTypeById: jest.fn(),
        updateUser: jest.fn(),
        getAllUsers: jest.fn(),
        getUser: jest.fn(),
        deleteUser: jest.fn(),
    };

    const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: UserService,
                    useValue: mockUserService,
                },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        service = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createUser', () => {
        it('should create a user successfully', async () => {
            const createUserDto: CreateUserDto = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                typeUser: {
                  role: "handicap",
                  mobilityNeeds: "none",
                  preferences: "silent"
                },
                phone: '1234567890',
                location: "Paris, France",
                profilePicture: '',
                validatePassword: (password: string): Promise<boolean> => {
                  return Promise.resolve(true);
                }
              };
            const newUser = { id: '1', ...createUserDto };
            
            mockUserService.createUser.mockResolvedValue(newUser);

            await controller.createUser(mockResponse, createUserDto);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User has been created successfully',
                newUser,
            });
        });
    });

    describe('getTypeUser', () => {
        it('should return user type', async () => {
            const userId = '1';
            const mockReq = { user: { userId } };
            const userType = { type: 'admin' };

            mockUserService.getUserTypeById.mockResolvedValue(userType);

            await controller.getTypeUser(mockResponse, mockReq);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User found successfully',
                userType,
            });
        });
    });

    describe('updateUser', () => {
        it('should update user successfully', async () => {
            const userId = '1';
            const updateUserDto: UpdateUserDto = { email: 'updated@example.com', password: 'newpassword123' };
            const updatedUser = { id: userId, ...updateUserDto };

            mockUserService.updateUser.mockResolvedValue(updatedUser);

            await controller.updateUser(mockResponse, userId, updateUserDto);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User has been successfully updated',
                existingUser: updatedUser,
            });
        });
    });

    describe('getUsers', () => {
        it('should return all users', async () => {
            const users = [{ id: '1', name: 'Test User' }];
            
            mockUserService.getAllUsers.mockResolvedValue(users);

            await controller.getUsers(mockResponse);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'All users data found successfully',
                userData: users,
            });
        });
    });

    describe('getUser', () => {
        it('should return a single user', async () => {
            const userId = '1';
            const user = { id: userId, name: 'Test User' };

            mockUserService.getUser.mockResolvedValue(user);

            await controller.getUser(mockResponse, userId);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User found successfully',
                existingUser: user,
            });
        });
    });

    describe('deleteUser', () => {
        it('should delete user successfully', async () => {
            const userId = '1';
            const deletedUser = { id: userId, name: 'Test User' };

            mockUserService.deleteUser.mockResolvedValue(deletedUser);

            await controller.deleteUser(mockResponse, userId);

            expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'User deleted successfully',
                deletedUser,
            });
        });
    });
});