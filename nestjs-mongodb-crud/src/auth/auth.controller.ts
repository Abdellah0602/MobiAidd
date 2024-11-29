import { Controller, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('Aucun utilisateur n\'est authentifié');
    }
    return this.authService.login(req.user);
  }
}