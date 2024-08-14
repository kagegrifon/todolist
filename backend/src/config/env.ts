import * as dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT || 3000
export const HASH_SALT = Number(process.env.HASH_SALT || 3)
export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
export const SMTP_HOST = process.env.SMTP_HOST
export const SMTP_PORT = Number(process.env.SMTP_PORT)
export const SMTP_USER_NAME = process.env.SMTP_USER_NAME
export const SMTP_APP_PASSWORD = process.env.SMTP_APP_PASSWORD
export const APP_NAME = process.env.APP_NAME
export const API_URL = process.env.API_URL
export const CLIENT_URL = process.env.CLIENT_URL
// export const ACCESS_TOKEN_TTL = '5m'
// export const REFRESH_TOKEN_TTL = '30d'

export const ACCESS_TOKEN_TTL = '6s'
export const REFRESH_TOKEN_TTL = '30m'
