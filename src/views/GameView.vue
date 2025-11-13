<template>
  <div class="flex flex-col items-center justify-start w-full min-h-screen p-4 overflow-y-auto bg-gray-900/50">
    
    <!-- Placar e Controles -->
    <div class="w-full max-w-6xl mb-4 p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-between shadow-lg sticky top-4 z-10">
      <div class="flex gap-4 md:gap-6 text-white">
        <div class="text-center">
          <span class="text-xs text-cyan-300 uppercase font-semibold">Pontuação</span>
          <p class="text-xl md:text-2xl font-bold">{{ gameStore.score }}</p>
        </div>
        <div class="text-center">
          <span class="text-xs text-cyan-300 uppercase font-semibold">Movimentos</span>
          <p class="text-xl md:text-2xl font-bold">{{ gameStore.moves }}</p>
        </div>
      </div>
      <div class="flex gap-2">
        <button @click="restartGame" class="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-md transition-colors shadow-md">
          Reiniciar
        </button>
        <router-link to="/" class="px-4 py-2 text-sm font-semibold text-white bg-slate-600 hover:bg-slate-500 rounded-md transition-colors shadow-md">
          Início
        </router-link>
      </div>
    </div>

    <!-- Alerta de Fim de Jogo -->
    <div v-if="gameStore.isGameOver" class="w-full max-w-6xl my-4 p-4 rounded-lg bg-green-500/90 text-white text-center shadow-2xl backdrop-blur-sm border border-green-300">
      <h2 class="text-2xl font-bold">Parabéns! Você venceu!</h2>
      <p>Sua pontuação final foi {{ gameStore.score }} em {{ gameStore.moves }} movimentos.</p>
    </div>

    <GameBoard />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import GameBoard from '@/components/game/GameBoard.vue';

const gameStore = useGameStore();

const restartGame = () => {
  gameStore.initializeGame();
};

</script>