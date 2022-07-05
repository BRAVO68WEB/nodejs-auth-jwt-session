# jwt-auth-nodejs

Template to get started with Backend auth module for REST API

[![imgshields](https://img.shields.io/badge/Version-3-yellowgreen?style=for-the-badge)](https://shields.io/)
[![imgshields](<https://img.shields.io/badge/NodeJS-16(JS)-yellow?style=for-the-badge>)](https://shields.io/)

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/open-source.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/0-percent-optimized.svg)](https://forthebadge.com)

## Fetures :-

-   MongoDB as Database
-   JWT as Authentication
-   Nodemailer as Email Service
-   Express as Web Server
-   Error Handling with Express
-   RSA Key Value Pair for Encryption
-   Husky as Prettier ESLint and Git Hooks
-   Ready to Deploy

# Setup

After pulling this project, create a file named .env in the root of the project and add below configuration. Change the values of below keys as per your requirement.

-   .env example

```
JWT_ACCESS_TIME=7h
JWT_REFRESH_TIME=30d
REDIS_HOST=192.168.100.101
REDIS_PORT=6379
DB_CONN_STRING=mongodb://127.0.0.1:27017/nodejsjwtauth
MAIL_HOST=smtp.ethereal.email
MAIL_PORT=587
MAIL_USER=cecile.leffler67@ethereal.email
MAIL_PASS=7TfEXqF2GQcmDRGN82
MAIL_FROM="Cecile Leffler <cecile.leffler67@ethereal.email>"
```

-   Deffi-Hellman key exchange setup

```bash
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwtRS256.key
ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pub
```
