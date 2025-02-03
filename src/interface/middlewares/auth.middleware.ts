import jwt from "jsonwebtoken";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

export interface AuthenticatedRequest extends Request {
    user?: {
        email?: string;
        role?: string;
    }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;
        const token = authorization?.split(' ')[1];

        if (!token) return res.status(401).json({
            error: true,
            message: "token is missing"
        })

        jwt.verify(token, process.env.SECRET_KEY || "secret", (err, decoded: jwt.JwtPayload) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        error: true,
                        message: "token has expired",
                    });
                }
                return res.status(401).json({
                    error: true,
                    message: "user is not authorized",
                });
            }

            if (!decoded) return res.status(401).json({
                error: true,
                message: "invalid token payload"
            })

            req.user = decoded.user;
            next();
        })
    }
}