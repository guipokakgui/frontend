import { ApiRequest, ApiResponse } from '@ustra/data/src/models/api-model'
import { HttpMethod } from '@ustra/core/src/server/http/const'
import { UtraService } from '@ustra/nuxt/src/services/ustra-service'

export class ChannelTestService extends UtraService {
  /**
   * 제휴사 로그인
   * @param id
   * @param pwd
   */
  async getSso(id: string, pwd: string) {
    const param: ApiRequest = {
      header: {},
      id,
      pwd,
    }
    const result = await this.$ustra.api.call<ApiResponse<any>>({
      url: '/api/sso',
      method: HttpMethod.POST,
      data: param,
    })

    return result.data.body
  }
}

export const channelTestService = new ChannelTestService()
export default channelTestService
