const config = require('./config')

const Pool = require('pg').Pool
const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASSWORD,
    port: config.DB_PORT
})

module.exports = { DB_CONEXION: pool }