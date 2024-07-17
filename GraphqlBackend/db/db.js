import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '1412',
    database: 'Graphql',
  },
});

const checkConnection = async () => {
  try {
    await db.raw('SELECT 1');
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to PostgreSQL database:', error);
    process.exit(1);
  }
};

export default db;
export { checkConnection };