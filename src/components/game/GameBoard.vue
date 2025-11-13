<template>
  <div class="w-full max-w-5xl mx-auto px-4 py-8">
    <!-- Grade do jogo: Responsiva -->
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <FlipCard
        v-for="card in game.cards"
        :key="card.id"
        :id="card.id"
        :nome="card.nome"
        :fundo="card.fundo"
        :nivel="card.nivel"
        :imagem="card.imagem"
        :alt="card.alt"
        :descricao="card.descricao"
        :atk="card.atk"
        :def="card.def"
        :is-flipped="card.isFlipped"
        :is-matched="card.isMatched"
        @flip-card="game.flipCard"
      />
    </div>

    <!-- Modal - Game Over -->
    <div v-if="game.isGameOver" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div class="bg-slate-800 p-8 rounded-2xl shadow-cyan-500/20 shadow-xl text-center border-2 border-slate-700">
        <h2 class="text-4xl font-bold text-white mb-2">Parabéns!</h2>
        <p class="text-lg text-slate-300 mb-6">Você concluiu o jogo com sucesso!</p>
        <div class="flex justify-center gap-6 mb-6">
            <div class="text-center">
                <span class="text-md font-semibold text-cyan-400">PONTUAÇÃO FINAL</span>
                <p class="text-4xl font-bold text-white">{{ game.score }}</p>
            </div>
            <div class="text-center">
                <span class="text-md font-semibold text-cyan-400">MOVIMENTOS</span>
                <p class="text-4xl font-bold text-white">{{ game.moves }}</p>
            </div>
        </div>
        <button @click="game.initializeGame" class="w-full px-6 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 duration-300">
          Jogar Novamente
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGameStore } from '../../stores/game';
import FlipCard from './FlipCard.vue';

const game = useGameStore();

onMounted(() => {
  game.initializeGame();
});
</script>