import { ITrip } from './trip.interface';

describe('ITrip Interface', () => {
    it('should have required properties', () => {
        const trip: ITrip = {
            userId: 'user123',
            details: {
                note: 'Trip note',
                departure: {
                    latitude: '40.7128',
                    longitude: '-74.0060',
                },
                destination: {
                    latitude: '34.0522',
                    longitude: '-118.2437',
                },
                preferences: 'No preferences',
                departureDateTime: new Date(),
            },
            status: 'active',
            polylines: ['polyline1', 'polyline2'],
        } as ITrip;

        expect(trip.userId).toBe('user123');
        expect(trip.details.note).toBe('Trip note');
        expect(trip.details.departure.latitude).toBe('40.7128');
        expect(trip.details.departure.longitude).toBe('-74.0060');
        expect(trip.details.destination.latitude).toBe('34.0522');
        expect(trip.details.destination.longitude).toBe('-118.2437');
        expect(trip.details.preferences).toBe('No preferences');
        expect(trip.status).toBe('active');
        expect(trip.polylines).toEqual(['polyline1', 'polyline2']);
    });

    it('should allow optional properties', () => {
        const trip: ITrip = {
            userId: 'user123',
            volunteerId: 'volunteer456',
            details: {
                note: 'Trip note',
                comment: 'Trip comment',
                departure: {
                    latitude: '40.7128',
                    longitude: '-74.0060',
                },
                destination: {
                    latitude: '34.0522',
                    longitude: '-118.2437',
                },
                preferences: 'No preferences',
                departureDateTime: new Date(),
            },
            status: 'active',
            reviews: {
                note: '5 stars',
                comment: 'Great trip',
            },
            polylines: ['polyline1', 'polyline2'],
        } as ITrip;

        expect(trip.volunteerId).toBe('volunteer456');
        expect(trip.details.comment).toBe('Trip comment');
        expect(trip.reviews.note).toBe('5 stars');
        expect(trip.reviews.comment).toBe('Great trip');
    });
});