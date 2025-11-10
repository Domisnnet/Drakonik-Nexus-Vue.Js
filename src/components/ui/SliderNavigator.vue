<template>
    <div class="flex flex-col md:flex-row items-center justify-center gap-8 p-6">
      <div class="flex gap-4 order-2 md:order-1">
        <button class="w-16 h-16 rounded-full flex items-center justify-center bg-cyan-400/20 hover:bg-cyan-500" @click="previousCard" aria-label="Voltar">
          <img src="/images/seta.png" alt="voltar" class="w-8 h-8 rotate-180" />
        </button>
  
        <button class="w-16 h-16 rounded-full flex items-center justify-center bg-cyan-400/20 hover:bg-cyan-500" @click="nextCard" aria-label="Avançar">
          <img src="/images/seta.png" alt="avançar" class="w-8 h-8" />
        </button>
      </div>
  
      <div class="order-1 md:order-2 w-full max-w-md">
        <FlipCard
          v-if="currentCard"
          :fundo="currentCard.fundo"
          :card-state="currentCard.cardState"
          :content-url="currentCard.imagem"
          :alt="currentCard.alt"
          :nivel="currentCard.nivel"
          :descricao="currentCard.descricao"
          :atk="currentCard.atk"
          :def="currentCard.def"
          @click-event="handleFlip"
        />
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  import FlipCard from '@/components/game/FlipCard.vue'
  import { useGameStore } from '@/stores/game'
  
  const gameStore = useGameStore()
  
  onMounted(() => {
    if (gameStore.cards.length === 0) gameStore.initializeGame()
  })
  
  const currentCard = computed(() => gameStore.currentCard)
  
  function handleFlip() {
    gameStore.flipCardCurrent()
  }
  
  function nextCard() {
    gameStore.nextCard()
  }
  
  function previousCard() {
    gameStore.previousCard()
  }
</script>
  
<style scoped></style>  