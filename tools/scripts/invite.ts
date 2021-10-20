import { InvitationStatus } from '../../libs/api/data-transfer/src';
import { executeSqlQuery } from './execute-sql-query';

const email = process.argv.slice(2);

const sqlQuery = `INSERT INTO invitation_entity(email, status) VALUES (${email}, ${InvitationStatus.ACCEPTED})`;

executeSqlQuery(sqlQuery);
