export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()

  if (!user.value && to.path.startsWith('/admin')) {
    return navigateTo('/admin/login')
  }
})
