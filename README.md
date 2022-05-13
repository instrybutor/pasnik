# Paśnik

## Development

### Frontend

Run `yarn start`

### Database

Run `yarn run start:database`

### Backend 
Run `yarn run start:api`

## Invitations
By default invitations are disabled, to enable them set env variable `ENABLE_INVITATION=true`

### Initial approval
You can approve your account by running

`yarn run approve-user <email>`

## Admin
Admin has right to approve invitation

### How to become admin
After logging to the app run following command

`yarn run make-admin <email>`
