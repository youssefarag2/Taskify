// import * as jwt from 'jsonwebtoken';


// const JWT_SECRET = process.env.JWT_SECRET as string;
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';


// export const generateToken = (userId: string, email: string) => {

//     return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

// };

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';



export const generateToken = (userId: string, email: string): string => {
    return jwt.sign(
        { userId, email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
    );
};