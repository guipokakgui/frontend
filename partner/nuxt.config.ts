import { configProperties, env } from '@ustra/core'
import NuxtConfigLoader from '@ustra/nuxt/src/config/nuxt-config-loader'
import NuxtAppProperties from '@ustra/nuxt/src/config/nuxt-app-properties'

export default async () => {
  const config: NuxtAppProperties = {
    app: {
      processPath: __dirname,
      profile: process.env.CONFIG_ENV,
      configDir: 'config',
      deviceType: configProperties.DeviceType.MOBILE,
      title: 'GSC EAccount Partner BO',
      auth: {
        enabled: true,
        loginUrl: '/',
        expiredProcessType: 'event',
        failProcessType: 'event',
        jwt: {
          useCookie: false,
          accessTokenKey: 'EC-PARTNER-ACC-TOKEN',
          refreshTokenKey: 'EC-PARTNER-REF-TOKEN',
          duplicationCheckType: 'none',
        },
      },
    },
    logger: {
      level: configProperties.LogLevel.Debug,
      file: true,
      datePattern: 'YYYY-MM-DD-HH',
    },
    server: {
      type: configProperties.ServerType.NONE,
      contextPath: '/',
      middleware: {
        compress: true,
        bodyParser: true,
        multipart: false,
      },
    },
    nuxt: {
      module: {
        useCookie: false,
        useUstraDx: {},
        useUstraMngBo: {
          uiConfig: {
            appTitle: 'GSC EAccount Partner BO',
            useMaskingForList: false,
            useMaskingForData: false,
          },
          useInitialDataCache: true,
        },
        useUstraDxMngBo: {
          useDefaultScreen: true,
          importSystemPage: true,
        },
      },
      head: {
        titleTemplate: 'GS칼텍스 전자증빙 - 협력사',
        title: '',
        link: [
          { href: '/img/favicon-32x32.png', rel: 'icon', type: 'image/x-icon' },
          { href: '/img/bookmark.png', rel: 'apple-touch-icon', sizes: '144x144' },
        ],
      },
      generation: {
        generateDirPath: '../../../backend/root/partner/src/main/resources/static',
        generateProfiles: [env.Profile.DEV, env.Profile.STAGING, env.Profile.PRODUCTION],
      },
    },
  }

  return await NuxtConfigLoader.nuxtConfig(config, (_prop, _config) => {
    _config.env.SERVER_PROP_ENC_KEY = 'N3Z0Z28xMmcyOTMzaTBkZQ=='

    _config.build.transpile.push('@gsc/eaccount-cmm')

    _config.loadingIndicator = {
      name: '~/loading-indicator.html',
    }
  })
}
