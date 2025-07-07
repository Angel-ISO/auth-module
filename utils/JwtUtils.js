import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const ISSUER = process.env.JWT_ISSUER || 'Jwt-Back';
const SECRET = process.env.JWT_SECRET || (process.env.SECRET);
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30m';

export const generateToken = (user) => {
    const payload = {
        sub: user.username,
        userId: user._id.toString(),
        authorities: user.role,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000),
        jti: uuidv4(),
    };

    const options = {
        issuer: ISSUER,
        expiresIn: EXPIRES_IN,
    };

    return jwt.sign(payload, SECRET, options);
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET, {
            issuer: ISSUER
        });
    } catch (err) {
        throw new Error('Token invalid or expired');
    }
};
