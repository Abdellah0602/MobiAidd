import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { MessageService } from '../message/message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // Créer un message (utilisateur connecté)
  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async createMessage(
    @Res() response,
    @Req() req: any,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const userId = req.user.userId;
    try {
      console.log('Début de la route POST createMessage');
      
      const messageData: CreateMessageDto = { ...createMessageDto, sender: userId };
      
      const newMessage = await this.messageService.createMessage(userId, messageData);
      
      console.log('Message créé avec succès:', newMessage);

      return response.status(HttpStatus.CREATED).json({
        message: 'Message has been created successfully',
        newMessage,
      });
    } catch (err) {
      console.error('Erreur lors de la création du message:', err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Message not created!',
        error: 'Bad Request',
      });
    }
  }

  // Mise à jour d'un message (uniquement par l'expéditeur)
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateMessage(
    @Res() response,
    @Req() req: any,
    @Param('id') messageId: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    const userId = req.user.userId; // Récupérer l'utilisateur depuis le token
    try {
      const updatedMessage = await this.messageService.updateMessage(userId, messageId, updateMessageDto);
      return response.status(HttpStatus.OK).json({
        message: 'Message has been successfully updated',
        updatedMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // Récupérer tous les messages
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getMessages(@Res() response,
  @Req() req: any
  ) {
    const userId = req.user.userId; // Récupérer l'utilisateur depuis le token

    try {
      const messagesData = await this.messageService.getAllMessages(userId);
      return response.status(HttpStatus.OK).json({
        message: 'All messages data found successfully',
        messagesData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // Récupérer un message spécifique
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getMessage(@Res() response, @Param('id') messageId: string,   @Req() req: any
  ) {
    const userId = req.user.userId; // Récupérer l'utilisateur depuis le token

    try {
      const existingMessage = await this.messageService.getMessageById(userId,messageId);
      return response.status(HttpStatus.OK).json({
        message: 'Message found successfully',
        existingMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  // Supprimer un message (uniquement par l'expéditeur)
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteMessage(@Res() response, @Req() req: any, @Param('id') messageId: string) {
    const userId = req.user.userId; // Récupérer l'utilisateur depuis le token
    try {
      const deletedMessage = await this.messageService.deleteMessage(userId, messageId);
      return response.status(HttpStatus.OK).json({
        message: 'Message deleted successfully',
        deletedMessage,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/userMessage/:userId')
  @UseGuards(AuthGuard('jwt'))
  async getMessagesByUserId(
    @Res() response,
    @Param('userId') userId: string,
  ) {
    try {
      const userMessages = await this.messageService.getMessagesByUserId(userId);
      return response.status(HttpStatus.OK).json({
        message: 'Messages found successfully',
        userMessages,
      });
    } catch (err) {
      console.error('Erreur lors de la récupération des messages de l\'utilisateur:', err);
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: 404,
        message: 'Error: Messages not found!',
        error: 'Not Found',
      });
    }
  }

  @Get('users/last-message')
  @UseGuards(AuthGuard('jwt'))
  async getUsersWithLastMessage(@Req() req: any, @Res() response) {
    const userId = req.user.userId;
  
    if (!userId) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Utilisateur non authentifié.',
      });
    }
  
    try {
      // Appel au service pour récupérer tous les messages de l'utilisateur
      const messages = await this.messageService.getMessagesByUserId(userId);
  
      // Si aucun message n'est trouvé
      if (!messages || messages.length === 0) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'Aucun message trouvé pour cet utilisateur.',
        });
      }
  
      // Créer un tableau des utilisateurs avec leur dernier message
      const usersWithLastMessage = [];
  
      // Utiliser un objet pour suivre les derniers messages pour chaque utilisateur
      const usersMap = new Map<string, any>();
  
      // Parcourir tous les messages
      for (const message of messages) {
        const otherUserId = message.sender === userId ? message.recipient : message.sender;
  
        if (!usersMap.has(otherUserId)) {
          usersMap.set(otherUserId, {
            userId: otherUserId,
            lastMessage: message,
          });
        } else {
          // Si l'utilisateur existe déjà, on garde le dernier message basé sur la date
          const currentLastMessage = usersMap.get(otherUserId).lastMessage;
          if (message.createdAt > currentLastMessage.createdAt) {
            usersMap.set(otherUserId, {
              userId: otherUserId,
              lastMessage: message,
            });
          }
        }
      }
  
      // Convertir le Map en tableau
      const usersArray = Array.from(usersMap.values());
  
      // Trier par la date du dernier message
      usersArray.sort((a, b) => b.lastMessage.createdAt - a.lastMessage.createdAt);
  
      return response.status(HttpStatus.OK).json({
        message: 'Utilisateurs récupérés avec succès.',
        data: usersArray,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Une erreur est survenue lors de la récupération des utilisateurs.',
      });
    }
  }
  
  

}
