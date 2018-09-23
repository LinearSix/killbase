
exports.up = function(knex) {
    return knex.schema.createTable('ass_cont', (table) => {
        table.integer('ass_cont_assassin');
        table.foreign('ass_cont_assassin').onDelete('CASCADE').references('assassin_id').inTable('assassins');
        table.integer('ass_cont_contract');
        table.foreign('ass_cont_contract').onDelete('CASCADE').references('contract_id').inTable('contracts');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ass_cont');
};