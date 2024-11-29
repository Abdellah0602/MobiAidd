declare class DepartureDto {
    latitude: string;
    longitude: string;
}
declare class DestinationDto {
    latitude: string;
    longitude: string;
}
declare class DetailsDto {
    note: string;
    comment?: string;
    departure: DepartureDto;
    destination: DestinationDto;
    preferences: string;
    polylines: any;
    departureDateTime: Date;
}
export declare class CreateTripDto {
    userId: string;
    readonly volunteerId: string;
    polylines?: string[];
    details: DetailsDto;
    readonly status: string;
    readonly reviews: object;
}
export {};
