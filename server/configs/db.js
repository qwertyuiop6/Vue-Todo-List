module.exports = {
  pgsql: {
    host: "postgres",
    port: 5432,
    database: "todos",
    user: "postgres",
    password: "postgres"
  },
  redis: {
    port: 6379,
    host: "redis",
    family: 4,
    db: "0",
    password: "redis_default_passwd"
  }
};
