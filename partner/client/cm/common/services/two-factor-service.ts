import { ApiResponse, ApiRequest } from '@ustra/data/src/models/api-model'
import { HttpMethod } from '@ustra/core/src/server/http/const'
import { UtraService } from '@ustra/nuxt/src/services/ustra-service'

import { sessionStorage } from '@ustra/core/src/utils/storage/session-storage'
import CookieStorage from '@ustra/core/src/utils/storage/cookie-storage'
import * as jwtUtils from '@ustra/core/src/utils/jwt-utils'
import * as nuxtUtils from '@ustra/nuxt/src/utils/nuxt-utils'
import { isBrowser } from '@ustra/core/src/utils/web-utils'

export class TwoFactorService extends UtraService {
  /**
   * 제휴사 정보 조회하기
   * @param params
   * @returns
   */
  async selectData2(id: string) {
    // ak -> authenticationKey
    const ak = getAkData().ak

    const param: ApiRequest = {
      header: {},
      authenticationKey: ak,
      userName: id,
    }
    const result = await this.$ustra.api.call<ApiResponse<any>>({
      url: '/api/two-factor/auth/login/key',
      method: HttpMethod.POST,
      timeout: 6000000,
      data: param,
    })
    return result.data
  }

  async login2(id: string) {
    // /api/two-factor/auth/login

    const result = await this.$ustra.api.call<ApiResponse<any>>({
      url: '/api/two-factor/auth/login',
      method: HttpMethod.POST,
      timeout: 6000000,
      data: { userName: id },
    })
    return result.data
  }
}

export const twoFactorService = new TwoFactorService()
export default twoFactorService

const getAppProp = () => {
  const context = nuxtUtils.contextHolder.get()
  return context.$ustra.env.appProp
}

const getCookieStorage = (path: string) => {
  return new CookieStorage({
    samesite: 'None',
    secure: true,
    path: path || '/',
    httponly: false,
    valueConverter: null,
    keyConverter: null,
    pure: true,
    maxAge: null,
  })
}

const getAkData = () => {
  // @ts-ignore
  const authConf = getAppProp().app.auth
  const cookieStorage = getCookieStorage(authConf.jwt.cookiePath)
  let accessToken = null

  if (isBrowser) {
    let cookieAccessToken = null

    if (authConf.jwt.useCookie) {
      cookieAccessToken = cookieStorage.getItem(authConf.jwt.accessTokenKey)
    }

    accessToken = cookieAccessToken || sessionStorage.getItem(authConf.jwt.accessTokenKey)

    console.log('accessToken : ', accessToken)
  }

  const parsedClaim = jwtUtils.getClaim(accessToken)
  console.log('parsedClaim : ', parsedClaim)

  return parsedClaim
}
