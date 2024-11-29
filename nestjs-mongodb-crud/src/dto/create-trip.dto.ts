import { IsArray, IsDate, IsDateString, IsObject, IsOptional, IsString, ValidateNested} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DepartureDto {
  @ApiProperty()
  @IsString()
  latitude: string;

  @ApiProperty()
  @IsString()
  longitude: string;

}
class DestinationDto {
  @ApiProperty()
  @IsString()
  latitude: string;

  @ApiProperty()
  @IsString()
  longitude: string;

}

class DetailsDto {
    @ApiProperty()
    @IsString()
    note: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    comment?: string;

    @ApiProperty({ type: DepartureDto })
    @ValidateNested()
    @Type(() => DepartureDto)
    departure: DepartureDto;

    @ApiProperty({ type: DestinationDto })
    @ValidateNested()
    @Type(() => DestinationDto)
    destination: DestinationDto;

    @ApiProperty()
    @IsString()
    preferences: string;
    
    polylines: any;

    @ApiProperty({ example: '2023-04-05T14:00:00.000Z', description: 'Departure date and time' })
    @IsDate()
    departureDateTime: Date;

}

export class CreateTripDto {
    @ApiProperty()
     userId: string;

    @ApiProperty()
    readonly volunteerId: string;

    @ApiProperty({
        type: String,
        isArray: true,
        description: 'Array of polyline strings',
        required: false,
      })
      @IsOptional()
      @IsArray()
      @IsString({ each: true })
      polylines?: string[];

    @ApiProperty({ type: DetailsDto })
    @ValidateNested()
    @Type(() => DetailsDto)
    details: DetailsDto;

    @ApiProperty()
    readonly status: string;

    @ApiProperty()
    @IsObject()
    readonly reviews: object;
}