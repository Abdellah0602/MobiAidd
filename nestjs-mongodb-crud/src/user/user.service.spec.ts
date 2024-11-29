import { UserService } from './user.service';
const bcrypt = require('bcrypt');
import { Model, Document, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { IUser } from '../interface/user.interface'; // Adjust the path as necessary
import { CreateUserDto } from '../dto/create-user.dto'; // Adjust the path as necessary
import { UpdateUserDto } from '../dto/update-user.dto'; // Import UpdateUserDto

describe('UserService', () => {
  let userService: UserService;
  let userModel: Model<IUser>;

  beforeEach(() => {
    userModel = {
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    } as any;
    userService = new UserService(userModel);
  });

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
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
      const savedUser = { 
        _id: new Types.ObjectId('507f1f77bcf86cd799439011'), 
        ...createUserDto, 
        password: 'hashedPassword' 
      };
      jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => Promise.resolve('salt' as string));
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('hashedPassword'));
      jest.spyOn(userModel, 'create').mockResolvedValue(savedUser as any);

      const result = await userService.createUser(createUserDto);

      expect(result).toEqual(savedUser);
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 'salt');
      expect(userModel.create).toHaveBeenCalled();
    });

    it('should throw an error if user creation fails', async () => {
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
      jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => Promise.resolve('salt' as string));
      jest.spyOn(userModel, 'create').mockRejectedValue(new Error('Creation failed'));
      await expect(userService.createUser(createUserDto)).rejects.toThrow('Creation failed');
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = { email: 'updated@example.com', password: 'newpassword123' };
      const updatedUser = { _id: userId, ...updateUserDto };
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(updatedUser);

      const result = await userService.updateUser(userId, updateUserDto);

      expect(result).toEqual(updatedUser);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(userId, updateUserDto, { new: true });
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '1';
      const updateUserDto: UpdateUserDto = { email: 'updated@example.com', password: 'newpassword123' };
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValue(null);

      await expect(userService.updateUser(userId, updateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [{ _id: '1', email: 'test@example.com' }];
      jest.spyOn(userModel, 'find').mockResolvedValue(users);

      const result = await userService.getAllUsers();

      expect(result).toEqual(users);
      expect(userModel.find).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no users found', async () => {
      jest.spyOn(userModel, 'find').mockResolvedValue([]);

      await expect(userService.getAllUsers()).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUser', () => {
    it('should return a user by ID', async () => {
      const userId = '1';
      const user = { _id: userId, email: 'test@example.com' };
      jest.spyOn(userModel, 'findById').mockResolvedValue(user);

      const result = await userService.getUser(userId);

      expect(result).toEqual(user);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '1';
      jest.spyOn(userModel, 'findById').mockResolvedValue(null);

      await expect(userService.getUser(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by ID', async () => {
      const userId = '1';
      const deletedUser = { _id: userId, email: 'test@example.com' };
      jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue(deletedUser);

      const result = await userService.deleteUser(userId);

      expect(result).toEqual(deletedUser);
      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user not found', async () => {
      const userId = '1';
      jest.spyOn(userModel, 'findByIdAndDelete').mockResolvedValue(null);

      await expect(userService.deleteUser(userId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      const email = 'test@example.com';
      const user = { _id: '1', email };
      jest.spyOn(userModel, 'findOne').mockResolvedValue(user);

      const result = await userService.findByEmail(email);

      expect(result).toEqual(user);
      expect(userModel.findOne).toHaveBeenCalledWith({ email });
    });

    it('should throw NotFoundException if user not found by email', async () => {
      const email = 'test@example.com';
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);

      await expect(userService.findByEmail(email)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUserTypeById', () => {
    it('should return user type by ID', async () => {
      const userId = '1';
      const user = { 
        _id: userId, 
        typeUser: { 
          role: 'helper',
          mobilityNeeds: 'none',
          preferences: 'none'
        } 
      };
      jest.spyOn(userModel, 'findById').mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(user)
      } as any));

      const result = await userService.getUserTypeById(userId);

      expect(result).toBe('helper');
      expect(userModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should return undefined if user not found by ID', async () => {
      const userId = '1';
      jest.spyOn(userModel, 'findById').mockImplementation(() => ({
        select: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null)
      } as any));

      const result = await userService.getUserTypeById(userId);
      expect(result).toBeUndefined();
    });
  });
});