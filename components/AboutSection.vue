<template>
  <section id="about" class="about">
    <div class="about-img">
      <img
        src="/info-img.jpg"
        alt=""
        width="350"
        height="350"
        class="about-img__large"
      />
    </div>

    <div class="about-content">
      <h3>ABOUT ME</h3>
      <p>A Front-End Developer</p>
      <p>
        As a Front-End Developer, I possess an impressive arsenal of skills in
        HTML, CSS, JavaScript, VueJS, NuxtJS, Tailwind, and SCSS. I excel in
        designing and maintaining responsive websites that offer a smooth user
        experience.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.about {
  @apply flex flex-col items-center justify-center py-32 md:flex-row md:justify-between md:py-20;

  &-content {
    @apply flex flex-col text-center md:text-left;
  }
}

.about-img {
  &__large {
    @apply h-[350px] w-[350px] min-w-[350px];
  }
}
</style>
