import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import mongoose from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto'; 
import { UpdateUserDto } from '../dto/update-user.dto'; 
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      console.log('Début de la route POST createUser');
      
      const newUser = await this.userService.createUser(createUserDto);
  
      console.log('Utilisateur créé avec succès:', newUser);

      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      console.error('Erreur dans la route POST createUser:', err);
  
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('/type')
  @UseGuards(AuthGuard('jwt'))
  async getTypeUser(@Res() response, @Req() req: any) {
    const userId = req.user.userId;
    try {
      const existingUser = await this.userService.getUserTypeById(userId);
      if (!existingUser) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'User not found',
        });
      }
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        userType: existingUser,
      });
    } catch (err) {
      console.log("je suis dedans")
      return response.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.response || 'Unexpected error occurred',
      });
    }
  }
  
  

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.userService.updateUser(userId, updateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  

  @Get()
  async getUsers(@Res() response) {
    try {
      const userData = await this.userService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await this.userService.getUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
