<template>
  <div
    class="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden"
  >
    <!-- Fundo animado de energia -->
    <div class="absolute inset-0 animate-[spin_60s_linear_infinite] opacity-25">
      <div
        class="absolute w-[160%] h-[160%] bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.25),_transparent_70%)]"
      ></div>
    </div>

    <!-- Dragões (apenas se showDragons = true) -->
    <div v-if="showDragons" class="absolute inset-0 z-0 hidden md:flex">
      <div
        class="absolute left-0 top-0 bottom-0 w-1/2 bg-[url('/images/dragon-left.png')] bg-cover bg-center bg-no-repeat transform -scale-x-100"
      ></div>
      <div
        class="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/images/dragon-right.png')] bg-cover bg-center bg-no-repeat"
      ></div>
    </div>

    <!-- Fundo mobile (apenas se showDragons = true) -->
    <div
      v-if="showDragons"
      class="absolute inset-0 z-0 md:hidden bg-[url('/images/tela-mobile.jpg')] bg-cover bg-center bg-no-repeat"
    ></div>

    <!-- Conteúdo das views -->
    <div class="relative z-10 w-full h-full flex items-center justify-center">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  showDragons: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>