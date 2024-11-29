import { IsNotEmpty, IsString, MaxLength, IsEmail, IsPhoneNumber, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import * as bcrypt from 'bcrypt';



class TypeUserDto {
    @ApiProperty({ example: 'helper' })
    @IsString()
    role: 'helper' | 'handicap';

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    mobilityNeeds?: string;

    @ApiProperty()
    @IsString()
    preferences: string;

}

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    readonly location: string;

 
    @ApiProperty({ type: TypeUserDto })
    @ValidateNested()
    @Type(() => TypeUserDto)
    typeUser: TypeUserDto;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsPhoneNumber('FR', { message: 'Invalid phone number' })
    readonly phone: string;

    @ApiProperty()
    readonly profilePicture: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
      }
}
