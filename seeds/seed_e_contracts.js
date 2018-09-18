exports.seed = (knex) => {
    return knex('contracts').del()
      .then(() => {
          return knex('contracts').insert([
            {
              "contract_target_id": 1,
              "contract_client_id": 1,
              "budget": 40,
              "completed": "FALSE",
              "completed_by": null
            },
            {
              "contract_target_id": 2,
              "contract_client_id": 2,
              "budget": 70,
              "completed": "FALSE",
              "completed_by": null
            },
            {
              "contract_target_id": 3,
              "contract_client_id": 3,
              "budget": 35,
              "completed": "FALSE",
              "completed_by": null
            },
            {
              "contract_target_id": 4,
              "contract_client_id": 4,
              "budget": 25,
              "completed": "FALSE",
              "completed_by": null
            },
            {
              "contract_target_id": 5,
              "contract_client_id": 5,
              "budget": 10,
              "completed": "FALSE",
              "completed_by": null
            }
          ]);
    });
}