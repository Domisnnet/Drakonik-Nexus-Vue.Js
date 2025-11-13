<template>
  <div 
    class="flex items-center justify-center w-full"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <!-- Card Atual -->
    <div class="w-64 h-96 cursor-pointer select-none">
      <FlipCard
        v-if="currentCard"
        :key="currentCard.id" 
        :card-id="currentCard.id"
        :pair-value="currentCard.pairValue"
        :nome="currentCard.nome"
        :fundo="currentCard.fundo"
        :nivel="currentCard.nivel"
        :imagem="currentCard.imagem"
        :alt="currentCard.alt"
        :descricao="currentCard.descricao"
        :atk="currentCard.atk"
        :def="currentCard.def"
        :is-flipped="true" 
        :is-matched="false"
      />
      <div v-else class="text-white text-center">
        Carregando cartas...
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/game';
import FlipCard from '@/components/game/FlipCard.vue';

const gameStore = useGameStore();

// Lógica para encontrar o card a ser exibido
const currentCardIndex = ref(0);
const currentCard = computed(() => {
  if (gameStore.cards.length > 0) {
    return gameStore.cards[currentCardIndex.value];
  }
  return null;
});

// Garante que os dados das cartas sejam carregados
onMounted(() => {
  if (gameStore.cards.length === 0) {
    gameStore.initializeGame(); 
  }
});

// Funções de navegação
function nextCard() {
  if (gameStore.cards.length > 0) {
    currentCardIndex.value = (currentCardIndex.value + 1) % gameStore.cards.length;
  }
}

function previousCard() {
  if (gameStore.cards.length > 0) {
    currentCardIndex.value = (currentCardIndex.value - 1 + gameStore.cards.length) % gameStore.cards.length;
  }
}

// Lógica de Swipe
const touchStartX = ref(0);
const touchThreshold = 50; // Distância mínima de swipe em pixels

function handleTouchStart(event: TouchEvent) {
  if (event.changedTouches.length === 0) return;
  touchStartX.value = event.changedTouches[0].screenX;
}

function handleTouchEnd(event: TouchEvent) {
  if (event.changedTouches.length === 0) return;
  const touchEndX = event.changedTouches[0].screenX;
  const deltaX = touchEndX - touchStartX.value;

  if (deltaX > touchThreshold) {
    // Swipe para a Direita
    previousCard();
  } else if (deltaX < -touchThreshold) {
    // Swipe para a Esquerda
    nextCard();
  }
}
</script>