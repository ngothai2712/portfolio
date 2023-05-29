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
          href: '/favicon.ico',
        },
        // {
        //   rel: 'stylesheet',
        //   href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap',
        // },
      ],
      meta: [
        {
          key: 'description',
          hid: 'description',
          name: 'description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
        {
          key: 'og:title',
          hid: 'og:title',
          property: 'og:title',
          content: 'Ngo Hoang Thai | Front End Developer',
        },
        {
          key: 'og:description',
          hid: 'og:description',
          property: 'og:description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
        {
          key: 'og:type',
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          key: 'og:image',
          hid: 'og:image',
          property: 'og:image',
          content: 'https://ngothai2712.site/info.webp',
        },
        {
          key: 'og:url',
          hid: 'og:url',
          property: 'og:url',
          content: 'https://ngothai2712.site/',
        },
        {
          property: 'og:locale',
          content: 'vi_VN',
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
