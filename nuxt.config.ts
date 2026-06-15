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
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
        {
          rel: 'canonical',
          href: 'https://ngothai2712.net/',
        },
      ],
      meta: [
        {
          property: 'description',
          name: 'description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
        {
          property: 'og:title',
          name: 'og:title',
          content: 'Ngo Hoang Thai | Front End Developer',
        },
        {
          property: 'og:title',
          name: 'og:title',
          content: 'ngothai2712 | Front End Developer',
        },
        {
          key: 'og:title',
          property: 'og:title',
          name: 'og:title',
          content: 'Ngô Hoàng Thái | Front End Developer',
        },
        {
          property: 'og:description',
          name: 'og:description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
        {
          property: 'og:type',
          name: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          name: 'og:image',
          content: 'https://ngothai2712.net/info.webp',
        },
        {
          property: 'og:url',
          name: 'og:url',
          content: 'https://ngothai2712.net/',
        },
        {
          property: 'og:locale',
          name: 'og:locale',
          content: 'vi_VN',
        },

        // Twitter
        {
          property: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'twitter:site',
          name: 'twitter:site',
          content: 'ngothai2712',
        },
        {
          property: 'twitter:title',
          name: 'twitter:title',
          content: 'Ngo Hoang Thai | Front End Developer',
        },
        {
          property: 'twitter:description',
          name: 'twitter:description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
        {
          property: 'twitter:image',
          name: 'twitter:image',
          content: 'https://ngothai2712.net/info.webp',
        },

        //PWA
        {
          key: 'theme-color',
          name: 'theme-color',
          content: '#0f172a',
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
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/supabase',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-schema-org',
  ],

  supabase: {
    redirectOptions: {
      login: '/admin/login',
      callback: '/confirm',
      include: ['/admin(/*)?'],
      exclude: [],
      cookieRedirect: false,
    }
  },

  image: {
    domains: ['veegnfldvnyowpbrzjdy.supabase.co'],
  },

  site: {
    url: 'https://ngothai2712.net',
    name: 'Ngo Hoang Thai | Front End Developer',
    description: 'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
    defaultLocale: 'vi'
  },

  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
      type: 'module',
      suppressWarnings: true,
    },
    manifest: {
      name: 'Portfolio ThaiNH',
      short_name: 'Portfolio ThaiNH',
      background_color: '#0f172a',
      theme_color: '#0f172a',
      icons: [
        {
          src: 'favicon.svg',
          sizes: '192x192',
          type: 'image/svg+xml',
        },
        {
          src: 'favicon.svg',
          sizes: '512x512',
          type: 'image/svg+xml',
        },
        {
          src: 'favicon.svg',
          sizes: '512x512',
          type: 'image/svg+xml',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico,webp,jpeg,jpg,json}'],
      globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
    },
  },

  // Config TailwindCSS
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config',
  },

  // Config Dark Mode TailwindCSS
  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  // CSS
  css: ['~/assets/css/main.css'],
});
