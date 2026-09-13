exports.up = function (knex) {
  return knex.schema.createTable("sites", (table) => {
    table.string("id", 36).primary(); // UUID string
    table.string("name", 255).notNullable();
    table.string("url", 500).notNullable();
    table.string("username", 255).notNullable();
    table.string("app_password", 255);
    table.string("status", 50).defaultTo("connected");
    table.timestamps(true, true); // created_at, updated_at, auto-set
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sites");
};