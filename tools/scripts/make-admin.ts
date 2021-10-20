import { executeSqlQuery } from './execute-sql-query';

const email = process.argv.slice(2);

const sqlQuery = `UPDATE user_entity SET "isAdmin" = "true" WHERE email = "${email}";`;

executeSqlQuery(sqlQuery);
