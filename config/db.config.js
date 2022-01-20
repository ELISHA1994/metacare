export default {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "password",
    DB: "metacare",
    dialect: "postgres",
    PORT: 5423,
    LOGGING: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}