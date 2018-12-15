import Validate from '../validate'

test('isPhoneNum', () => {
    expect(Validate.isPhoneNum('15908199450')).toBe(true)
})
test('isPhoneNum', () => {
    expect(Validate.isPhoneNum('')).toBe(false)
})
test('isPhoneNum', () => {
    expect(Validate.isPhoneNum('11108199450')).toBe(false)
})

test('isEmail', () => {
    expect(Validate.isEmail('zjh@alonez.com')).toBe(true)
})
test('isEmail', () => {
    expect(Validate.isEmail('')).toBe(false)
})
test('isEmail', () => {
    expect(Validate.isEmail('alonez.com')).toBe(false)
})

test('isIdCard', () => {
    expect(Validate.isIdCard('410329195601263016')).toBe(true)
})
test('isIdCard', () => {
    expect(Validate.isIdCard('41032919560126301X')).toBe(true)
})
test('isIdCard', () => {
    expect(Validate.isIdCard('410329195601263')).toBe(true)
})
test('isIdCard', () => {
    expect(Validate.isIdCard('')).toBe(false)
})
test('isIdCard', () => {
    expect(Validate.isIdCard('111111')).toBe(false)
})
test('isIdCard', () => {
    expect(Validate.isIdCard('1111111111111111111111111')).toBe(false)
})

test('isUrl', () => {
    expect(Validate.isUrl('http://alonez.com')).toBe(true)
})
test('isUrl', () => {
    expect(Validate.isUrl('')).toBe(false)
})
test('isUrl', () => {
    expect(Validate.isUrl('alonez.com')).toBe(true)
})
test('isUrl', () => {
    expect(Validate.isUrl('alonezcom')).toBe(false)
})
