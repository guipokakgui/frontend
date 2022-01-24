<template>
  <div id="wrap" class="error">
    <div class="error-box">
      <div class="img-box">
        <img src="~/assets/img/bg_err.png" alt="" />
      </div>
      <div class="msg-box">
        <p v-if="error.statusCode === 404">요청하신 경로를 찾을 수 없습니다.</p>
        <p v-else class="msg">{{ errorMessage }}</p>
      </div>
      <div v-if="authenticated" class="buttons is-centered">
        <button type="button" class="button is-gsc is-large is-rounded" @click="goHome">홈 화면으로</button>
        <button type="button" class="button is-gsc is-large is-rounded is-outlined" @click="$router.back()">이전 화면으로</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { UstraBoComponent } from '@ustra/nuxt-mng-bo/src/components/ustra-bo-component'

@Component({
  layout: ctx => {
    if (ctx.route.path === '/') {
      return 'empty'
    }

    return ctx.$ustra.auth.store.authenticated ? 'default' : 'empty'
  },
})
export default class extends UstraBoComponent {
  @Prop({
    type: Object,
    default: () => {
      return { statusCode: 500, message: null }
    },
  })
  readonly error

  pageNotFound = '404 Not Found'
  otherError = 'An error occurred'

  mounted() {
    // console.log('this.error', this.error)
  }

  get errorMessage() {
    return this.error && this.error.message ? this.error.message : '시스템 오류가 발생하였습니다. 동일한 오류가 발생하는 경우 관리자에게 문의하시기 바랍니다.'
  }

  get authenticated() {
    return this.$ustra.auth.store.authenticated
  }

  goHome() {
    if (this.$route.path === '/') {
      location.reload()
    } else {
      this.$router.push('/')
    }

    // @ts-ignore
    // this.$router.go({ path: '/', force: true })
  }
}
</script>
