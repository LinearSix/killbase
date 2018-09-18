
exports.up = function(knex) {
    return knex.schema.createTable('code_names', (table) => {
        table.integer('code_assassin');
        table.foreign('code_assassin').references('assassin_id').inTable('assassins');
        table.string('code_name').notNullable().defaultTo('');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('code_names');
};
