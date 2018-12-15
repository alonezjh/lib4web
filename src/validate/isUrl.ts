/**
 * 判断是否为url地址
 * @param val 
 */
const isUrl = (val: string) => {
  if(!val) {
    return false
  }
  return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(val)
}

export default isUrl