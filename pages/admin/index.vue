<template>
  <div class="min-h-screen bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 relative overflow-hidden">
    <!-- Background glowing effects -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

    <nav class="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
      <div class="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center gap-6">
          <h1 class="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admin Dashboard</h1>
          <NuxtLink to="/" class="text-sm font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1">
            <Icon name="heroicons:arrow-left" class="w-4 h-4" />
            View Site
          </NuxtLink>
        </div>
        <div class="flex items-center gap-4">
          <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span class="text-xs font-medium">{{ user?.email }}</span>
          </div>
          <button @click="handleLogout" class="text-sm px-4 py-2 rounded-lg font-medium bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 transition-colors focus:ring-2 focus:ring-rose-500/40 outline-none">
            Logout
          </button>
        </div>
      </div>
    </nav>
    
    <main class="max-w-7xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Blogs Management</h2>
          <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-xl">Manage your blog posts, monitor publish statuses, and create new content effortlessly.</p>
        </div>
        <NuxtLink to="/admin/blog/create" class="group inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5">
          <Icon name="heroicons:plus" class="mr-2 h-5 w-5 transition-transform group-hover:rotate-90" />
          Add New Blog
        </NuxtLink>
      </div>
      
      <div class="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-2xl shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/80 dark:border-slate-700/50 overflow-hidden">
        <div v-if="pending" class="flex flex-col justify-center items-center py-24">
          <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 dark:border-indigo-400"></div>
          <p class="mt-4 text-sm text-slate-500 font-medium animate-pulse">Loading blogs...</p>
        </div>
        
        <div v-else-if="blogs && blogs.length === 0" class="py-24 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
            <Icon name="heroicons:document-text" class="h-8 w-8 text-slate-400" />
          </div>
          <h3 class="text-lg font-semibold">No blogs found</h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">It's quiet here. Get started by writing your first post.</p>
        </div>

        <AdminBlogTable v-else :blogs="blogs" @delete="deleteBlog" />
      </div>
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth',
  layout: false
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const { data: blogs, pending, refresh } = await useAsyncData('admin-blogs', async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  navigateTo('/admin/login')
}

const deleteBlog = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.')) return
  
  try {
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (error) throw error
    await refresh()
  } catch (error) {
    alert('Lỗi khi xóa bài viết: ' + error.message)
  }
}
</script>
