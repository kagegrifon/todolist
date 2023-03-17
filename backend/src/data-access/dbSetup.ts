import Knex from 'knex'
import  { Model } from 'objection'
import knexConfig from 'data-access/knexfile'

export function dbSetup() {
    try {
        const knex = Knex(knexConfig.development)
        Model.knex(knex)
        console.log('Connect to db [succesfull]')
    } catch(e) {
        throw new Error(e)
    }
}
