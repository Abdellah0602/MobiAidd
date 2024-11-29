import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from '../interface/message.interface';
import { CreateMessageDto } from '../dto/create-message.dto';
import { UpdateMessageDto } from '../dto/update-message.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<IMessage>,
  ) {}

  // Création d'un message avec le userId extrait du token
  async createMessage(userId: string, createMessageDto: CreateMessageDto): Promise<IMessage> {
    try {
      // Crée un nouvel objet message en associant l'expéditeur avec le userId du token
      const messageToCreate = {
        sender: userId,
        recipient: createMessageDto.recipient,
        content: createMessageDto.content,
        status: createMessageDto.status || 'sent',
      };

      const newMessage = new this.messageModel(messageToCreate);
      const savedMessage = await newMessage.save();
      return savedMessage;
    } catch (error) {
      console.error('Erreur lors de la création du message:', error);
      throw error;
    }
  }

  // Récupération de tous les messages pour un utilisateur donné (par son userId)
  async getAllMessages(userId: string): Promise<IMessage[]> {
    try {
      const messages = await this.messageModel.find({
        $or: [{ sender: userId }, { recipient: userId }],
      });

      if (!messages || messages.length === 0) {
        throw new NotFoundException('Aucun message trouvé pour cet utilisateur.');
      }

      return messages as IMessage[];
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
      throw error;
    }
  }

  // Récupération d'un message spécifique par ID pour s'assurer qu'il appartient bien à l'utilisateur
  async getMessageById(userId: string, messageId: string): Promise<IMessage> {
    try {
      const message = await this.messageModel.findById(messageId);

      if (!message) {
        throw new NotFoundException(`Message #${messageId} non trouvé.`);
      }

      // Vérification que l'utilisateur est soit l'expéditeur soit le destinataire
      if (message.sender !== userId && message.recipient !== userId) {
        throw new UnauthorizedException('Accès interdit à ce message.');
      }

      return message;
    } catch (error) {
      console.error('Erreur lors de la récupération du message:', error);
      throw error;
    }
  }

async updateMessage(userId: string, messageId: string, updateMessageDto: UpdateMessageDto): Promise<IMessage> {
  try {
    const existingMessage = await this.messageModel.findById(messageId).lean();

    if (!existingMessage) {
      throw new NotFoundException(`Message #${messageId} non trouvé.`);
    }

    // Vérifier que l'utilisateur est bien l'expéditeur
    if (existingMessage.sender !== userId) {
      throw new UnauthorizedException('Vous ne pouvez pas modifier ce message.');
    }

    // Mettre à jour le message et renvoyer le document mis à jour
    const updatedMessage = await this.messageModel.findByIdAndUpdate(
      messageId,
      updateMessageDto,
      { new: true }, // Suppression de lean ici
    ).exec();

    return updatedMessage;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
    throw error;
  }
}


  // Suppression d'un message (uniquement possible par l'expéditeur)
  async deleteMessage(userId: string, messageId: string): Promise<IMessage> {
    try {
      const existingMessage = await this.messageModel.findById(messageId);
  
      if (!existingMessage) {
        throw new NotFoundException(`Message #${messageId} non trouvé.`);
      }
  
      // L'utilisateur doit être l'expéditeur pour supprimer le message
      if (existingMessage.sender !== userId) {
        throw new UnauthorizedException('Vous ne pouvez pas supprimer ce message.');
      }
  
      const deletedMessage = await this.messageModel.findByIdAndDelete(messageId).lean(); // Utiliser lean()
      return deletedMessage as IMessage;
    } catch (error) {
      console.error('Erreur lors de la suppression du message:', error);
      throw error;
    }
  }

  async getMessagesByUserId(userId: string): Promise<IMessage[]> {
    try {
      const messages = await this.messageModel.find({
        $or: [{ sender: userId }, { recipient: userId }],
      }).lean();

      if (!messages || messages.length === 0) {
        throw new NotFoundException('Aucun message trouvé pour cet utilisateur.');
      }

      return messages as IMessage[];
    } catch (error) {
      console.error('Erreur lors de la récupération des messages de l\'utilisateur:', error);
      throw error;
    }
  }
}
