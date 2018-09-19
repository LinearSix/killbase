
exports.up = function(knex) {
    return knex.schema.createTable('targets', (table) => {
        table.increments('target_id').primary();
        table.string('target_name').notNullable().defaultTo('');
        table.string('location').notNullable().defaultTo('');
        table.string('target_photo');
        table.integer('security').notNullable().defaultTo(0);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('targets');
};
