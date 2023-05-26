<template>
  <main class="main">
    <TheHeader />
    <LazyHomeSection />
    <LazyAboutSection />
    <!--    <LazyProjectSection />-->
    <LazyContactSection />
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
  @apply relative bg-white dark:bg-slate-900;
}
</style>
