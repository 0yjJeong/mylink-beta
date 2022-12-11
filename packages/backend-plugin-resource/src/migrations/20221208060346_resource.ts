import knex, { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema
    .createTable('lists', (table) => {
      table.increments('id').comment('Auto-increment number of the list');
      table.string('title').notNullable().comment('The title of list');
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .comment('The created date of list');
    })
    .createTable('list_lists', (table) => {
      table.increments('id').comment('Auto-increment number of the list-lists');
      table.increments('list_source_id', { primaryKey: false }).unsigned();
      table
        .foreign('list_source_id')
        .references('id')
        .inTable('lists')
        .onDelete('CASCADE');
      table.increments('list_target_id', { primaryKey: false }).unsigned();
      table.foreign('list_target_id').references('id').inTable('lists');
    })
    .createTable('links', (table) => {
      table.increments('id').comment('Auto-increment number of the link');
      table.increments('list_id', { primaryKey: false }).unsigned();
      table
        .foreign('list_id')
        .references('id')
        .inTable('lists')
        .onDelete('CASCADE');
      table.string('name').comment('The name of link');
      table.string('url').comment('The url of link');
      table.text('description').comment('The description of link');
      table
        .timestamp('created_at')
        .defaultTo(knex.fn.now())
        .comment('The created date of link');
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('lists').dropTable('links');
}
