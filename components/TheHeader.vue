<template>
  <nav class="header">
    <h3 class="logo">T27.dev</h3>
    <!--    <IconLogo class="small" />-->

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
import MobileDetect from 'mobile-detect';
const menus = ['home', 'about', 'contact'];

const colorMode = useColorMode();

const onChangeTheme = (theme) => {
  colorMode.preference = theme;
};

const isShowHeaderMobile = ref(false);
const isMobile = ref(false);

onBeforeMount(() => {
  detectDevice();
});

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

const detectDevice = () => {
  const md = new MobileDetect(window.navigator.userAgent);

  const mobile = md.mobile();
  const tablet = md.tablet();
  const phone = md.phone();

  isMobile.value = !!mobile || !!tablet || !!phone;

  if (isShowHeaderMobile.value) {
    isShowHeaderMobile.value = false;
  }
};

const onResize = () => {
  detectDevice();
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

.logo {
  @apply text-xl font-bold dark:text-white;
}

.link {
  @apply font-semibold capitalize;
}

svg {
  @apply cursor-pointer;
}
</style>
