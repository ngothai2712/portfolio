<template>
  <nav class="header">
    <NuxtLink
      to="/"
      class="logo-link flex items-center justify-center"
      title="Home"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 200 200"
        class="logo-svg transition-transform duration-300 hover:scale-110"
      >
        <path
          d="M 95,95 C 35,100 35,30 89,30 C 135,30 155,55 175,45 M 129,45 C 125,125 105,170 75,170 C 35,170 25,145 25,125 C 25,110 40,100 40,105"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="logo-path"
        />
      </svg>
    </NuxtLink>

    <div class="header-right">
      <button
        @click="isShowHeaderMobile = !isShowHeaderMobile"
        class="header-menu__icon flex items-center justify-center p-1 text-slate-600 transition-colors hover:text-blue-500 dark:text-slate-300"
      >
        <Icon name="heroicons:bars-3" class="h-6 w-6" />
      </button>

      <div class="header-menu__wrap">
        <NuxtLink
          v-for="menu in menus"
          :key="menu.name"
          :to="menu.to"
          class="link"
        >
          {{ menu.name }}
        </NuxtLink>
      </div>

      <ClientOnly>
        <button 
          v-if="$colorMode.preference === 'dark'"
          @click.passive="onChangeTheme('light')"
          class="flex items-center justify-center p-2 rounded-full text-blue-400 hover:bg-blue-900/20 transition-colors"
          title="Switch to Light Mode"
        >
          <Icon name="heroicons:sun" class="w-5 h-5" />
        </button>
        
        <button 
          v-else 
          @click.passive="onChangeTheme('dark')" 
          class="flex items-center justify-center p-2 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
          title="Switch to Dark Mode"
        >
          <Icon name="heroicons:moon" class="w-5 h-5" />
        </button>
        
        <template #fallback>
          <div class="w-9 h-9" />
        </template>
      </ClientOnly>
    </div>

    <TheHeaderMobile v-model="isShowHeaderMobile" :menus="menus" />
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const menus = [
  { name: 'home', to: '/' },
  { name: 'about', to: '/#about' },
  { name: 'contact', to: '/#contact' },
  { name: 'blog', to: '/blog' },
];

const colorMode = useColorMode();

const onChangeTheme = (theme: string) => {
  if (!document.startViewTransition) {
    document.documentElement.classList.add('color-theme-in-transition');
    colorMode.preference = theme;
    setTimeout(() => {
      document.documentElement.classList.remove('color-theme-in-transition');
    }, 300);
    return;
  }

  document.startViewTransition(async () => {
    colorMode.preference = theme;
    await nextTick();
  });
};

const isShowHeaderMobile = ref(false);

onMounted(() => {
  onResize();
});

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

const onResize = () => {
  if (window.screen.width > 767.98) {
    isShowHeaderMobile.value = false;
  }
};
</script>

<style scoped lang="scss">
.header {
  @apply fixed left-0 top-0 z-50 flex h-[80px] w-screen items-center justify-between border-b border-slate-900/10 bg-white px-6 dark:border-slate-300/10 dark:bg-slate-900 md:px-16;

  &-right {
    @apply flex items-center gap-6 dark:text-white;
  }
}

.header-menu {
  &__icon {
    @apply inline-block dark:invert md:hidden;
  }

  &__wrap {
    @apply hidden md:flex md:items-center md:gap-6;
  }
}

.logo-link {
  @apply text-black transition-transform hover:scale-110 dark:text-white;
}

.logo-svg {
  @apply overflow-visible;
}

.logo-path {
  animation: drawLine 7s ease-in-out infinite;
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
}

.logo-link:hover .logo-path {
  animation: drawLineHover 1.5s ease-in-out forwards;
}

@keyframes drawLine {
  0% {
    stroke-dashoffset: 400;
  }
  28.5% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes drawLineHover {
  0% {
    stroke-dashoffset: 400;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.link {
  @apply text-sm font-medium uppercase tracking-widest text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white;
}

svg {
  @apply cursor-pointer;
}
</style>
