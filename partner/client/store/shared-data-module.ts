import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'
import { sessionStorage } from '@ustra/core/src/utils/storage/session-storage'
import { CombinedContext } from '@ustra/nuxt/src/vue/store'
import authEventBus from '@ustra/nuxt/src/vue/event-bus/global/auth-event-bus'
import { EapUser } from '../cm/common/models/eap-user-model'

/**
 * 해당 인터페이스는 sessionStorage 를 한다.
 */
export interface SharedDataState {
  /**
   * 고객번호
   */
  custNo: string

  /**
   * 화면간 데이터연동을 위한 변수
   */
  anyTypeData: any

  /**
   * 고객 정보
   */
  eapUserInfo: EapUser
}

@Module({
  name: 'sharedData',
  namespaced: true,
  stateFactory: true,
})
export class SharedDataModule extends VuexModule implements SharedDataState {
  custNo = null
  anyTypeData = null
  eapUserInfo = null

  /**
   * Mutations의 주요 목적은 state를 변경시키는 역활 (Mutations을 통해서만 state를 변경해야 함)
   * 비동기 처리가 아니라 동기처리
   * commit('함수명', '전달인자')으로 실행 가능.
   * mutations 내에 함수 형태 작성.
   */

  /**
   * 고객정보 상세조회(관리자) 화면에서 조회시 고객번호가 유지되야하는 기능
   * @param custNo
   */
  @Mutation
  setCustNo(custNo: string) {
    this.custNo = custNo
    sessionStorage.setItem('custNo', custNo)
  }

  @Mutation
  setAnyTypeData(anyTypeData: any) {
    this.anyTypeData = anyTypeData
  }

  @Mutation
  setEapUserInfo(eapUserInfo: EapUser) {
    this.eapUserInfo = eapUserInfo
    sessionStorage.setItem('eapUserInfo', eapUserInfo)
  }

  /**
   * Actions의 주요 목적은 Mutations를 실행시키는 역활.
   * Mutations이 실행되면 state도 변경.
   * 동기 처리가 아니라 비동기처리.
   * 순서에 상관없이 먼저 종료된 함수의 피드백을 받아 후속 처리됨.
   * actions 내에 함수 형태로 작성.
   * 비동기 처리이기 때문에 콜백함수로 주로 작성.
   */

  // eslint-disable-next-line require-await
  @Action
  async nuxtClientInit(_arg: CombinedContext) {
    this.setCustNo(sessionStorage.getItem('custNo'))
    this.setAnyTypeData(this.anyTypeData)
    // this.setBsUserInfo(sessionStorage.getItem('bsUserInfo'))

    authEventBus.on(state => {
      if (state.logout) {
        // 로그아웃시 세션에 유지되어있는 정보를 없애줌
        sessionStorage.removeItem('custNo')
        sessionStorage.removeItem('bsUserInfo')
      }
    })
  }
}
