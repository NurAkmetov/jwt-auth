import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTableIfNotExists('users',  (table) => {
            table.increments('id').primary();
            table.string('email').unique();
            table.string('password');
            table.boolean('isActivated').defaultTo(false);
            table.string('activationLink');

            table.timestamps(true, true);
        })

        .createTableIfNotExists('tokens', (table) => {
            table.integer('userId').unsigned();
            table.foreign('userId').references('users.id');
            table.string('refreshToken');
        })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('users')
        .dropTable('tokens');
}
