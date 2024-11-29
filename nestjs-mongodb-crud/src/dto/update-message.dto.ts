import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum MessageStatusDto {
  SENT = 'sent',
  DELIVERED = 'delivered',
  READ = 'read',
}

export class UpdateMessageDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  sender?: string; // ID de l'utilisateur qui envoie le message

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  recipient?: string; // ID de l'utilisateur destinataire du message

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content?: string; // Contenu du message

  @ApiProperty({ required: false, example: '2023-04-05T14:00:00.000Z', description: 'Date de création du message' })
  @IsOptional()
  @IsString()
  createdAt?: string; // Date de création du message

  @ApiProperty({ required: false, enum: Object.values(MessageStatusDto) })
  @IsOptional()
  @IsEnum(MessageStatusDto)
  status?: MessageStatusDto; // Statut du message (envoyé, délivré, lu, etc.)
}
