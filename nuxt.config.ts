// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ngo Hoang Thai',
      titleTemplate: '%s - Front End Developer',
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: 'https://ngothai2712.net/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/png',
          href: 'https://ngothai2712.net/favicon.png',
        },
      ],
      meta: [
        {
          key: 'description',
          hid: 'description',
          property: 'description',
          name: 'description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
        {
          key: 'og:title',
          hid: 'og:title',
          property: 'og:title',
          name: 'og:title',
          content: 'Ngo Hoang Thai | Front End Developer',
        },
        {
          key: 'og:description',
          hid: 'og:description',
          property: 'og:description',
          name: 'og:description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
        {
          key: 'og:type',
          hid: 'og:type',
          property: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          key: 'og:image',
          hid: 'og:image',
          property: 'og:image',
          name: 'og:image',
          content: 'https://ngothai2712.net/info.webp',
        },
        {
          key: 'og:url',
          hid: 'og:url',
          property: 'og:url',
          name: 'og:url',
          content: 'https://ngothai2712.net/',
        },
        {
          key: 'og:locale',
          hid: 'og:locale',
          property: 'og:locale',
          name: 'og:locale',
          content: 'vi_VN',
        },

        // Twitter
        {
          key: 'twitter:card',
          hid: 'twitter:card',
          property: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          key: 'twitter:site',
          hid: 'twitter:site',
          property: 'twitter:site',
          name: 'twitter:site',
          content: 'ngothai2712',
        },
        {
          key: 'twitter:title',
          hid: 'twitter:title',
          property: 'twitter:title',
          name: 'twitter:title',
          content: 'Ngo Hoang Thai | Front End Developer',
        },
        {
          key: 'twitter:description',
          hid: 'twitter:description',
          property: 'twitter:description',
          name: 'twitter:description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
        {
          key: 'twitter:image',
          hid: 'twitter:image',
          property: 'twitter:image',
          name: 'twitter:image',
          content: 'https://ngothai2712.net/info.webp',
        },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Open+Sans': {
            wght: [400, 500, 600, 700],
          },
        },
        display: 'swap',
        prefetch: false,
        preconnect: false,
        preload: false,
        download: true,
        base64: false,
      },
    ],
  ],

  // Config TailwindCSS
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config',
  },

  // Config Dark Mode TailwindCSS
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  // CSS
  css: ['~/assets/css/main.css'],
});
