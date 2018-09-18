
exports.up = function(knex) {
    return knex.schema.createTable('assassins', (table) => {
        table.increments('assassin_id').primary();
        table.string('assassin_name').notNullable().defaultTo('');
        table.string('weapon').notNullable().defaultTo('');
        table.integer('age');
        table.integer('price').notNullable().defaultTo(0);
        table.decimal('rating', 2, 1).notNullable().defaultTo(0);
        table.integer('kills').notNullable().defaultTo(0);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('assassins');
};