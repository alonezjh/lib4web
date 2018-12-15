export const getObjType = (obj: any) => {
    return Object.prototype.toString.call(obj).slice(8, -1)
}

export const Drivers = {
    LOCALSTORAGE: window.localStorage,
    SESSIONSTORAGE: window.sessionStorage,
}

export const DefaultOptions = {
    BUCKET: 'storage',
    DRIVER: 'localStorage',
    PREFIX: '',
    EXPIRE: null,
}

export interface IOptions {
    bucket?: string
    driver?: string
    prefix?: string
    expire?: number | null
}
