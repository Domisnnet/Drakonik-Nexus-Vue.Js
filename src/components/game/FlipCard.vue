<template>
  <div
    class="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden"
  >
    <!-- Efeito de energia no fundo -->
    <div class="absolute inset-0 animate-rotateBg opacity-40">
      <div
        class="absolute w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)]"
      ></div>
    </div>

    <!-- Cabeçalho -->
    <header
      class="z-10 text-center mb-6 drop-shadow-[0_0_10px_rgba(147,51,234,0.8)]"
    >
      <h1
        class="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-500 to-purple-700 bg-clip-text text-transparent"
      >
        Deakonik Nexus!
      </h1>
      <p class="text-sm uppercase tracking-widest text-indigo-300 mt-2">
        Duel Arena
      </p>
    </header>

    <!-- Tabuleiro -->
    <main
      class="z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 max-w-6xl"
    >
      <FlipCard
        v-for="card in gameStore.cards"
        :key="card.id"
        :fundo="card.fundo"
        :card-state="card.cardState"
        :content-url="card.contentUrl"
        :alt="card.alt"
        :nivel="card.nivel"
        :descricao="card.descricao"
        :atk="card.atk"
        :def="card.def"
        @click-event="gameStore.handleCardClick(card.id)"
        class="transition-transform duration-500 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]"
      />
    </main>

    <!-- Efeitos de partícula -->
    <div class="absolute inset-0 pointer-events-none">
      <div
        v-for="i in 25"
        :key="i"
        class="absolute bg-blue-400/30 rounded-full animate-pulseParticle"
        :style="{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 2}px`,
          height: `${Math.random() * 4 + 2}px`,
          animationDelay: `${Math.random() * 4}s`,
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import FlipCard from "./game/FlipCard.vue";
import { useGameStore } from "../stores/game";

const gameStore = useGameStore();

onMounted(() => {
  if (gameStore.cards.length === 0) {
    gameStore.initializeGame();
  }
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
  animation: rotateBg 30s linear infinite;
}

@keyframes pulseParticle {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.6); }
}
.animate-pulseParticle {
  animation: pulseParticle 3s ease-in-out infinite;
}
</style>