import { IsString, MaxLength, IsEmail, IsPhoneNumber, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ required: false }) // Indique que ce champ n'est pas obligatoire dans le DTO
    @IsString()
    @MaxLength(30)
    readonly name?: string;

    @ApiProperty({ required: false })
    @IsString()
    readonly location?: string;

    @ApiProperty({ required: false })
    @IsObject()
    readonly typeUser?: object;

    @ApiProperty({ required: false })
    @IsEmail()
    readonly email?: string;

    @ApiProperty({ required: false })
    @IsPhoneNumber('FR', { message: 'Invalid phone number' }) // Utilisez le code de pays approprié
    readonly phone?: string;

    @ApiProperty({ required: false })
    readonly profilePicture?: string;
    
    @ApiProperty({ required: false })
    @IsString()
    readonly password: string;
}
