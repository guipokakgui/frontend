import { ApiResponse } from '@ustra/data/src/models/api-model'
import { HttpMethod } from '@ustra/core/src/server/http/const'
import { UtraService } from '@ustra/nuxt/src/services/ustra-service'

export class SampleService extends UtraService {
  async getBoData() {
    const result = await this.$ustra.api.call<any>({
      url: '/api/bo/test',
      method: HttpMethod.POST,
    })

    return result.data
  }
}

export const sampleService = new SampleService()
export default sampleService
