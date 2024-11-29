import { Document } from 'mongoose';
declare class Departure {
    latitude: string;
    longitude: string;
}
declare class Destination {
    latitude: string;
    longitude: string;
}
declare class Review {
    note: string;
    comment?: string;
}
declare class Details {
    note: string;
    comment?: string;
    departure: Departure;
    destination: Destination;
    preferences: string;
    departureDateTime: Date;
}
export declare class Trip extends Document {
    userId: string;
    volunteerId?: string;
    details: Details;
    status: string;
    reviews?: Review;
    polylines: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const TripSchema: import("mongoose").Schema<Trip, import("mongoose").Model<Trip, any, any, any, Document<unknown, any, Trip> & Trip & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Trip, Document<unknown, {}, import("mongoose").FlatRecord<Trip>> & import("mongoose").FlatRecord<Trip> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export type TripDocument = Trip & Document;
export {};
