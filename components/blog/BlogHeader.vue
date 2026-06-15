<template>
  <div>
    <header class="p-8 md:p-14 text-center">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-none tracking-tighter mb-6">
        {{ blog.title }}
      </h1>
      <div class="flex items-center justify-center space-x-6 text-slate-500 dark:text-slate-400">
        <time :datetime="blog.created_at" class="flex items-center text-base font-medium px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/50">
          <Icon name="heroicons:calendar" class="w-5 h-5 mr-2 text-blue-500" />
          {{ new Date(blog.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </time>
      </div>
    </header>

    <div v-if="blog.image_url" class="w-full px-4 md:px-8 pb-8">
      <div class="relative rounded-3xl overflow-hidden shadow-2xl group">
        <NuxtImg :src="blog.image_url" :alt="blog.title" loading="lazy" class="w-full h-auto object-cover max-h-[600px] transform group-hover:scale-[1.02] transition-transform duration-700 ease-in-out" />
        <div class="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  blog: {
    type: Object,
    required: true
  }
})
</script>
