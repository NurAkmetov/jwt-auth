import {NextFunction, Request, Response} from "express";
import {UserService} from '../services/userService';

const userService: UserService = require('../services/userService');

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
      //      console.log(userData)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {

        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }

    async activate(req: Request, res: Response, next: NextFunction) {
        try {

        } catch (e) {

        }
    }

    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(['123', '322']);
        } catch (e) {

        }
    }
}

module.exports = new UserController();