import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../config/env.js';

/**
 * Generate JWT Token
 */
export const generateToken = (userId) => {
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Verify JWT Token
 */
export const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};
