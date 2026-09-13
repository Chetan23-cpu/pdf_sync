exports.up = function (knex) {
  return knex.schema.alterTable("sites", (table) => {
    table.string("hostinger_wp_id");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("sites", (table) => {
    table.dropColumn("hostinger_wp_id");
  });
};