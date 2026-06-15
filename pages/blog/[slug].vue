<template>
  <div class="min-h-screen relative transition-colors duration-500 selection:bg-blue-500/30">

    <div class="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div v-if="pending && !blog" class="flex justify-center items-center py-32 min-h-[50vh]">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
          <div class="absolute inset-2 rounded-full border-r-2 border-cyan-400 animate-spin animation-delay-150"></div>
          <div class="absolute inset-4 rounded-full border-b-2 border-purple-500 animate-spin animation-delay-300"></div>
        </div>
      </div>
      
      <div v-else-if="error || (!blog && !pending)" class="max-w-2xl mx-auto text-center py-32 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl mt-10">
        <div class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="heroicons:exclamation-triangle" class="w-10 h-10 text-red-500" />
        </div>
        <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Không tìm thấy bài viết</h1>
        <p class="text-lg text-slate-600 dark:text-slate-400 mb-8 px-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc có thể đã bị xóa. Hãy thử xem các bài viết khác nhé.</p>
        <NuxtLink to="/blog" class="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-full shadow-lg text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all transform hover:scale-105">
          <Icon name="heroicons:arrow-left" class="w-5 h-5 mr-2" />
          Quay lại Blog
        </NuxtLink>
      </div>

      <div v-else-if="blog" class="max-w-7xl mx-auto mt-6 flex flex-col lg:flex-row gap-8 items-start">
        <BlogTocSidebar :toc="toc" :activeId="activeId" @scrollTo="scrollTo" />

        <article class="flex-1 min-w-0 w-full max-w-4xl mx-auto">
          <div class="mb-6 lg:hidden">
            <NuxtLink to="/blog" class="inline-flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors group bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-sm hover:shadow-md">
              <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
              Tất cả bài viết
            </NuxtLink>
          </div>

          <div class="bg-white dark:bg-[#0B1120] rounded-[2.5rem] overflow-hidden">
            <BlogHeader :blog="blog" />
            <BlogContent :content="blog.content" @update:toc="toc = $event" @update:activeId="activeId = $event" />
          </div>
        </article>
      </div>
    </div>

    <BlogTocMobile v-if="blog" :toc="toc" :activeId="activeId" v-model:isOpen="isTocOpen" @scrollTo="scrollToMobile" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BlogTocSidebar from '~/components/blog/BlogTocSidebar.vue'
import BlogTocMobile from '~/components/blog/BlogTocMobile.vue'
import BlogHeader from '~/components/blog/BlogHeader.vue'
import BlogContent from '~/components/blog/BlogContent.vue'

const route = useRoute()
const supabase = useSupabaseClient()

const { data: blog, pending, error } = await useAsyncData(`blog-${route.params.slug}`, async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', route.params.slug)
    .eq('is_published', true)
    .single()
  
  if (error) throw error
  return data
})

useHead({
  title: computed(() => blog.value ? `${blog.value.title} - Blog` : 'Blog Post'),
  meta: [
    { name: 'description', content: computed(() => blog.value?.description || '') }
  ]
})

const toc = ref([])
const activeId = ref('')
const isTocOpen = ref(false)

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const y = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top: y, behavior: 'smooth' })
    activeId.value = id
  }
}

const scrollToMobile = (id) => {
  scrollTo(id)
  isTocOpen.value = false
}
</script>

<style>
/* Custom prose styles for better aesthetics */
.prose pre {
  @apply rounded-xl border border-slate-800 bg-slate-900 text-slate-50 shadow-lg;
}
.prose blockquote {
  @apply rounded-r-xl border-l-4 border-blue-500 bg-blue-50 px-6 py-4 font-medium not-italic text-slate-700 dark:bg-slate-800/50 dark:text-slate-300;
}
.prose img {
  @apply shadow-lg;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-slate-200 dark:bg-slate-700;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  @apply bg-slate-300 dark:bg-slate-600;
}
</style>
