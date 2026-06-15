<template>
  <div v-if="toc.length > 0" class="lg:hidden">
    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
        @click="$emit('update:isOpen', false)"
      ></div>
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition-transform duration-300 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div 
        v-if="isOpen"
        class="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-slate-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] max-h-[80vh] flex flex-col border-t border-slate-200 dark:border-slate-800"
      >
        <div class="p-5 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
          <h3 class="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-sm">Mục lục</h3>
          <button @click="$emit('update:isOpen', false)" class="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors">
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
        
        <nav class="p-5 overflow-y-auto flex-1 custom-scrollbar flex flex-col space-y-1">
          <a 
            v-for="item in toc" 
            :key="item.id" 
            :href="`#${item.id}`"
            @click.prevent="$emit('scrollTo', item.id)"
            :class="[
              'block transition-all duration-200 border-l-2 py-2.5',
              item.level === 3 ? 'pl-8 text-sm' : 'pl-4 text-base font-medium',
              activeId === item.id 
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20' 
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600'
            ]"
          >
            {{ item.text }}
          </a>
        </nav>
      </div>
    </Transition>

    <!-- Floating Button -->
    <button 
      @click="$emit('update:isOpen', true)"
      class="fixed bottom-6 right-6 z-[50] p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 transition-all focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-105 active:scale-95"
    >
      <Icon name="heroicons:bars-3-bottom-left" class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup>
defineProps({
  toc: {
    type: Array,
    required: true
  },
  activeId: {
    type: String,
    required: true
  },
  isOpen: {
    type: Boolean,
    required: true
  }
})

defineEmits(['scrollTo', 'update:isOpen'])
</script>
