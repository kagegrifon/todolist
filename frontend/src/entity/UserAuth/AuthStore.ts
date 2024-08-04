const USER_AUTH_DATA_LOCAL_STORAGE_KEY = 'USER_AUTH_DATA_LOCAL_STORAGE_KEY'

function getFromLocalStorage(): string | null {
    const dataFromStorage = JSON.parse(
        window.localStorage.getItem(USER_AUTH_DATA_LOCAL_STORAGE_KEY),
    )

    if (!dataFromStorage) {
        return null
    }

    return dataFromStorage
}

export class UserAuthStore {
    public setToken(token: string) {
        window.localStorage.setItem(USER_AUTH_DATA_LOCAL_STORAGE_KEY, JSON.stringify(token))
    }

    public getToken() {
        return getFromLocalStorage()
    }
}
