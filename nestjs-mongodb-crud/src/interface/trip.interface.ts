import { Document } from 'mongoose';

interface Departure {
  latitude: string;
  longitude: string;
}

interface Destination {
  latitude: string;
  longitude: string;
}

interface Review {
  note: string;
  comment?: string;
}

interface Details {
  note: string;
  comment?: string;
  departure: Departure;
  destination: Destination;
  preferences: string;
  departureDateTime: Date;
}

export interface ITrip extends Document {
  userId: string;
  volunteerId?: string;
  details: Details;
  status: string;
  reviews?: Review;
  polylines: string[];
}
