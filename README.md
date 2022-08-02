PasswordKeepR
=========

A storage system for passwords for single users and organzations. An organization has many different accounts which need to be shared between users. This app will let an authorized user access all the passwords of the organization.

## Features
* User can register/login and be assigned to an organization
* User can add a new username and password for a specific website
* User can generate passwords based on the criteria specified (password length, contains lowercase, contairs uppercase, contains numbers, etc)
* User can edit and change their password any time
* User has a convinient copy to clipboard button so they dont have to select the password


## Final Product

!["Inital View of PasswordKeepR"](https://github.com/lancey1/PasswordKeepR/blob/master/docs/PasswordKeepR-main.png)
- Inital View of the PasswordKeepR

!["View of PasswordKeepR - Create a Password"](https://github.com/lancey1/PasswordKeepR/blob/master/docs/passwordkeepR-new.png)
- View of PasswordKeepR - Create a Password

!["View of PasswordKeepR - URL Details"](https://github.com/lancey1/PasswordKeepR/blob/master/docs/passwordkeepR-url.png)
- View of PasswordKeepR - URL Details


## Setup
1. run `npm install`
2. Create .env file based on .env.example
3. run `npm start`


## Dependencies
- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Bcrypt
- EJS
- SendGrid
- PostGreSQL
- SASS
