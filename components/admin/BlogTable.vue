<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700/50">
      <thead class="bg-slate-50/50 dark:bg-slate-800/30">
        <tr>
          <th scope="col" class="px-6 py-5 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Blog Title</th>
          <th scope="col" class="px-6 py-5 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
          <th scope="col" class="px-6 py-5 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Created At</th>
          <th scope="col" class="px-6 py-5 text-right text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-700/50 bg-white/50 dark:bg-transparent">
        <tr v-for="blog in blogs" :key="blog.id" class="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
          <td class="px-6 py-5 whitespace-nowrap">
            <div class="flex items-center">
              <div class="h-12 w-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <NuxtImg v-if="blog.image_url" :src="blog.image_url" alt="" class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div v-else class="h-full w-full flex items-center justify-center text-slate-400">
                  <Icon name="heroicons:photo" class="w-6 h-6" />
                </div>
              </div>
              <div class="ml-4">
                <div class="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ blog.title }}</div>
                <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">/blog/{{ blog.slug }}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-5 whitespace-nowrap">
            <span 
              class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm border"
              :class="blog.is_published ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'"
            >
              <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="blog.is_published ? 'bg-emerald-500' : 'bg-amber-500'"></span>
              {{ blog.is_published ? 'Published' : 'Draft' }}
            </span>
          </td>
          <td class="px-6 py-5 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
            {{ new Date(blog.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' }) }}
          </td>
          <td class="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex items-center justify-end gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <NuxtLink :to="`/blog/${blog.slug}`" target="_blank" class="w-9 h-9 flex items-center justify-center rounded-lg text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-500/10 transition-colors" title="Preview">
                <Icon name="heroicons:eye" class="w-5 h-5" />
              </NuxtLink>
              <NuxtLink :to="`/admin/blog/${blog.id}`" class="w-9 h-9 flex items-center justify-center rounded-lg text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10 transition-colors" title="Edit">
                <Icon name="heroicons:pencil-square" class="w-5 h-5" />
              </NuxtLink>
              <button @click="$emit('delete', blog.id)" class="w-9 h-9 flex items-center justify-center rounded-lg text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 transition-colors" title="Delete">
                <Icon name="heroicons:trash" class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  blogs: {
    type: Array,
    required: true
  }
})

defineEmits(['delete'])
</script>
