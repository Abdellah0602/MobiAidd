import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsEnum } from 'class-validator';

export enum MessageStatusDto {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

export class CreateMessageDto {
  @ApiProperty()
  @IsString()
  sender: string; // ID de l'utilisateur qui envoie le message

  @ApiProperty()
  @IsString()
  recipient: string; // ID de l'utilisateur destinataire du message

  @ApiProperty()
  @IsString()
  content: string; // Contenu du message

  @ApiProperty({ example: '2023-04-05T14:00:00.000Z', description: 'Date de création du message' })
  @IsDate()
  createdAt: Date; // Date de création du message

  @ApiProperty({ enum: Object.values(MessageStatusDto), default: MessageStatusDto.SENT })
  @IsEnum(MessageStatusDto)
  status: MessageStatusDto; // Statut du message (envoyé, délivré, lu, etc.)
}
