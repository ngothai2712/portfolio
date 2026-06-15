<template>
  <aside class="hidden lg:block w-72 shrink-0 sticky top-32 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 p-6">
    <div class="mb-6">
      <NuxtLink to="/blog" class="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group">
        <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Tất cả bài viết
      </NuxtLink>
    </div>
    
    <h3 class="text-[13px] font-extrabold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">Nội dung bài viết</h3>
    
    <nav v-if="toc.length > 0" class="flex flex-col space-y-1.5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      <a 
        v-for="item in toc" 
        :key="item.id" 
        :href="`#${item.id}`"
        @click.prevent="$emit('scrollTo', item.id)"
        :class="[
          'text-sm transition-all duration-200 border-l-2 py-1.5',
          item.level === 3 ? 'pl-6 text-[13px]' : 'pl-4',
          activeId === item.id 
            ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20' 
            : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
        ]"
      >
        {{ item.text }}
      </a>
    </nav>
    <p v-else class="text-sm text-slate-500 italic">Bài viết này không có mục lục.</p>
  </aside>
</template>

<script setup>
defineProps({
  toc: {
    type: Array,
    required: true
  },
  activeId: {
    type: String,
    required: true
  }
})

defineEmits(['scrollTo'])
</script>
