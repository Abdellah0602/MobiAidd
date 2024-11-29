import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUser } from '../interface/user.interface';
import mongoose, { Model } from 'mongoose';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserSchema } from './schema/user.schema';
const bcrypt = require('bcrypt');
import { ObjectId } from 'mongodb';


@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}




  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      console.log('Début du processus de création d\'utilisateur...');

      // Hashage du mot de passe
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

      // Incorporation du mot de passe hashé dans l'objet DTO
      const userToSave = {
        ...createUserDto,
        password: hashedPassword,
      };

      // Création et enregistrement du nouvel utilisateur dans la base de données avec le mot de passe hashé
      const savedUser = await this.userModel.create(userToSave);

      console.log('Utilisateur créé avec succès:', savedUser);

      return savedUser;
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  }
  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    try {
      const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
      if (!existingUser) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return existingUser;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const userData = await this.userModel.find();
      if (!userData || userData.length === 0) {
        throw new NotFoundException('Users data not found!');
      }
      return userData;
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
    }
  }

  async getUser(userId: string): Promise<IUser> {
    try {
      const existingUser = await this.userModel.findById(userId);
      if (!existingUser) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return existingUser;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw error; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
    }
  }

  async deleteUser(userId: string): Promise<IUser> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(userId);
    
      if (!deletedUser) {
        throw new NotFoundException(`User #${userId} not found`);
      }
    
      // Transformez le document supprimé en type IUser
      return deletedUser as IUser;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error; // Vous pouvez choisir de gérer l'erreur différemment si nécessaire
    }
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found.`);
    }
    return user;
  }

  async getUserTypeById(userId: string): Promise<string | undefined> {

    const user = await this.userModel.findById(userId).select('typeUser').exec();
  
    return user?.typeUser?.role;
  
  }
}