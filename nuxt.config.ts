// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Ngo Hoang Thai',
      titleTemplate: '%s - Front End Developer',
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap',
        },
      ],
      meta: [
        {
          key: 'description',
          hid: 'description',
          name: 'description',
          content:
            'Welcome to my portfolio. Hi there! I am a Front-End Developer.',
        },
      ],
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  // Config TailwindCSS
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config',
  },

  // Config Dark Mode TailwindCSS
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
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
