import { IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTripDto {
    @ApiProperty({ required: false })
    @IsObject()
    userId?: string;

    @ApiProperty({ required: false })
    @IsObject()
    readonly volunteerId?: string;

    @ApiProperty({ required: false })
    @IsObject()
    readonly details?: object;

    @ApiProperty({ required: false })
    @IsString()
    readonly status?: string;

    @ApiProperty({ required: false })
    @IsObject()
    readonly reviews?: object;
}
