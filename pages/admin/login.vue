<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0B1120] px-4 relative overflow-hidden transition-colors duration-500">
    <!-- Ambient Background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[25%] -left-[10%] w-[70%] h-[50%] bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
      <div class="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-gradient-to-bl from-cyan-400/20 to-blue-600/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse-slow animation-delay-500"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <div class="bg-white/80 dark:bg-slate-800/80 backdrop-blur-2xl rounded-[2rem] p-10 shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-6 shadow-sm border border-blue-100 dark:border-blue-800/50">
            <Icon name="heroicons:lock-closed" class="w-8 h-8" />
          </div>
          <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back</h1>
          <p class="text-slate-500 dark:text-slate-400">Sign in to manage your portfolio</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="heroicons:at-symbol" class="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 pl-10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:placeholder-slate-500 transition-all"
                placeholder="admin@example.com"
              />
            </div>
          </div>
          
          <div>
            <label for="password" class="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="heroicons:lock-closed" class="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="password"
                v-model="password"
                type="password"
                required
                class="w-full rounded-xl border border-slate-200 bg-white/50 px-4 py-3 pl-10 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-slate-700 dark:bg-slate-900/50 dark:text-white dark:placeholder-slate-500 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div v-if="errorMsg" class="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/50">
            <Icon name="heroicons:exclamation-circle" class="w-5 h-5 flex-shrink-0" />
            {{ errorMsg }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icon v-if="loading" name="heroicons:arrow-path" class="animate-spin h-5 w-5 text-white" />
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

watchEffect(() => {
  if (user.value) {
    navigateTo('/admin')
  }
})

const handleLogin = async () => {
  try {
    loading.value = true
    errorMsg.value = ''
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) throw error
    // Automatically redirects due to watchEffect if successful
  } catch (error) {
    errorMsg.value = error.message
  } finally {
    loading.value = false
  }
}
</script>
