
exports.up = function(knex) {
    return knex.schema.createTable('contracts', (table) => {
        table.increments('contract_id').primary();
        table.integer('contract_client');
        table.foreign('contract_client').references('client_id').inTable('clients');
        table.integer('contract_target');
        table.foreign('contract_target').references('target_id').inTable('targets');
        table.decimal('budget', 5).notNullable().defaultTo(0);
        table.boolean('completed').notNullable().defaultTo(false);
        table.integer('completed_by');
        table.foreign('completed_by').references('assassin_id').inTable('assassins');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('contracts');
};
