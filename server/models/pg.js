const { Pool } = require("pg");
const { pgsql: pgConf } = require("../configs/db");
const pool = new Pool(pgConf);

module.exports = { pool };
