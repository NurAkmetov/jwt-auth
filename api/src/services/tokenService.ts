require('dotenv').config();
import {Token} from "../models/token";
import {User} from "../models/user";
const jwt = require('jsonwebtoken');
const db = require('../db/config/db');

class TokenService<T> {
    generateTokens(payload: T) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData: User = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

            return  userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData: User = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

            return  userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData: Token = await db('tokens')
            .where('userId', '=', userId)
            .select('userId')
            .first();

        if (tokenData) {
            await db('tokens').update({refreshToken}).where('userId', '=', userId);
        } else {
            await db('tokens').insert({userId, refreshToken});
        }
    }

    async removeToken(refreshToken: string) {
        const token: Token = await db('tokens').delete("*").where('refreshToken', '=', refreshToken);

        return token;
    }

    async findToken(refreshToken: string) {
        const token: Token = await db('tokens')
            .where('refreshToken', '=', refreshToken)
            .select('userId', 'refreshToken').first();

        return token;
    }
}

module.exports = new TokenService();
