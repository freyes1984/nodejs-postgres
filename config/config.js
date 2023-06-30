//configuracion de variables constantes
module.exports = {
    PORT: process.env.PORT || 8081,
    DB_USER: process.env.DB_USER || 'postgres',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'PEDIDOS',
    DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
    DB_PORT: process.env.DB_PORT || 9091
}