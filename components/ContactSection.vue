<template>
  <section id="contact" ref="sectionRef">
    <div class="container">
      <h2 class="content-heading">CONTACT</h2>
      <p class="content-description">Don't be shy! Contact me!</p>

      <div class="items">
        <div class="item">
          <div class="item-icon">
            <Icon name="heroicons:map-pin" class="w-8 h-8 dark:text-white" />
          </div>
          <div class="item-right">
            <h3 class="item-title">Location</h3>
            <p class="item-description">Ha Noi, Viet Nam</p>
          </div>
        </div>
        <div class="item">
          <div class="item-icon">
            <Icon name="heroicons:envelope" class="w-8 h-8 dark:text-white" />
          </div>
          <div class="item-right">
            <h3 class="item-title">Mail</h3>
            <a
              href="mailto:ngothai2712@gmail.com"
              class="item-mail item-description"
            >
              ngothai2712@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const sectionRef = ref(null);
let ctx: gsap.Context;

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

onMounted(() => {
  if (!sectionRef.value) return;
  
  ctx = gsap.context(() => {
    // Header animation
    gsap.from('.content-heading, .content-description', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 90%', // Trigger earlier to ensure it fires even on short screens
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Contact items staggering in
    gsap.from('.item', {
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 85%', // Share the main section trigger so it doesn't get stuck
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.2)',
      delay: 0.2 // Delay slightly after header
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped lang="scss">
#contact {
  @apply bg-stone-50 py-20 dark:bg-slate-900 md:py-24;
}

img {
  @apply h-8 w-8;
}

.content {
  &-heading {
    @apply text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400;
  }

  &-description {
    @apply mb-12 mt-3 text-4xl font-bold tracking-tighter leading-none dark:text-white md:text-5xl;
  }
}

.items {
  @apply flex flex-col flex-wrap items-center gap-12 md:flex-row md:gap-32;
}

.item {
  @apply flex flex-col items-center gap-6 text-center md:flex-row md:text-left;

  &-title {
    @apply text-xl font-bold tracking-tight dark:text-white;
  }

  &-icon {
    @apply flex h-20 w-20 items-center justify-center rounded-full text-blue-500 shadow-md dark:bg-slate-300/10;
  }

  &-mail {
    @apply transition-colors hover:text-blue-500;
  }

  &-description {
    @apply text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg;
  }
}
</style>
