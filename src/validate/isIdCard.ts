/**
 * 判断是否为身份证号
 * @param val
 */
const isIdCard = (val: string) => {
    if (!val) {
        return false
    }
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
}

export default isIdCard
