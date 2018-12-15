import { IOptions, DefaultOptions, Drivers, getObjType  } from './utils';

class Storage {

  private defaults: {
    bucket: string,
    driver: string,
    prefix : string,
    expire: number | null,
  };

  constructor ({ ...options }: any) {
    this.defaults = {
      bucket: DefaultOptions.BUCKET,
      driver: DefaultOptions.DRIVER,
      prefix : DefaultOptions.PREFIX,
      expire: DefaultOptions.EXPIRE,
      ...options,
    }
  }

  /**
   * 写入数据
   * @param key 
   * @param value 
   * @param options 
   */
  set = (key:string, value: any, options?: IOptions) => {
    if (Array.isArray(key)) {
      options = this._getOptions(value);
      for (const i in key) {
        this._set(key[i].key, key[i].value, options);
      }
    } else {
      options = this._getOptions(options);
      this._set(key, value, options);
    }
  }

  /**
   * 读取数据
   * @param key 
   * @param options 
   */
  get = (key: string, options?: IOptions) => {
    key = this._getKey(key, options);
    options = this._getOptions(options);
    const bucket = this._getBucket(key, options);
    const value = this._getDriver(options).getItem(key);
    if (bucket) {
      if (value) {
        if ((bucket.expire && bucket.expire > new Date().getTime()) || bucket.expire === null) {
          return bucket.type === 'String' ? value : JSON.parse(value);
        } else {
          this._remove(key, options);
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  /**
   * 删除数据
   * @param key 
   * @param options 
   */
  remove = ( key: string | string[], options?: IOptions ) => {
    options = this._getOptions(options)
    if (Array.isArray(key)) {
      for (const i in key) {
        this._remove(key[i], options)
      }
    } else {
      this._remove(key, options)
    }
  }

  /**
   * 删除所有数据
   * @param options 
   */
  removeAll = (options?: IOptions) => {
    if(options){
      if(options.driver){
        this._getDriver(options).clear();
      }else {
        this._clear();
      } 
    } else {
      this._clear(); 
    }
  }

  private _getOptions = (options?: IOptions) => {
    if(options){
      if (options && options.expire && /^[1-9]\d*$/.test(String(options.expire)) &&
        options.expire.toString().length !== 13) {
        options.expire = options.expire + new Date().getTime()
      } 
      return (Object as any).assign({}, this.defaults, options)
    }else {
      return this.defaults;
    }
  }

  private _getDriver = (options?: IOptions) => {
    const driver = options ? options.driver : this.defaults.driver;
    if (/^(ls|local|localStorage)$/.test(String(driver)) || /^(ss|session|sessionStorage)$/.test(String(driver))) {
      return /^(ls|local|localStorage)$/.test(String(driver)) ? Drivers.LOCALSTORAGE : Drivers.SESSIONSTORAGE
    } else {
      throw new Error(`storeType only support [ls/local/localStorage/ss/session/sessionStorage]!`);
    }
  }

  private _getKey = (key: string, options?: IOptions) => {
    return options ? `${options.prefix}${key}` : `${this.defaults.prefix}${key}`;
  }
 
  private _bucket = (options?: any) => {
    let bucket: any
    bucket = this._getDriver(options).getItem(options.bucket);
    return bucket ? JSON.parse(bucket) : {}
  }

  private _setBucket = ( key: string, type: string, options: any) => {
    const bucket = this._bucket(options)
    bucket[key] = {
      type,
      expire: this._getOptions(options).expire
    }
    this._getDriver(options).setItem(options.bucket, JSON.stringify(bucket));
  }

  private _getBucket = (key: string, options: any) => {
    const bucket = this._bucket(options)
    if (bucket[key]) {
      return bucket[key]
    } else {
      return null
    }
  }

  private _removeBucket = (key: string, options: any ) => {
    const bucket = this._bucket(options)
    delete bucket[key]
    this._getDriver(options).setItem(options.bucket, JSON.stringify(bucket))
  }

  private _set = (key: string, value: string, options?: IOptions) => {
    key = this._getKey(key, options);
    const driver = this._getDriver(options);
    const objType = getObjType(value);
    this._setBucket(key, objType, options)
    if ( objType === 'String' || objType === 'Number') {
      driver.setItem(key, value);
    } else {
      driver.setItem(key, JSON.stringify(value));
    }
  }

  private _remove = ( key: string, options: any ) => {
    key = this._getKey(key, options)
    this._removeBucket(key, options)
    this._getDriver(options).removeItem(key)
  }

  private _clear = () => {
    Drivers.LOCALSTORAGE.clear();
    Drivers.SESSIONSTORAGE.clear(); 
  }

}

export default Storage;