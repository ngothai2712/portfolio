<template>
  <section id="contact">
    <div class="container">
      <h2 class="content-heading">CONTACT</h2>
      <p class="content-description">Don't be shy! Contact me!</p>

      <div class="items">
        <div class="item">
          <div class="item-icon">
            <img src="/location.svg" alt="email" loading="lazy" />
          </div>
          <div class="item-right">
            <h3 class="item-title">Location</h3>
            <p class="item-description">Ha Noi, Viet Nam</p>
          </div>
        </div>
        <div class="item">
          <div class="item-icon">
            <img src="/email.svg" alt="email" loading="lazy" />
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

<script setup lang="ts"></script>

<style scoped lang="scss">
#contact {
  @apply bg-stone-50 py-24 dark:bg-slate-900;
}

img {
  @apply h-8 w-8 dark:invert;
}

.content {
  &-heading {
    @apply text-xl font-bold text-blue-500;
  }

  &-description {
    @apply mb-10 mt-2 text-2xl font-bold dark:text-white;
  }
}

.items {
  @apply flex flex-col flex-wrap items-center gap-10 md:flex-row md:gap-32;
}

.item {
  @apply flex flex-col items-center gap-5 text-center md:flex-row md:text-left;

  &-title {
    @apply text-xl font-bold dark:text-white;
  }

  &-icon {
    @apply rounded-full p-6 text-blue-500 shadow-md dark:bg-slate-300/10;
  }

  &-mail {
    @apply transition-all hover:text-blue-500;
  }

  &-description {
    @apply text-lg text-gray-500 dark:text-gray-400;
  }
}
</style>
