<template>
    <div
      class="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden"
    >
      <!-- Efeito de energia no fundo -->
      <div class="absolute inset-0 animate-rotateBg opacity-40">
        <div
          class="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(138,43,226,0.4),transparent_70%)]"
        ></div>
      </div>
  
      <!-- Fundo dos dragões -->
      <div v-if="showDragons" class="absolute inset-0 z-0 hidden md:flex">
        <div
          class="absolute left-0 top-0 bottom-0 w-1/2 bg-[url('/images/dragon-left.png')] bg-cover bg-center bg-no-repeat transform -scale-x-100"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/images/dragon-right.png')] bg-cover bg-center bg-no-repeat"
        ></div>
      </div>
  
      <!-- Fundo Mobile -->
      <div
        v-if="showDragons"
        class="absolute inset-0 z-0 md:hidden bg-[url('/images/tela-mobile.jpg')] bg-cover bg-center bg-no-repeat"
      ></div>
  
      <!-- Slot do conteúdo -->
      <main class="relative z-10 w-full h-full flex items-center justify-center">
        <slot></slot>
      </main>
    </div>
</template>
  
<script setup>
  defineProps({
    showDragons: {
      type: Boolean,
      default: false,
    },
  });
</script>
  
<style scoped>
  @keyframes rotateBg {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .animate-rotateBg {
    animation: rotateBg 40s linear infinite;
  }
</style>  