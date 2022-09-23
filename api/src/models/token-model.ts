import { Knex } from 'knex';

export interface Token {
    userId: number;
    refreshToken: string;
    created_at: string;
    updated_at: string;
}
