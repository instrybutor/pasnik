# Paśnik

## Development

### Frontend

Run `npm start`

### Database

Run `npm run start:database`

### Backend 
Run `npm run start:api`

## Invitations
By default invitations are disabled, to enable them set env variable `ENABLE_INVITATION=true`

### Initial approval
You can approve your account by running

`npm run approve-user <email>`

## Admin
Admin has right to approve invitation

### How to become admin
After logging to the app run following command

`npm run make-admin <email>`
