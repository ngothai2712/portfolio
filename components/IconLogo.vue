<template>
  <h3 :class="[size]">T27</h3>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
h3 {
  @apply relative cursor-pointer p-2 text-3xl font-bold tracking-wider;
  border: 6px solid;
  border-image-slice: 1;
  -webkit-text-fill-color: transparent;
  overflow: hidden;

  &.small {
    @apply text-2xl;
  }

  &:before {
    position: absolute;
    top: -6px;
    left: -6px;
    opacity: 0.2;
    z-index: 9;
    animation: run linear 3s infinite;
    animation-direction: alternate;
    background-image: linear-gradient(45deg, #fff, #00ff95);
    width: 10px;
    height: calc(100% + 12px);
    content: '';
  }
}

@keyframes run {
  0% {
    left: -106px;
    width: 0;
  }

  50% {
    width: 20px;
  }

  100% {
    left: calc(100% - 4px + 100px);
    width: 0;
  }
}

:root {
  &:is(.dark) h3 {
    -webkit-background-clip: text;
    border-image-source: linear-gradient(315deg, #fff, #00ff95);
    background-image: linear-gradient(45deg, #fff, #00ff95);
  }

  &:not(.dark) h3 {
    -webkit-background-clip: text;
    border-image-source: linear-gradient(315deg, #09009f, #00ff95);
    background-image: linear-gradient(45deg, #09009f, #00ff95);
  }
}
</style>
