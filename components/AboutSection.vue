<template>
  <section id="about">
    <div class="container">
      <div class="about">
        <div class="about-img">
          <img
            src="/about.svg"
            alt="About Ngo Hoang Thai - Front-End Developer illustration"
            width="320"
            height="320"
            class="about-img__large"
            loading="lazy"
          />
        </div>

        <div class="about-content">
          <h2 class="content-heading">ABOUT ME</h2>
          <p class="content-title">A Front-End Developer</p>
          <p class="content-description">
            As a Front-End Developer, I possess an impressive arsenal of skills
            in HTML, CSS, JavaScript, TypeScript, VueJS, NuxtJS, Tailwind, and
            SCSS. I excel in designing and maintaining responsive websites that
            offer a smooth user experience.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
#about {
  @apply dark:border-b dark:border-t dark:border-slate-300/10;
}

.about {
  @apply flex flex-col items-center justify-center gap-10 py-24 md:flex-row md:justify-between md:gap-24 md:py-32;

  &-content {
    @apply flex flex-col text-center md:text-left;
  }
}

.about-img {
  &__large {
    @apply m-auto h-full w-[90%] rounded-4xl md:h-[350px] md:w-[350px] md:min-w-[350px];
  }
}

.content {
  &-heading {
    @apply text-sm font-semibold uppercase tracking-widest text-blue-600;
  }

  &-title {
    @apply mb-6 mt-3 text-3xl font-bold tracking-tight dark:text-white md:text-4xl;
  }

  &-description {
    @apply max-w-[65ch] text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg;
  }
}
</style>
