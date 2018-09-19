
exports.up = function(knex) {
    return knex.schema.createTable('contracts', (table) => {
        table.increments('contract_id').primary();
        table.integer('contract_client_id');
        table.foreign('contract_client_id').onDelete('CASCADE').references('client_id').inTable('clients');
        table.integer('contract_target_id').defaultTo(null);
        table.foreign('contract_target_id').onDelete('CASCADE').references('target_id').inTable('targets');
        table.decimal('budget', 5).notNullable().defaultTo(0);
        table.boolean('completed').notNullable().defaultTo(false);
        table.integer('completed_by').defaultTo(null);
        table.foreign('completed_by').onDelete('CASCADE').references('assassin_id').inTable('assassins');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('contracts');
};
