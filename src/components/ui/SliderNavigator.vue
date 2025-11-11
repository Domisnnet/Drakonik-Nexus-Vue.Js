<template>
  <div
    class="relative flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-black via-indigo-950 to-black text-white overflow-hidden"
  >
    <!-- Container das setas e do card -->
    <div
      class="flex items-center justify-center w-full max-w-5xl gap-10 px-4 sm:px-6 md:px-12 lg:gap-20"
    >
      <!-- Botão Voltar -->
      <button
        @click="previousCard"
        class="bg-cyan-400/20 hover:bg-cyan-400/70 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-none cursor-pointer shadow-lg shadow-cyan-400/20 backdrop-blur-sm transition-all duration-300"
      >
        <img
          src="/images/seta.png"
          alt="seta voltar"
          class="w-8 h-8 invert rotate-180"
        />
      </button>

      <!-- Card Atual -->
      <FlipCard
        v-if="currentCard && currentCard.contentUrl"
        :card-id="currentCard.cardId"
        :fundo="currentCard.fundo"
        :is-matched="currentCard.isMatched"
        :card-state="currentCard.cardState"
        :content-url="currentCard.contentUrl"
        :alt="currentCard.alt"
        :nivel="currentCard.nivel"
        :descricao="currentCard.descricao"
        :atk="currentCard.atk"
        :def="currentCard.def"
        @click-event="handleFlip"
        class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      />

      <!-- Botão Avançar -->
      <button
        @click="nextCard"
        class="bg-cyan-400/20 hover:bg-cyan-400/70 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full border-none cursor-pointer shadow-lg shadow-cyan-400/20 backdrop-blur-sm transition-all duration-300"
      >
        <img
          src="/images/seta.png"
          alt="seta avançar"
          class="w-8 h-8 invert"
        />
      </button>
    </div>

    <!-- Setas no mobile -->
    <div
      class="flex md:hidden justify-center gap-8 mt-6"
    >
      <button
        @click="previousCard"
        class="bg-cyan-400/20 hover:bg-cyan-400/70 w-12 h-12 flex items-center justify-center rounded-full border-none cursor-pointer shadow-md shadow-cyan-400/20 backdrop-blur-sm transition-all duration-300"
      >
        <img src="/images/seta.png" alt="seta voltar" class="w-6 h-6 invert rotate-180" />
      </button>

      <button
        @click="nextCard"
        class="bg-cyan-400/20 hover:bg-cyan-400/70 w-12 h-12 flex items-center justify-center rounded-full border-none cursor-pointer shadow-md shadow-cyan-400/20 backdrop-blur-sm transition-all duration-300"
      >
        <img src="/images/seta.png" alt="seta avançar" class="w-6 h-6 invert" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import FlipCard from '@/components/game/FlipCard.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.initializeGame()
})

const currentCard = computed(() => gameStore.currentCard)

function handleFlip() {
  if (currentCard.value) gameStore.flipCard(currentCard.value.cardId)
}

function nextCard() {
  gameStore.nextCard()
}

function previousCard() {
  gameStore.previousCard()
}
</script>