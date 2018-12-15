/**
 * 判断是否为邮箱地址
 * @param val 
 */
const isEmail = (val: string) => {
  if(!val) {
    return false
  }
  return /^[a-z0-9]+([._\\-]*[a-z0-9])*@(\w+([-.]\w+)*\.){1,63}[a-z0-9]+$/.test(val)
}

export default isEmail