<template>
  <div class="min-h-screen relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500">

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="text-center mb-20">
        <div class="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50">
          <span class="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">Writings & Thoughts</span>
        </div>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          My <span class="text-blue-600 dark:text-blue-400">Journal</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Chia sẻ kiến thức, kinh nghiệm thực tế và các bài hướng dẫn chuyên sâu về Web Development & Design.
        </p>
      </div>

      <div v-if="pending" class="flex justify-center items-center py-32">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
          <div class="absolute inset-2 rounded-full border-r-2 border-cyan-400 animate-spin animation-delay-150"></div>
          <div class="absolute inset-4 rounded-full border-b-2 border-teal-400 animate-spin animation-delay-300"></div>
        </div>
      </div>

      <div v-else-if="error" class="text-center bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/50 rounded-3xl py-12 px-6 max-w-2xl mx-auto backdrop-blur-sm">
        <Icon name="heroicons:exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">Oops! Có lỗi xảy ra</h3>
        <p class="text-slate-600 dark:text-slate-400">Không thể tải danh sách bài viết. Vui lòng thử lại sau.</p>
      </div>

      <div v-else-if="!blogs?.length" class="text-center bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-3xl py-20 px-6 max-w-3xl mx-auto shadow-sm">
        <div class="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="heroicons:document-text" class="w-10 h-10 text-slate-400" />
        </div>
        <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-3">Chưa có bài viết</h3>
        <p class="text-slate-500 dark:text-slate-400 text-lg">Hiện tại blog đang trống. Nội dung mới sẽ sớm được cập nhật!</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        <NuxtLink
          v-for="(blog, index) in blogs"
          :key="blog.id"
          :to="`/blog/${blog.slug}`"
          class="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 dark:border-slate-800 hover:-translate-y-1 hover:border-blue-500/30"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="relative overflow-hidden aspect-[16/10] bg-slate-200 dark:bg-slate-700 p-2">
            <div class="absolute inset-0 bg-slate-100 dark:bg-slate-800"></div>
            <NuxtImg 
              v-if="blog.image_url" 
              :src="blog.image_url" 
              :alt="blog.title"
              loading="lazy"
              class="relative w-full h-full object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-700 ease-out z-10"
            />
            <div v-else class="relative w-full h-full rounded-2xl flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800 z-10">
              <Icon name="heroicons:photo" class="w-12 h-12 opacity-30" />
            </div>
            <!-- Beautiful inner overlay -->
            <div class="absolute inset-2 rounded-2xl bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
          </div>
          
          <div class="p-8 flex flex-col flex-grow relative z-30">
            <div class="flex items-center text-xs font-semibold tracking-wider text-blue-500 uppercase mb-4">
              <time :datetime="blog.created_at" class="flex items-center">
                <Icon name="heroicons:calendar" class="w-3.5 h-3.5 mr-1.5" />
                {{ new Date(blog.created_at).toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' }) }}
              </time>
            </div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-500 transition-colors line-clamp-2 leading-tight">
              {{ blog.title }}
            </h2>
            <p class="text-slate-600 dark:text-slate-400 line-clamp-3 mb-6 flex-grow text-base leading-relaxed">
              {{ blog.description }}
            </p>
            <div class="mt-auto flex items-center text-slate-900 dark:text-white font-semibold text-sm group-hover:text-blue-500 transition-colors">
              Đọc bài viết
              <div class="ml-2 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center transform group-hover:translate-x-2 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-all duration-300">
                <Icon name="heroicons:arrow-right" class="w-4 h-4" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const { data: blogs, pending, error } = await useAsyncData('blogs', async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('id, title, slug, description, image_url, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
})

useHead({
  title: 'Blog',
  meta: [
    { name: 'description', content: 'Chia sẻ kiến thức, kinh nghiệm và các bài hướng dẫn về Web Development.' }
  ]
})
</script>
