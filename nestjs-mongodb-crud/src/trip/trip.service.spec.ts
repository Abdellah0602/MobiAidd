import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';
import { of } from 'rxjs';
import { Model } from 'mongoose';
import { ITrip } from '../interface/trip.interface';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';

const mockTrip = {
    _id: '1',
    userId: 'user1',
    volunteerId: 'volunteer1',
    details: {
        departure: { latitude: '0', longitude: '0' },
        destination: { latitude: '1', longitude: '1' },
        departureDateTime: new Date(),
        note: '',
        preferences: '',
        polylines: '',
    },
    status: 'pending',
    reviews: [],
    polylines: 'polyline',
};

const mockTripModel = {
    new: jest.fn().mockResolvedValue(mockTrip),
    save: jest.fn().mockResolvedValue(mockTrip),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockTrip),
    find: jest.fn().mockResolvedValue([mockTrip]),
    findById: jest.fn().mockResolvedValue(mockTrip),
    findByIdAndDelete: jest.fn().mockResolvedValue(mockTrip),
};

const mockHttpService = {
    get: jest.fn().mockReturnValue(of({ data: { status: 'OK', routes: [{ overview_polyline: { points: 'polyline' } }] } })),
};

const mockUserService = {
    getUserTypeById: jest.fn().mockResolvedValue('handicap'),
};

describe('TripService', () => {
    let service: TripService;
    let model: Model<ITrip>;
    let httpService: HttpService;
    let userService: UserService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TripService,
                { provide: getModelToken('Trip'), useValue: mockTripModel },
                { provide: HttpService, useValue: mockHttpService },
                { provide: UserService, useValue: mockUserService },
            ],
        }).compile();

        service = module.get<TripService>(TripService);
        model = module.get<Model<ITrip>>(getModelToken('Trip'));
        httpService = module.get<HttpService>(HttpService);
        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createTrip', () => {
        it('should create a trip', async () => {
            const createTripDto: CreateTripDto = {
                userId: 'user1',
                volunteerId: 'volunteer1',
                details: {
                    departure: { latitude: '0', longitude: '0' },
                    destination: { latitude: '1', longitude: '1' },
                    departureDateTime: new Date(),
                    note: '',
                    preferences: '',
                    polylines: '',
                },
                status: 'pending',
                reviews: [],
            };
            const result = await service.createTrip('user1', createTripDto);
            expect(result).toEqual(mockTrip);
            expect(userService.getUserTypeById).toHaveBeenCalledWith('user1');
            expect(httpService.get).toHaveBeenCalled();
            expect(model.create).toHaveBeenCalled();
            expect(model.create).toHaveBeenCalled();
        });
    });

    describe('updateTrip', () => {
        it('should update a trip', async () => {
            const updateTripDto: UpdateTripDto = { status: 'completed' };
            const result = await service.updateTrip('1', updateTripDto);
            expect(result).toEqual(mockTrip);
            expect(model.findByIdAndUpdate).toHaveBeenCalledWith('1', updateTripDto, { new: true });
        });

        it('should throw NotFoundException if trip not found', async () => {
            jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValueOnce(null);
            await expect(service.updateTrip('1', {})).rejects.toThrow(NotFoundException);
        });
    });

    describe('getAllTrips', () => {
        it('should return all trips', async () => {
            const result = await service.getAllTrips();
            expect(result).toEqual([mockTrip]);
            expect(model.find).toHaveBeenCalled();
        });

        it('should throw NotFoundException if no trips found', async () => {
            jest.spyOn(model, 'find').mockResolvedValueOnce([]);
            await expect(service.getAllTrips()).rejects.toThrow(NotFoundException);
        });
    });

    describe('getTrip', () => {
        it('should return a trip', async () => {
            const result = await service.getTrip('1');
            expect(result).toEqual(mockTrip);
            expect(model.findById).toHaveBeenCalledWith('1');
        });

        it('should throw NotFoundException if trip not found', async () => {
            jest.spyOn(model, 'findById').mockResolvedValueOnce(null);
            await expect(service.getTrip('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('deleteTrip', () => {
        it('should delete a trip', async () => {
            const result = await service.deleteTrip('1');
            expect(result).toEqual(mockTrip);
            expect(model.findByIdAndDelete).toHaveBeenCalledWith('1');
        });

        it('should throw NotFoundException if trip not found', async () => {
            jest.spyOn(model, 'findByIdAndDelete').mockResolvedValueOnce(null);
            await expect(service.deleteTrip('1')).rejects.toThrow(NotFoundException);
        });
    });

    describe('getDirections', () => {
        it('should return directions', async () => {
            const departure = { latitude: '0', longitude: '0' };
            const destination = { latitude: '1', longitude: '1' };
            const result = await service.getDirections(departure, destination);
            expect(result).toEqual({ stepsPolylinePoints: 'polyline' });
            expect(httpService.get).toHaveBeenCalled();
        });
    });
});