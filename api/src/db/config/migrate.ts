const Knex = require('knex');

const migrate = async () => {
    require('dotenv').config();

    const databaseName = process.env.DB

    const connection = {
        host: process.env.DB_HOST,
        port:  process.env.DB_PORT,
        user:  process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }

    let knex = Knex({
        client: 'pg',
        connection
    })

    await knex.raw('CREATE DATABASE ??', databaseName).catch((e: Error) => {
        console.log(`Error: ${e}. If database '${databaseName}' is already exists, please ignore this message...`);
    });

    knex = Knex({
        client: 'pg',
        connection: {
            ...connection,
            database: databaseName,
        }
    })

    await knex.migrate.latest({directory: './src/db/migrations/'});
}

migrate()
    .then(() => console.log('Migrated successfully!'))
    .catch(e => console.log(e))
    .finally(() => process.exit());
