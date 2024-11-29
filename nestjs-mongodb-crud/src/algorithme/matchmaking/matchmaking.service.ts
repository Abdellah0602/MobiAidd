import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip, TripDocument } from '../../trip/schema/trip.schema';
import * as polyline from '@mapbox/polyline';
import { spawn } from 'child_process';
import {  Logger } from '@nestjs/common';
import { UserService } from '../../user/user.service';
const path = require('path');


@Injectable()
export class MatchmakingService {
    private readonly logger = new Logger(MatchmakingService.name);

    constructor(
        @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
        private userService: UserService
    ) {}

    async findMatches(userId: string): Promise<any[]> {
        const userTrips = await this.tripModel
            .find({ userId: userId })
            .sort({ createdAt: -1 })
            .exec();

        const lastTrip = userTrips[0];
        if (!lastTrip)return [];

        let matches = [];
        const lastTripDateTime = new Date(lastTrip.details.departureDateTime);
        const potentialMatches = await this.tripModel
        .find({
                status: 'Pending',
                _id: { $ne: lastTrip._id },
                volunteerId: { $exists: true, $ne: null },
                'details.departureDateTime': {
                    $gte: new Date(lastTripDateTime.getTime() - 5 * 60000),
                    $lte: new Date(lastTripDateTime.getTime() + 5 * 60000),
                },
            })
            .exec();
        for (const potentialMatch of potentialMatches) {

            
            const path1 = polyline.decode(lastTrip.polylines[0]);
            const path2 = polyline.decode(potentialMatch.polylines[0]);
            console.log(path1, path2);
            const chevauchement = await this.executePythonScript(path2, path1);
            console.log(chevauchement);
            if (chevauchement.chevauchement >= 70) {
                matches.push({
                    trip1: lastTrip._id,
                    trip2: potentialMatch._id,
                    chevauchement: chevauchement.chevauchement,
                });
            }
        }

        // Convertir les IDs en noms d'accompagnateurs après avoir trouvé tous les matches
        const matchesWithNames = await Promise.all(matches.map(async match => {
            const volunteerId = await this.tripModel.findById(match.trip2).select('volunteerId').exec();
            const volunteer = await this.userService.getUser(volunteerId.volunteerId);
            return {
                trip1: match.trip1,
                trip2: match.trip2,
                chevauchement: match.chevauchement,
                accompagnateur: volunteer.name,
                id : volunteer._id
            };
        }));

        return matchesWithNames;
    }
      

    private executePythonScript(polyline1: string, polyline2: string): Promise<any> {
        return new Promise((resolve, reject) => {
            // Construire le chemin absolu vers le script Python
            const scriptPath = 'src/algorithme/matchmaking/compare.py';            
            // Exécuter le script Python avec les polylines en argument
            console.log(polyline1)
            const process = spawn('python3', [scriptPath, JSON.stringify(polyline1), JSON.stringify(polyline2)]);
            let result = '';
            process.stdout.on('data', (data) => {
                result += data.toString();
            });

            process.stderr.on('data', (data) => {
                this.logger.error(`stderr: ${data}`);
            });
            
            process.on('close', (code) => {
                if (code === 0) {
                    try {
                        const parsedResult = JSON.parse(result);
                        resolve(parsedResult);
                    } catch (error) {
                        this.logger.error('Failed to parse Python script output', error);
                        reject('Failed to parse Python script output');
                    }
                } else {
                    this.logger.error(`Python script exited with code ${code}`);
                    reject(`Python script exited with code ${code}`);
                }
            });
        });
    }
}
