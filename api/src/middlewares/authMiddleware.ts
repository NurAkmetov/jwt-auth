import {NextFunction, Request, Response} from "express";
import {User} from "../models/user";

const tokenService = require('../services/tokenService');
const ApiError = require('../exceptions/apiError');

export interface IGetUserAuthInfoRequest extends Request {
    user: User;
}

module.exports = function (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ');
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData: User = tokenService.validateAccessToken(accessToken[accessToken.length - 1]);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}