import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

class Departure {
  @Prop({ required: true })
  latitude: string;

  @Prop({ required: true })
  longitude: string;
}

class Destination {
  @Prop({ required: true })
  latitude: string;

  @Prop({ required: true })
  longitude: string;
}

class Review {
  @Prop({ required: true })
  note: string;

  @Prop({ required: false })
  comment?: string;
}

class Details {
  @Prop({ required: true })
  note: string;

  @Prop({ required: false })
  comment?: string;

  @Prop({ required: true, type: Departure })
  departure: Departure;

  @Prop({ required: true, type: Destination })
  destination: Destination;

  @Prop({ required: true })
  preferences: string;

  @Prop({ required: true })
  departureDateTime: Date;
}

@Schema()
export class Trip extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: false })
  volunteerId?: string;

  @Prop({ required: true, type: Details })
  details: Details;

  @Prop({ required: true })
  status: string;

  @Prop({ required: false, type: Review })
  reviews?: Review;

  @Prop({ type: [String], default: [] })
  polylines: string[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
export type TripDocument = Trip & Document;
