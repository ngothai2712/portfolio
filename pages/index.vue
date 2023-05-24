<template>
  <main class="main">
    <TheHeader />

    <LazyHomeSection />
    <LazyAboutSection />
    <LazyProjectSection />
    <LazyContactSection />

    <h1 class="text-3xl font-bold underline">Hello world!</h1>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
  @apply relative bg-white dark:bg-slate-900;
}
</style>
