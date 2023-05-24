<template>
  <transition name="slide-fade">
    <nav class="headerMobile" v-if="isShowModal">
      <img
        src="/close.svg"
        alt="#"
        class="headerMobile-icon"
        width="40"
        height="40"
        @click="isShowModal = !isShowModal"
      />

      <div class="headerMobile-links">
        <NuxtLink
          :to="`#${menu}`"
          class="headerMobile-link"
          v-for="menu in menus"
          :key="menu"
          @click="onClick"
        >
          {{ menu }}
        </NuxtLink>
      </div>
    </nav>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  menus: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(['update:modelValue']);

const isShowModal = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});

const onClick = () => {
  isShowModal.value = false;
};
</script>

<style scoped lang="scss">
.headerMobile {
  @apply fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-white;

  &-icon {
    @apply absolute right-8 top-8;
  }

  &-links {
    @apply flex flex-col items-center gap-10;
  }

  &-link {
    @apply text-2xl font-semibold capitalize;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s linear;
}

.slide-fade-leave-active {
  transition: all 0.3s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
}
</style>
