import {Knex} from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('subscription', table => {
        table.increments('id').primary();
        table.datetime('timestamp').notNullable();
        table.string('name').notNullable();
        table.integer('last_message').nullable();
        table.foreign('last_message').references('id').inTable('message_flow');
        table.boolean('active').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('subscription');
}