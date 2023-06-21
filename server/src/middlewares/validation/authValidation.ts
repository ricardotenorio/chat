import jwt, {JwtPayload} from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
const config = process.env;

export interface AuthRequest extends Request {
  token?: string | JwtPayload;
}

export const verifyToken = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | NextFunction | undefined> => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(403).json({message: 'authentication required'});

  const parts = authHeader.split(' ');

  if (parts.length !== 2)
    return response.status(401).json({message: 'invalid authentication'});

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return response.status(401).json({message: 'invalid token'});

  jwt.verify(token, <string>config.TOKEN_KEY, (error, decoded) => {
    if (error) return response.sendStatus(401);

    (request as AuthRequest).token = decoded;

    return next();
  });

  return;
};
