<template>
  <div v-memo="[content]" class="px-4 md:px-8 pb-8 md:pb-12">
    <div 
      ref="contentRef"
      class="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none
      prose-headings:font-extrabold prose-headings:tracking-tighter prose-headings:leading-none prose-headings:scroll-mt-24
      prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 
      prose-img:rounded-3xl prose-img:shadow-2xl 
      prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:rounded-r-2xl prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300
      prose-strong:text-slate-900 dark:prose-strong:text-white"
      v-html="sanitizedContent"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, nextTick, computed } from 'vue'
import DOMPurify from 'isomorphic-dompurify'

const props = defineProps({
  content: {
    type: String,
    required: true
  }
})

const sanitizedContent = computed(() => {
  return DOMPurify.sanitize(props.content, {
    ALLOWED_TAGS: ['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'iframe', 'p', 'br', 'b', 'i', 'em', 'strong', 'a', 'pre', 'code', 'ul', 'ol', 'li', 'blockquote', 'span', 'div'],
    ALLOWED_ATTR: ['class', 'style', 'id', 'data-*', 'src', 'alt', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder', 'href', 'target', 'rel'],
  })
})

const emit = defineEmits(['update:toc', 'update:activeId'])

const contentRef = ref(null)
let observer = null

const buildToc = () => {
  if (!contentRef.value) return
  
  if (observer) {
    observer.disconnect()
  }

  const toc = []
  const headings = contentRef.value.querySelectorAll('h2, h3')
  
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`
    }
    
    toc.push({
      id: heading.id,
      text: heading.innerText,
      level: parseInt(heading.tagName.substring(1))
    })
  })

  emit('update:toc', toc)

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          emit('update:activeId', entry.target.id)
        }
      })
    },
    { 
      rootMargin: '-100px 0px -40% 0px',
      threshold: 0
    }
  )

  headings.forEach((h) => observer.observe(h))
}

watch(() => props.content, async (newVal) => {
  if (newVal) {
    await nextTick()
    setTimeout(() => {
      buildToc()
    }, 100)
  }
}, { immediate: true })

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>
