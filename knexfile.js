module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgresql://localhost:5432/dev'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgresql://localhost:5432/dev',
    connection: {
      user: 'root',
      password: process.env.DATABASE_PASSWORD,
      database: 'dev'
    }
  }
};
