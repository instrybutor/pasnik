import { InvitationStatus } from '../../libs/api/data-transfer/src';
import { executeSqlQuery } from './execute-sql-query';

const [email] = process.argv.slice(2);

if (!email) {
  console.log('Usage: npm run approve-user <email>');
  process.exit(255);
}

const sqlQuery = `
INSERT INTO
    invitation_entity (email, status)
VALUES
    ('${email}', '${InvitationStatus.APPROVED}')
ON CONFLICT (email) DO UPDATE
    SET status = '${InvitationStatus.APPROVED}';
`;

executeSqlQuery(sqlQuery);
