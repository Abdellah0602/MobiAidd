import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { AuthGuard } from '@nestjs/passport';
import { HttpStatus } from '@nestjs/common';

describe('TripController', () => {
    let controller: TripController;
    let service: TripService;

    const mockTripService = {
        createTrip: jest.fn(),
        updateTrip: jest.fn(),
        getAllTrips: jest.fn(),
        getTrip: jest.fn(),
        deleteTrip: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TripController],
            providers: [
                {
                    provide: TripService,
                    useValue: mockTripService,
                },
            ],
        })
            .overrideGuard(AuthGuard('jwt'))
            .useValue({ canActivate: jest.fn(() => true) })
            .compile();

        controller = module.get<TripController>(TripController);
        service = module.get<TripService>(TripService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('createTrip', () => {
        it('should create a new trip', async () => {
            const createTripDto: CreateTripDto = { 
                userId: 'userid',
            
                volunteerId: 'volunteerid',
            
                details: {
            
                    departure: { latitude: '48.8566', longitude: '2.3522' },
            
                    destination: { latitude: '45.7640', longitude: '4.8357' },
            
                    departureDateTime: new Date(),
            
                    note: 'test note',
            
                    preferences: 'test preferences',
            
                    polylines: ['test_polyline']
            
                },
            
                status: 'pending',
            
                reviews: []
            };
            const req = { user: { userId: 'userId' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            mockTripService.createTrip.mockResolvedValue('newTrip');

            await controller.createTrip(res, req, createTripDto);

            expect(mockTripService.createTrip).toHaveBeenCalledWith('userId', { ...createTripDto, userId: 'userId' });
            expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Trip has been created successfully',
                newTrip: 'newTrip',
            });
        });
    });

    describe('updateTrip', () => {
        it('should update an existing trip', async () => {
            const updateTripDto: UpdateTripDto = { /* your DTO properties */ };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            mockTripService.updateTrip.mockResolvedValue('existingTrip');

            await controller.updateTrip(res, 'tripId', updateTripDto);

            expect(mockTripService.updateTrip).toHaveBeenCalledWith('tripId', updateTripDto);
            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Trip has been successfully updated',
                existingTrip: 'existingTrip',
            });
        });
    });

    describe('getTrips', () => {
        it('should return all trips', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            mockTripService.getAllTrips.mockResolvedValue('tripData');

            await controller.getTrips(res);

            expect(mockTripService.getAllTrips).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({
                message: 'All trips data found successfully',
                tripData: 'tripData',
            });
        });
    });

    describe('getTrip', () => {
        it('should return a single trip', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            mockTripService.getTrip.mockResolvedValue('existingTrip');

            await controller.getTrip(res, 'tripId');

            expect(mockTripService.getTrip).toHaveBeenCalledWith('tripId');
            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Trip found successfully',
                existingTrip: 'existingTrip',
            });
        });
    });

    describe('deleteTrip', () => {
        it('should delete a trip', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            mockTripService.deleteTrip.mockResolvedValue('deletedTrip');

            await controller.deleteTrip(res, 'tripId');

            expect(mockTripService.deleteTrip).toHaveBeenCalledWith('tripId');
            expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Trip deleted successfully',
                deletedTrip: 'deletedTrip',
            });
        });
    });
});