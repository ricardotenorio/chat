import jwt from 'jsonwebtoken';
require('dotenv').config();

export function createToken(params = {}): string {
  return jwt.sign({params}, <string>process.env.TOKEN_KEY);
}
