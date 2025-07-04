import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    const bearer = authHeader?.split(' ')[0];
    const token = authHeader?.split(' ')[1];

    if(bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({message: 'Device is unauthorized'});
    }

    try {
      req.device = this.jwtService.verify(token);

      return true;
    } catch(e) {
      throw new UnauthorizedException({message: 'Device is unauthorized'});
    }
  }
}