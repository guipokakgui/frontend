export default class BoMaskingUtils {
  /**
   * ID 마스킹
   */
  id = (value: string) => {
    if (!value) {
      return value
    }

    const originStr = value
    let maskingStr: string

    if (originStr.length < 2) {
      maskingStr = originStr
    } else if (originStr.length < 3) {
      maskingStr = originStr.replace(/\S{1}$/, '*')
    } else {
      maskingStr = originStr.replace(/\S{2}$/, '**')
    }
    return maskingStr
  }

  /**
   * IP 마스킹
   */
  ip = (value: string) => {
    if (!value) {
      return value
    }

    const regex = /^(?=\d+\.\d+\.\d+\.\d+$)(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\.?){4}$/
    if (!regex.test(value)) {
      return value
    }

    const originStr = value
    const originStrArray = originStr.split('.')
    let maskingStr: string
    if (parseInt(originStrArray[0]) >= 128 && parseInt(originStrArray[0]) <= 191) {
      // B 클래스
      maskingStr = originStrArray[0] + '.' + '***' + '.' + originStrArray[2] + '.' + originStrArray[3]
    } else if (parseInt(originStrArray[0]) >= 192 && parseInt(originStrArray[0]) <= 223) {
      // C 클래스
      maskingStr = originStrArray[0] + '.' + originStrArray[1] + '.' + '***' + '.' + originStrArray[3]
    } else {
      // 기타
      maskingStr = originStrArray[0] + '.' + '***' + '.' + originStrArray[2] + '.' + originStrArray[3]
    }

    return maskingStr
  }

  /**
   * 카드 번호
   */
  cardNo = (value: string) => {
    if (!value) {
      return value
    }

    if (value.length !== 16) {
      return value
    }

    const originStr = value
    const maskingStr: string = originStr.substring(0, 4) + '-' + originStr.substring(4, 6) + '**-****-****'

    return maskingStr
  }

  /**
   * 계좌번호
   * @param value
   * @returns
   */
  bankNo = (value: string) => {
    if (!value) return ''

    let output = ''
    if (value.includes('-')) {
      const valueArr = value.split('-')
      if (valueArr.length === 3) {
        output = valueArr[0] + '-***-' + '**' + valueArr[2].substring(2, valueArr[2].length)
      } else if (valueArr.length === 2) {
        output = valueArr[0].substring(0, 3) + '***-**' + value.slice(value.length - 3, value.length)
      }
    } else {
      output = value.slice(0, 3) + '******' + value.slice(value.length - 3, value.length)
    }
    return output
  }

  /**
   * 이름
   * @param value
   * @returns
   */
  name = (value: string) => {
    return value ? (value.length === 2 ? value.slice(0, 1) + '*' : value.slice(0, value.length - 1) + '*') : ''
  }

  /**
   * 전화번호
   * 입력 예) 02-1234-1234
   */
  tel = (value: string) => {
    if (!value) return ''

    let output = ''
    if (value.includes('-')) {
      const valueArr = value.split('-')
      if (valueArr.length === 3) {
        output = valueArr[0] + '-****-' + valueArr[2]
      } else if (valueArr.length === 2) {
        output = valueArr[0] + '-****-****'
      }
    } else {
      output = value.slice(0, 2) + '-****-' + value.slice(value.length - 4, value.length)
    }
    return output
  }

  /**
   * 휴대폰 번호
   * 입력 예) 010-2222-3333
   * @param value
   * @returns
   */
  hp = (value: string) => {
    if (!value) return ''

    let output = ''
    if (value.includes('-')) {
      const valueArr = value.split('-')
      if (valueArr.length === 3) {
        output = valueArr[0] + '-****-' + valueArr[2]
      } else if (valueArr.length === 2) {
        output = valueArr[0] + '-****-****'
      }
    } else if (value.length === 11) {
      output = value.substring(0, 3) + '-****-' + value.substring(7, 11)
    } else {
      output = value.slice(0, 3) + '-****-****'
    }
    return output
  }

  /**
   * 주소
   * @param value
   * @returns
   */
  addr = (value: string) => {
    if (!value) return ''
    const valueArr = value.split(' ')

    if (valueArr.length > 4) {
      return valueArr[0] + ' ' + valueArr[1] + ' ' + valueArr[2] + ' ' + valueArr[3] + ' ****'
    }
    return value ? value.substring(0, value.length - 4) + '****' : ''
  }

  /**
   * 우편번호
   * @param value
   * @returns
   */
  zip = (value: string) => {
    return value ? value.substring(0, value.length - 3) + '***' : ''
  }

  /**
   * 이메일
   * @param value
   * @returns
   */
  email = (value: string) => {
    if (!value) return ''
    if (value.indexOf('@') === 0) return ''

    const id = value.split('@')[0]
    const mail = value.split('@')[1]
    const site1 = mail.split('.')[0]
    const site2 = mail.split('.')[1]

    return id.slice(0, 3) + '***@' + mail.slice(0, 1) + new Array(site1.length).join('*') + '.' + site2
  }

  bdayNm = (v: string) => {
    if (v && v.length === 8) {
      return v.substring(0, 4) + '-' + v.substring(4, 6) + '-' + v.substring(6, 8)
    } else {
      return ''
    }
  }
}

export { BoMaskingUtils }
