
exports.up = function(knex) {
    return knex.schema.createTable('clients', (table) => {
        table.increments('client_id').primary();
        table.string('client_name').notNullable().defaultTo('');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('clients');
};
