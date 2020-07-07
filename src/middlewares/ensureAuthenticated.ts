import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, '8934dcd5a5788b9c6c951ca6cfbad335');

    const { sub } = decoded as TokenPayLoad;

    request.user = {
      id: sub,
    };
    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token!', 401);
  }
}
