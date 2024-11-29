import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTripDto } from '../dto/create-trip.dto';
import { ITrip } from '../interface/trip.interface';
import { Model } from 'mongoose';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';


@Injectable()
export class TripService {
  constructor(@InjectModel('Trip') private readonly tripModel: Model<ITrip>,
  private httpService: HttpService,
  private readonly userService: UserService) {}
  

  async createTrip(userId: string, createTripDto: CreateTripDto): Promise<ITrip> {
    try {
      const userType = await this.userService.getUserTypeById(userId); // Assurez-vous d'injecter UserService
  
      // Construire les objets de départ et de destination pour le calcul des itinéraires
      const departureCoordinates = {
        latitude: createTripDto.details.departure.latitude,
        longitude: createTripDto.details.departure.longitude,
      };
      const destinationCoordinates = {
        latitude: createTripDto.details.destination.latitude,
        longitude: createTripDto.details.destination.longitude,
      };
  
      // Obtenir les polylines des itinéraires entre le départ et la destination
      const directions = await this.getDirections(departureCoordinates, destinationCoordinates);
  
      // Créer l'objet de trajet avec tous les détails nécessaires
      const tripToCreate = {
        userId: userType === 'handicap' ? userId : undefined,
        volunteerId: userType === 'helper' ? userId : undefined,
        details: {
          ...createTripDto.details,
          departure: createTripDto.details.departure,
          destination: createTripDto.details.destination,
          departureDateTime: new Date(createTripDto.details.departureDateTime),
        },
        status: createTripDto.status,
        reviews: createTripDto.reviews,
        polylines: directions.stepsPolylinePoints,
      };
  
      const newTrip = new this.tripModel(tripToCreate);
      const savedTrip = await newTrip.save();
      return savedTrip;
    } catch (error) {
      console.error('Erreur lors de la création du trajet:', error);
      throw error;
    }
  }
  
  
  async updateTrip(tripId: string, updateTripDto: UpdateTripDto): Promise<ITrip> {
    try {
      const existingTrip = await this.tripModel.findByIdAndUpdate(tripId, updateTripDto, { new: true });
      if (!existingTrip) {
        throw new NotFoundException(`Trip #${tripId} not found`);
      }
      return existingTrip;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du trajet:', error);
      throw error; 
    }
  }

  async getAllTrips(): Promise<ITrip[]> {
    try {
      const tripData = await this.tripModel.find();
      if (!tripData || tripData.length === 0) {
        throw new NotFoundException('trips data not found!');
      }
      return tripData;
    } catch (error) {
      console.error('Erreur lors de la récupération des le trajets:', error);
      throw error; 
    }
  }

  async getTrip(tripId: string): Promise<ITrip> {
    try {
      const existingTrip = await this.tripModel.findById(tripId);
      if (!existingTrip) {
        throw new NotFoundException(`trip #${tripId} not found`);
      }
      return existingTrip;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'le trajet:', error);
      throw error;
    }
  }

  async deleteTrip(tripId: string): Promise<ITrip> {
    try {
      const deletedTrip = await this.tripModel.findByIdAndDelete(tripId).lean().exec();
    
      if (!deletedTrip) {
        throw new NotFoundException(`trip #${tripId} not found`);
      }
    
      // Transformez le document supprimé en type Itrip
      return deletedTrip as ITrip;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'le trajet:', error);
      throw error;
    }
  }
  async getDirections(departure: { latitude: string, longitude: string }, destination: { latitude: string, longitude: string }): Promise<any> {
    const apiKey = 'AIzaSyCWb-K2A_6LEnwCFn6quFImX9MbMMQYNhE';
    // Construire les chaînes de requête pour les paramètres d'origine et de destination à partir des objets de latitude et de longitude
    const originQueryString = `${departure.latitude},${departure.longitude}`;
    const destinationQueryString = `${destination.latitude},${destination.longitude}`;
    
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(originQueryString)}&destination=${encodeURIComponent(destinationQueryString)}&mode=transit&key=${apiKey}`;
  
    try {
      const response = await this.httpService.get(url).toPromise();
      const data = response.data;
  
      if (data.status === 'OK' && data.routes.length > 0) {
        const route = data.routes[0];
        const overview = route.overview_polyline;
        // Supposons que vous vouliez tous les points polyline des étapes
        const stepsPolylinePoints = overview.points;
        console.log(stepsPolylinePoints)
  
        return {
          stepsPolylinePoints, // Retourne un tableau de strings, chaque string étant les points de la polyline d'une étape
        };
      } else {
        throw new Error(`Google Directions API error: ${data.status}`);
      }
    } catch (error) {
      console.error('Erreur lors de la requête à l\'API Google Directions:', error);
      throw error;
    }
  }
  
}
