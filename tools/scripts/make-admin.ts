import { executeSqlQuery } from './execute-sql-query';

const [email] = process.argv.slice(2);

if (!email) {
  console.log('Usage: yarn run make-admin <email>');
  process.exit(255);
}

const sqlQuery = `UPDATE user_entity SET "isAdmin" = 'true' WHERE email = '${email}';`;

executeSqlQuery(sqlQuery);
