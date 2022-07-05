# jwt-auth-nodejs

Template to get started with Backend auth module for REST API

# Setup

After pulling this project, create a file named .env in the root of the project and add below information. Change the values of below keys as per your requirement.

-   .env example

```
JWT_ACCESS_TIME=30s
JWT_REFRESH_TIME=30d
REDIS_HOST=192.168.100.101
REDIS_PORT=6379
DB_CONN_STRING=mongodb://127.0.0.1:27017/nodejsjwtauth
```

-   Deffi-Hellman key exchange setup

```bash
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f jwtRS256.key
ssh-keygen -e -m PEM -f jwtRS256.key > jwtRS256.key.pub
```
