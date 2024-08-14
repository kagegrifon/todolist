import type { Knex } from 'knex'
import { knexSnakeCaseMappers } from 'objection'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from 'config/env'

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: DB_HOST,
            port: DB_PORT,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './seeds',
        },
        ...knexSnakeCaseMappers,
    },

    // production: {
    //   client: "postgresql",
    //   connection: {
    //     database: "my_db",
    //     user: "username",
    //     password: "password"
    //   },
    //   pool: {
    //     min: 2,
    //     max: 10
    //   },
    //   migrations: {
    //     tableName: "knex_migrations"
    //   }
    // }
}

export default config
