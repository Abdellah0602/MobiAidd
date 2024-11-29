import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { MatchmakingService } from './matchmaking.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('matchmaking')
export class MatchmakingController {
  constructor(private readonly matchmakingService: MatchmakingService) {}

  @Get('/find-matches')
  @UseGuards(AuthGuard('jwt'))
  async findMatches(@Res() response: Response, @Req() req: any) {
    const userId = req.user.userId;
    try {
      const matchesWithNames = await this.matchmakingService.findMatches(userId);
      console.log(matchesWithNames)
      response.status(200).json(matchesWithNames); // Utilisez directement matchesWithNames ici
    } catch (error) {
      response.status(500).json({ message: 'Une erreur est survenue lors de la recherche des correspondances.', error: error.toString() });
    }
  }
 
}
