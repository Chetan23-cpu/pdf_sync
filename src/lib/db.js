const knex = require("knex");
const knexConfig = require("../../knexfile");

const globalForKnex = globalThis;

const db = globalForKnex.db || knex(knexConfig.development);

if (process.env.NODE_ENV !== "production") {
  globalForKnex.db = db;
}

module.exports = db;