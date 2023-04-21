import { isBoolean, isNull, isNumber, isString, isUndefined } from './typeof'

describe('typeof', () => {
  it('should is number', () => {
    // given
    const val = 123
    // when
    const result = isNumber(val)
    // then
    expect(result).toBeTruthy()
  })
  it('should is string', () => {
    // given
    // when
    // then
    expect(isString('text')).toBeTruthy()
  })
  it('should is boolean', () => {
    // given
    const val = false
    // when
    const result = isBoolean(val)
    // then
    expect(result).toBeTruthy()
  })
  it('should is null', () => {
    // given
    const val = null
    // when
    const result = isNull(val)
    // then
    expect(result).toBeTruthy()
  })
  it('should is undefined', () => {
    // given
    const val = undefined
    // when
    const result = isUndefined(val)
    // then
    expect(result).toBeTruthy()
  })
})
