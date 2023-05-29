<template>
  <section id="home">
    <div class="container">
      <div class="info">
        <div class="info-main">
          <h1>Front End Developer</h1>
          <p class="info-description">
            Hi, I'm Ngo Hoang Thai. A Front-end Developer.
          </p>
          <ul class="info-contact">
            <li v-for="contact in contactUrl" :key="contact.name">
              <a :href="contact.url" rel="noreferrer" target="_blank">
                <img
                  :src="`/${contact.name}.svg`"
                  :alt="contact.name"
                  width="30"
                  height="30"
                  loading="lazy"
                  class="info-icon"
                />
              </a>
            </li>
          </ul>
        </div>
        <div class="info-img"></div>
      </div>

      <div class="tech">
        <p class="tech-text">Tech Stack</p>
        <ul class="tech-skills">
          <li v-for="img in techStacks" :key="img">
            <img
              :src="`/${img}.svg`"
              :alt="img"
              width="30"
              height="30"
              loading="lazy"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const contactUrl = [
  {
    name: 'github',
    url: 'https://github.com/ngothai2712',
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/ngothai2712',
  },
];

const techStacks = [
  'html',
  'css',
  'javascript',
  'typescript',
  'vue',
  'nuxt',
  'tailwind',
  'scss',
];
</script>

<style scoped lang="scss">
h1 {
  @apply mb-3 text-3xl font-bold dark:text-white md:mb-4 md:text-6xl;
}

#home {
  @apply flex items-center bg-stone-50 pb-12 pt-32 dark:bg-slate-900 md:h-screen md:pb-0 md:pt-0;
}

.container {
  @apply mx-auto;
}

.info {
  @apply flex flex-wrap items-center justify-center gap-10 md:flex-nowrap md:justify-between;

  &-main {
    @apply order-1 text-center md:order-none md:text-left;
  }

  &-description {
    @apply text-gray-500 dark:text-gray-400;
  }

  &-icon {
    @apply dark:invert;
  }

  &-img {
    @apply h-[240px] w-[240px] min-w-[240px]
    border-4 bg-[url('/info.webp')] bg-cover bg-center bg-no-repeat md:h-[350px] md:w-[350px] md:min-w-[350px];
    animation: morph 8s ease-in-out infinite;
  }

  &-contact {
    @apply mt-4 flex justify-center gap-5 md:justify-start;
  }
}

@keyframes morph {
  0% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }

  50% {
    border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
  }

  100% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  }
}

.tech {
  @apply mt-8 flex flex-col flex-wrap items-center gap-10 md:mt-16 md:flex-row;

  &-text {
    @apply whitespace-nowrap border-b-2 border-b-gray-400 text-xl font-semibold dark:text-white md:border-b-0 md:border-r-2 md:border-r-gray-400 md:pr-4;
  }

  &-skills {
    @apply inline-flex flex-wrap justify-center gap-5 md:justify-start;

    li {
      @apply flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md dark:bg-slate-300/10;
    }
  }
}
</style>
