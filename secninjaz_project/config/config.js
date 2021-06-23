require('dotenv').config()


const config = {
    "PORT": process.env.PORT,
    "postgres": {
        user: process.env.USER_NAME, 
        host: process.env.POSTGRES_HOST,
        database: process.env.DB_NAME,
        password: process.env.POSTGRES_PASSWORD,
        port: process.env.POSTGRES_PORT,
    },
    "auth_access_token": process.env.AUTH_ACCESS_TOKEN,
    "token_expiration_in_days": process.env.TOKEN_EXPIRATION_IN_DAYS,

}

module.exports = config;