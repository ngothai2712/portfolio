<template>
  <form @submit.prevent="handleSubmit" class="px-5 sm:px-8 py-8 sm:py-10 space-y-8">
    <div v-if="errorMsg" class="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm dark:bg-red-900/20 dark:border-red-900/50 dark:text-red-400 flex items-center gap-3">
      <Icon name="heroicons:exclamation-circle" class="w-5 h-5 flex-shrink-0" />
      {{ errorMsg }}
    </div>

    <!-- Title & Slug -->
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <div class="space-y-2">
        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">Title</label>
        <input 
          v-model="form.title" 
          @input="generateSlug"
          type="text" 
          required
          placeholder="Enter blog title"
          class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
        />
      </div>
      
      <div class="space-y-2">
        <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">Slug</label>
        <div class="flex items-center relative">
          <span class="absolute left-4 text-slate-400 text-sm">/blog/</span>
          <input 
            v-model="form.slug" 
            type="text" 
            required
            placeholder="url-slug"
            class="w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
          />
        </div>
      </div>
    </div>

    <!-- Description -->
    <div class="space-y-2">
      <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">Short Description</label>
      <textarea 
        v-model="form.description" 
        rows="2" 
        required
        placeholder="Brief summary of the blog post (used for SEO and preview cards)"
        class="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none"
      ></textarea>
    </div>

    <!-- Featured Image -->
    <div class="space-y-4">
      <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">Featured Image</label>
      <div class="flex flex-col sm:flex-row items-start gap-6">
        <div 
          v-if="previewImage || form.image_url" 
          class="relative w-full sm:w-64 aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group bg-slate-100 dark:bg-slate-800"
        >
          <NuxtImg :src="previewImage || form.image_url" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button type="button" @click="removeImage" class="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform hover:scale-110">
              <Icon name="heroicons:trash" class="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div class="flex-1 w-full">
          <label class="flex justify-center w-full h-32 px-4 transition bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-xl appearance-none cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none">
            <span class="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
              <Icon name="heroicons:arrow-up-tray" class="w-6 h-6" />
              <span class="font-medium">Click to upload image</span>
            </span>
            <input type="file" name="file_upload" class="hidden" accept="image/*" @change="handleImageUpload">
          </label>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">Recommended: 1200x630px. Max size 5MB.</p>
        </div>
      </div>
    </div>

    <!-- Content Editor -->
    <div class="space-y-2">
      <label class="block text-sm font-bold text-slate-700 dark:text-slate-300">Content</label>
      <AdminTiptapEditor v-model="form.content" />
    </div>

    <!-- Publish Options -->
    <div class="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div class="flex items-center justify-between">
        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">Publish Status</h4>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Make this blog visible to the public.</p>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="form.is_published" class="sr-only peer">
          <div class="w-14 h-7 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>

    <!-- Submit Action -->
    <div class="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 dark:border-slate-800">
      <div class="w-full sm:w-auto flex justify-center">
        <NuxtLink 
          v-if="isEditing && form.slug" 
          :to="`/blog/${form.slug}`" 
          target="_blank" 
          class="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 transition-colors"
        >
          <Icon name="heroicons:eye" class="w-4 h-4 mr-2" />
          Preview Blog
        </NuxtLink>
      </div>
      <div class="w-full sm:w-auto flex justify-end gap-4">
        <NuxtLink to="/admin" class="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors flex-1 sm:flex-none text-center">
          Cancel
        </NuxtLink>
        <button 
          type="submit" 
          :disabled="loading"
          class="inline-flex justify-center items-center px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 flex-1 sm:flex-none"
        >
          <Icon v-if="loading" name="heroicons:arrow-path" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
          <Icon v-else name="heroicons:document-arrow-down" class="w-5 h-5 mr-2" />
          {{ isEditing ? 'Update Blog' : 'Publish Blog' }}
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => null
  },
  isEditing: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  errorMsg: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit'])

const form = reactive({
  title: '',
  slug: '',
  description: '',
  content: '',
  image_url: '',
  is_published: false
})

const imageFile = ref(null)
const previewImage = ref(null)

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.title = newVal.title || ''
    form.slug = newVal.slug || ''
    form.description = newVal.description || ''
    form.content = newVal.content || ''
    form.image_url = newVal.image_url || ''
    form.is_published = newVal.is_published || false
  }
}, { immediate: true })

const generateSlug = () => {
  if (props.isEditing) return // Prevent auto-changing slug on edit unless user explicitly types
  if (!form.title) return
  form.slug = form.title
    .toLowerCase()
    .trim()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, '')
    .replace(/(\s+)/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (file.size > 5 * 1024 * 1024) {
    emit('update:errorMsg', 'Image size should be less than 5MB')
    return
  }
  
  imageFile.value = file
  previewImage.value = URL.createObjectURL(file)
}

const removeImage = () => {
  imageFile.value = null
  previewImage.value = null
  form.image_url = ''
}

const handleSubmit = () => {
  emit('submit', { form, imageFile: imageFile.value })
}
</script>
