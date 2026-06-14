<template>
  <nav class="header">
    <NuxtLink to="/" class="logo-link" title="Home">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 200 200" class="logo-svg">
        <path
          d="M 95,95 C 35,100 35,30 89,30 C 135,30 155,55 175,45 M 129,45 C 125,125 105,170 75,170 C 35,170 25,145 25,125 C 25,110 40,100 40,105"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="logo-path"
        />
      </svg>
    </NuxtLink>

    <div class="header-right">
      <img
        @click="isShowHeaderMobile = !isShowHeaderMobile"
        src="/menu.svg"
        alt="menu"
        width="40"
        height="40"
        class="header-menu__icon"
        loading="lazy"
      />
      <div class="header-menu__wrap">
        <NuxtLink
          :to="`#${menu}`"
          class="link"
          v-for="menu in menus"
          :key="menu"
        >
          {{ menu }}
        </NuxtLink>
      </div>

      <IconDark
        v-if="$colorMode.preference === 'dark'"
        @click.passive="onChangeTheme('light')"
      />
      <IconLight v-else @click.passive="onChangeTheme('dark')" />
    </div>

    <TheHeaderMobile v-model="isShowHeaderMobile" :menus="menus" />
  </nav>
</template>

<script setup lang="ts">
const menus = ['home', 'about', 'contact'];

const colorMode = useColorMode();

const onChangeTheme = (theme) => {
  colorMode.preference = theme;
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
  @apply fixed left-0 top-0 z-50 flex h-[80px]
  w-screen items-center justify-between
  border-b border-slate-900/10 bg-white px-6
  dark:border-slate-300/10 dark:bg-slate-900 md:px-16;

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
  @apply text-black dark:text-white transition-transform hover:scale-110;
}

.logo-svg {
  @apply overflow-visible;
}

.logo-path {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: drawLine 2s ease-in-out forwards;
}

.logo-link:hover .logo-path {
  animation: drawLineHover 1.5s ease-in-out forwards;
}

@keyframes drawLine {
  0% { stroke-dashoffset: 400; }
  100% { stroke-dashoffset: 0; }
}

@keyframes drawLineHover {
  0% { stroke-dashoffset: 400; }
  100% { stroke-dashoffset: 0; }
}

.link {
  @apply text-sm font-medium uppercase tracking-widest text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white;
}

svg {
  @apply cursor-pointer;
}
</style>
