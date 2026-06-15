<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#0B1120] pb-12 selection:bg-blue-500/30">
    <nav class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-800/50 sticky top-0 z-50">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <NuxtLink to="/admin" class="group flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
          <div class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
            <Icon name="heroicons:arrow-left" class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Dashboard
        </NuxtLink>
        <button @click="handleDelete" class="group flex items-center text-sm font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 transition-colors">
          Delete Blog
        </button>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div v-if="pending" class="flex flex-col justify-center items-center py-32 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-[2rem] shadow-xl border border-white/20 dark:border-slate-700/50">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
          <div class="absolute inset-2 rounded-full border-r-2 border-cyan-400 animate-spin animation-delay-150"></div>
          <div class="absolute inset-4 rounded-full border-b-2 border-purple-500 animate-spin animation-delay-300"></div>
        </div>
        <p class="mt-4 text-slate-500 font-medium animate-pulse">Loading blog data...</p>
      </div>

      <div v-else-if="error" class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-xl p-10 text-center">
        <div class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="heroicons:exclamation-triangle" class="w-10 h-10 text-red-500" />
        </div>
        <h3 class="text-xl font-bold mb-2">Error Loading Blog</h3>
        <p class="text-slate-500 mb-6">{{ error.message || 'Blog not found' }}</p>
        <NuxtLink to="/admin" class="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
          Return to Dashboard
        </NuxtLink>
      </div>

      <div v-else-if="blog" class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden">
        <div class="px-5 py-6 sm:px-8 sm:py-10 border-b border-slate-100 dark:border-slate-700/50 bg-gradient-to-br from-indigo-50/50 to-transparent dark:from-indigo-900/10">
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Edit Blog Post</h2>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2">Update the content, status, and metadata of your article.</p>
        </div>
        
        <AdminBlogForm 
          :initialData="blog"
          :isEditing="true"
          :loading="saving" 
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

const route = useRoute()
const supabase = useSupabaseClient()

const saving = ref(false)
const errorMsg = ref('')

const { data: blog, pending, error } = await useAsyncData(`admin-blog-${route.params.id}`, async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', route.params.id)
    .single()
  
  if (error) throw error
  return data
})

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
    saving.value = true
    errorMsg.value = ''
    
    // Upload image first if exists
    if (imageFile) {
      form.image_url = await uploadImageToSupabase(imageFile)
    }

    const { error: updateError } = await supabase
      .from('blogs')
      .update(form)
      .eq('id', route.params.id)

    if (updateError) {
      if (updateError.code === '23505') {
        throw new Error('A blog post with this title/slug already exists.')
      }
      throw updateError
    }

    // Optional: show a success toast or just redirect
    navigateTo('/admin')
  } catch (err) {
    errorMsg.value = err.message
  } finally {
    saving.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) return
  
  try {
    saving.value = true
    const { error } = await supabase.from('blogs').delete().eq('id', route.params.id)
    if (error) throw error
    navigateTo('/admin')
  } catch (error) {
    alert('Error deleting blog: ' + error.message)
    saving.value = false
  }
}
</script>
