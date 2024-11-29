import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { response } from 'express';
import { CreateTripDto } from '../dto/create-trip.dto'; 
import { UpdateTripDto } from '../dto/update-trip.dto'; 
import { TripService } from '../trip/trip.service'; 

@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}


  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async createTrip(
    @Res() response,
    @Req() req: any, // Utilisez @Req pour injecter l'objet Request
    @Body() createTripDto: CreateTripDto,
  ) {
    const userId = req.user.userId;
    try {
      console.log('Début de la route POST createTrip');
    
      // Ajouter userId au DTO
      const tripData: CreateTripDto = { ...createTripDto, userId };
    
      const newTrip = await this.tripService.createTrip(userId, tripData);
    
      console.log('Le trajet a été créé avec succès:', newTrip);
    
      return response.status(HttpStatus.CREATED).json({
        message: 'Trip has been created successfully',
        newTrip,
      });
    } catch (err) {
      console.error('Erreur dans la route POST createTrip:', err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Trip not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateTrip(
    @Res() response,
    @Param('id') tripId: string,
    @Body() updateTripDto: UpdateTripDto,
  ) {
    try {
      const existingTrip = await this.tripService.updateTrip(tripId, updateTripDto);
      return response.status(HttpStatus.OK).json({
        message: 'Trip has been successfully updated',
        existingTrip,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  

  @Get()
  async getTrips(@Res() response) {
    try {
      const tripData = await this.tripService.getAllTrips();
      return response.status(HttpStatus.OK).json({
        message: 'All trips data found successfully',
        tripData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getTrip(@Res() response, @Param('id') tripId: string) {
    try {
      const existingTrip = await this.tripService.getTrip(tripId);
      return response.status(HttpStatus.OK).json({
        message: 'Trip found successfully',
        existingTrip,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteTrip(@Res() response, @Param('id') tripId: string) {
    try {
      const deletedTrip = await this.tripService.deleteTrip(tripId);
      return response.status(HttpStatus.OK).json({
        message: 'Trip deleted successfully',
        deletedTrip,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
