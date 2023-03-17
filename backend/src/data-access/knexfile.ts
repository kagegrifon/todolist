import type { Knex } from 'knex'
import { knexSnakeCaseMappers } from 'objection'

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'postgres',
            database: 'todolist',
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
