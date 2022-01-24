import { createStore } from '@ustra/nuxt/src/vue/store'
import { SharedDataModule } from './shared-data-module'

export default () =>
  createStore({
    sharedData: SharedDataModule,
  })
