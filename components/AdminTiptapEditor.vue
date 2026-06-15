<template>
  <div class="border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col w-full">
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('bold') }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 text-gray-700 dark:text-gray-300 font-bold"
        title="Bold"
      >
        B
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('italic') }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 text-gray-700 dark:text-gray-300 italic"
        title="Italic"
      >
        I
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('strike') }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 text-gray-700 dark:text-gray-300 line-through"
        title="Strikethrough"
      >
        S
      </button>
      
      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('paragraph') }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm font-medium"
        title="Paragraph"
      >
        P
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('heading', { level: 2 }) }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm font-bold"
        title="Heading 2"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('heading', { level: 3 }) }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm font-bold"
        title="Heading 3"
      >
        H3
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('bulletList') }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm font-medium"
        title="Bullet List"
      >
        • List
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('orderedList') }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm font-medium"
        title="Ordered List"
      >
        1. List
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'bg-gray-200 dark:bg-gray-700 text-primary-600': editor.isActive('blockquote') }"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm font-medium"
        title="Blockquote"
      >
        " Quote
      </button>

      <div class="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <button
        @click="triggerImageUpload"
        :disabled="isUploading"
        class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300 text-sm font-medium flex items-center gap-1 disabled:opacity-50"
        title="Upload Image"
      >
        <Icon name="heroicons:photo" class="w-4 h-4" />
        <span v-if="isUploading" class="text-xs">Đang tải...</span>
      </button>
      <input type="file" ref="fileInput" @change="uploadImage" accept="image/*" class="hidden" />
    </div>

    <!-- Editor Content -->
    <div class="p-4 flex-1 overflow-y-auto min-h-[300px]">
      <editor-content :editor="editor" class="prose prose-sm sm:prose-base dark:prose-invert max-w-none focus:outline-none" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

const supabase = useSupabaseClient()

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image.configure({
      HTMLAttributes: {
        class: 'rounded-xl shadow-lg my-4 max-w-full h-auto',
      },
    }),
  ],
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-sm sm:prose-base focus:outline-none max-w-none',
    },
  },
  onUpdate: () => {
    emit('update:modelValue', editor.value.getHTML())
  },
})

// Update editor content when external modelValue changes (e.g. initial load from DB)
watch(() => props.modelValue, (value) => {
  const isSame = editor.value.getHTML() === value
  if (!isSame) {
    editor.value.commands.setContent(value, false)
  }
})

onBeforeUnmount(() => {
  editor.value.destroy()
})

const fileInput = ref(null)
const isUploading = ref(false)

const triggerImageUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const uploadImage = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (file.size > 5 * 1024 * 1024) {
    alert('Kích thước ảnh phải nhỏ hơn 5MB')
    event.target.value = ''
    return
  }

  isUploading.value = true
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `blog-content/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath)

    editor.value.chain().focus().setImage({ src: publicUrl }).run()
  } catch (error) {
    console.error('Error uploading image:', error)
    alert('Tải ảnh lên thất bại!')
  } finally {
    isUploading.value = false
    event.target.value = ''
  }
}
</script>

<style>
/* Tiptap removes the default focus outline which is good, but we can add cursor styles or other minor tweaks if needed */
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
