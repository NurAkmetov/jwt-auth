import {User} from '../models/user';
import {hash, compare} from 'bcryptjs';
import {UserDto} from '../models/userDto';

const uuid = require('uuid');
const db = require('../db/config/db');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const ApiError = require('../exceptions/apiError');

export class UserService {
    async registration(email: string, password: string) {
        const candidate: User = await db('users')
            .where('email', email)
            .select('id', 'email').first();

        if (candidate) {
            throw ApiError.BadRequest(`User with the same email: ${email} is already exists`);
        }

        const hashedPassword = await hash(password, 3);
        const activationLink: string = uuid.v4();

        const userId: number = await db('users')
            .insert({email, password: hashedPassword, activationLink}, 'id')
            .then((ids: { id: number }[]) => ids[0].id);

        const user: { id: number, isActivated: string, email: string } =
            await db('users')
                .where('id', '=', userId)
                .select('id', 'isActivated', 'email').first();

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const tokens: { accessToken: string, refreshToken: string } = tokenService.generateTokens({...user});
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {...tokens, user}
    }

    async activate(activationLink: string) {
        const user: User = await db('users')
            .where('activationLink', '=', activationLink)
            .select('id', 'email')
            .first();

        if (!user) {
            throw ApiError.BadRequest('Activation link is incorrect');
        }

        await db('users').update({isActivated: true}).where('id', '=', user.id);
    }

    async login(email: string, password: string) {
        const user: User = await db('users')
            .where('email', '=', email)
            .select('id', 'email', 'password', 'isActivated')
            .first();

        if (!user) {
            throw ApiError.BadRequest(`User with email ${email} not found`);
        }

        const isPassEquals = await compare(password, user.password);

        if (!isPassEquals) {
            throw ApiError.BadRequest('Wrong password');
        }

        const userDto = new UserDto(user);
        const tokens: { accessToken: string, refreshToken: string } = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }

    async logout(refreshToken: string) {
        const token: string = await tokenService.removeToken(refreshToken);

        return token;
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userData: User = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || typeof(tokenFromDb) === 'undefined') {
            throw ApiError.UnauthorizedError();
        }

        const user: { id: number, isActivated: string, email: string } =
            await db('users')
                .where('id', '=', userData.id)
                .select('id', 'isActivated', 'email').first();

        const tokens: { accessToken: string, refreshToken: string } = tokenService.generateTokens({...user});
        await tokenService.saveToken(user.id, tokens.refreshToken);

        return {...tokens, user}
    }

    async getAllUsers() {
        const users: User[] = await db('users').select('id', 'email', 'isActivated');

        return users;
    }
}

module.exports = new UserService();
