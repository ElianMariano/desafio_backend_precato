import {Knex} from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('message_flow', table => {
        table.increments('id').primary();
        table.string('template_name').notNullable();
        table.date('position').notNullable();
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('message_flow');
}