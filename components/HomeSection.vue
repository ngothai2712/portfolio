<template>
  <section id="home" ref="sectionRef">
    <div class="container">
      <div class="info">
        <div class="info-main">
          <h1 class="sr-only">
            Ngo Hoang Thai - Front End Developer Portfolio
          </h1>
          <p aria-hidden="true" class="role-title">Front End Developer</p>
          <h2 class="info-description">
            Hi, I'm Ngo Hoang Thai. A Front-end Developer.
          </h2>
          <ul class="info-contact">
            <li v-for="contact in contactUrl" :key="contact.name">
              <a
                :href="contact.url"
                rel="noreferrer"
                target="_blank"
                :aria-label="contact.name + ' profile'"
              >
                <Icon
                  :name="contact.icon"
                  class="w-[30px] h-[30px] dark:text-white hover:scale-110 transition-transform duration-300"
                />
              </a>
            </li>
          </ul>
        </div>
        <NuxtImg
          src="/info.webp"
          alt="Ngo Hoang Thai - Front End Developer Profile Picture"
          class="info-img"
          width="350"
          height="350"
          fetchpriority="high"
          preload
        />
      </div>

      <div class="tech">
        <h2 class="tech-text">Tech Stack</h2>
        <ul class="tech-skills tech-stack-list">
          <li v-for="tech in techStacks" :key="tech.name" class="tech-item">
            <a
              :href="tech.url"
              target="_blank"
              rel="noreferrer"
              :aria-label="tech.name"
              class="flex h-full w-full items-center justify-center rounded-full"
            >
              <Icon
                :name="tech.icon"
                class="w-[30px] h-[30px]"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="tech tech--tools">
        <h2 class="tech-text">Tools</h2>
        <ul class="tech-skills tech-tools-list">
          <li v-for="tool in tools" :key="tool.name" class="tech-item">
            <a
              :href="tool.url"
              target="_blank"
              rel="noreferrer"
              :aria-label="tool.name"
              class="flex h-full w-full items-center justify-center rounded-full"
            >
              <Icon
                :name="tool.icon"
                class="w-[30px] h-[30px]"
                :class="{'dark:text-white': tool.name === 'github'}"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';

const contactUrl = [
  {
    name: 'github',
    url: 'https://github.com/ngothai2712',
    icon: 'mdi:github'
  },
  {
    name: 'linkedin',
    url: 'https://www.linkedin.com/in/ngothai2712',
    icon: 'devicon:linkedin'
  },
];

const techStacks = [
  { name: 'html', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', icon: 'logos:html-5' },
  { name: 'css', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', icon: 'logos:css-3' },
  {
    name: 'javascript',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    icon: 'logos:javascript'
  },
  { name: 'typescript', url: 'https://www.typescriptlang.org/', icon: 'logos:typescript-icon' },
  { name: 'vue', url: 'https://vuejs.org/', icon: 'logos:vue' },
  { name: 'nuxt', url: 'https://nuxt.com/', icon: 'logos:nuxt-icon' },
  { name: 'tailwind', url: 'https://tailwindcss.com/', icon: 'logos:tailwindcss-icon' },
  { name: 'scss', url: 'https://sass-lang.com/', icon: 'logos:sass' },
];

const tools = [
  { name: 'github', url: 'https://github.com/', icon: 'mdi:github' },
  { name: 'gitlab', url: 'https://about.gitlab.com/', icon: 'logos:gitlab' },
  { name: 'docker', url: 'https://www.docker.com/', icon: 'logos:docker-icon' },
  { name: 'nginx', url: 'https://nginx.org/', icon: 'logos:nginx' },
  { name: 'figma', url: 'https://www.figma.com/', icon: 'logos:figma' },
];

const sectionRef = ref(null);
let ctx: gsap.Context;

onMounted(() => {
  if (!sectionRef.value) return;
  
  ctx = gsap.context(() => {
    // 1. Animate main intro text & buttons
    gsap.from('.info-main > *', {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });

    // 2. Animate profile image
    gsap.from('.info-img', {
      scale: 0.5,
      opacity: 0,
      rotation: 5,
      duration: 1.2,
      ease: 'back.out(1.5)',
      delay: 0.2
    });

    // 3. Animate Tech Stack
    gsap.from('.tech-text', {
      x: -30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.5,
      stagger: 0.2
    });

    gsap.from('.tech-item', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'back.out(1.2)',
      delay: 0.8
    });
  }, sectionRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped lang="scss">
.role-title {
  @apply mb-4 text-4xl font-extrabold tracking-tighter dark:text-white md:mb-6 md:text-6xl md:leading-[1.1];
}

#home {
  @apply flex items-center bg-stone-50 pb-12 pt-24 dark:bg-slate-900 md:min-h-[100dvh] md:pb-0 md:pt-0;
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
    @apply mt-2 text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:max-w-[65ch] md:text-xl;
  }


  &-img {
    @apply h-[240px] w-[240px] min-w-[240px] border-4 object-cover object-center md:h-[350px] md:w-[350px] md:min-w-[350px];
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
  @apply mt-12 flex flex-col flex-wrap items-center gap-10 md:mt-24 md:flex-row;

  &--tools {
    @apply mt-6 md:mt-10;
  }

  &-text {
    @apply whitespace-nowrap border-b-2 border-b-gray-400 text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 md:w-[140px] md:border-b-0 md:border-r-2 md:border-r-gray-400 md:pr-6;
  }

  &-skills {
    @apply inline-flex flex-wrap justify-center gap-5 md:justify-start;

    li {
      @apply flex h-[60px] w-[60px] items-center justify-center rounded-full bg-white shadow-md dark:bg-slate-300/10;
    }
  }
}
</style>
