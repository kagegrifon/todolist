import * as dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const HASH_SALT = process.env.HASH_SALT || 3
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
