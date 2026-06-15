<template>
  <div class="main-layout flex flex-col min-h-screen">
    <TheHeader />
    <div class="flex-grow">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  @apply relative min-h-screen bg-white dark:bg-[#0B1120];
}
</style>
