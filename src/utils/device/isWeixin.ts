/**
 * 判断是否为微信内
 */
const isWeixin = () => {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
}

export default isWeixin
