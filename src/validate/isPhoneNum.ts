/**
 * 判断是否为手机号码
 * @param val 
 */
const isPhoneNum = (val: string) => {
  if(!val) {
    return false
  }
  return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(val)
}

export default isPhoneNum