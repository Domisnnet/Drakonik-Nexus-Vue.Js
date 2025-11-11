<template>
  <BaseLayout>
    <div
      class="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden"
    >
      <!-- Efeito de energia no fundo -->
      <div class="absolute inset-0 animate-rotateBg opacity-40">
        <div
          class="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25)_0%,transparent_70%)]"
        ></div>
      </div>

      <!-- Cartas -->
      <div class="relative flex items-center justify-center gap-6">
        <FlipCard
          v-for="(card, index) in cards"
          :key="index"
          :image="card.image"
          :title="card.title"
          :description="card.description"
        />
      </div>

      <!-- Navegação -->
      <div class="absolute bottom-10">
        <SliderNavigator />
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import BaseLayout from "@/components/layouts/BaseLayout.vue";
import BaseLayout from "@/components/layouts/BaseLayout.vue";
import FlipCard from "@/components/game/FlipCard.vue";

const cards = [
  {
    image: "/src/assets/cards/dragonsoul.jpg",
    title: "Dragonsoul",
    description: "A essência primordial dos dragões.",
  },
  {
    image: "/src/assets/cards/cosmosentinel.jpg",
    title: "Cosmo Sentinel",
    description: "Guardião do equilíbrio cósmico.",
  },
];
</script>