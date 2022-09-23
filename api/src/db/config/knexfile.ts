import type { Knex } from "knex";
require('dotenv').config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      port : 5432,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB
    },
    migrations: {
      directory: './src/db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      port : 5432,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB
    },
    migrations: {
      directory: './src/db/migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      port : 5432,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB
    },
    migrations: {
      directory: './src/db/migrations'
    },
    useNullAsDefault: true
  }
};

module.exports = config;
