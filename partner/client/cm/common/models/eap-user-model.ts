import { BaseModel } from '@ustra/data/src/models/base-models'

export interface EapUser extends BaseModel {
  /**
   * 사용자 아이디
   */
  usrId: string
}
