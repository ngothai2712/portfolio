<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#0B1120] pb-12 selection:bg-blue-500/30">
    <nav class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
        <NuxtLink to="/admin" class="group flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors whitespace-nowrap">
          <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Dashboard
        </NuxtLink>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden">
        <div class="px-5 py-6 sm:px-8 sm:py-10 border-b border-slate-100 dark:border-slate-700/50 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10">
          <h2 class="text-3xl font-extrabold text-slate-900 dark:white tracking-tight">Create New Blog</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">Write a new article for your portfolio.</p>
        </div>
        
        <AdminBlogForm 
          :loading="loading" 
          :errorMsg="errorMsg"
          @update:errorMsg="errorMsg = $event"
          @submit="handleSubmit" 
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: false
})

const supabase = useSupabaseClient()
const loading = ref(false)
const errorMsg = ref('')

const uploadImageToSupabase = async (imageFile) => {
  if (!imageFile) return ''

  const fileExt = imageFile.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `blog-covers/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('blog-images')
    .upload(filePath, imageFile)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath)

  return publicUrl
}

const handleSubmit = async ({ form, imageFile }) => {
  try {
    loading.value = true
    errorMsg.value = ''
    
    // Upload image first if exists
    if (imageFile) {
      form.image_url = await uploadImageToSupabase(imageFile)
    }

    const { error } = await supabase
      .from('blogs')
      .insert([form])

    if (error) {
      if (error.code === '23505') { // Unique violation
        throw new Error('A blog post with this title/slug already exists.')
      }
      throw error
    }

    navigateTo('/admin')
  } catch (error) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}
</script>
