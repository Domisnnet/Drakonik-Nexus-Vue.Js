<template>
  <div
    class="relative flex flex-col md:flex-row items-center justify-center min-h-screen w-full 
           bg-gradient-to-b from-black via-indigo-950 to-black overflow-hidden gap-10 p-4"
  >
    <!-- Efeito de energia no fundo -->
    <div
      class="absolute inset-0 bg-[url('/images/energia-bg.png')] bg-cover bg-center 
             opacity-20 animate-pulse"
    ></div>

    <!-- Botão Voltar -->
    <button
      class="btn-seta rotate-180"
      @click="previousCard"
    >
      <img src="/images/seta.png" alt="Voltar" />
    </button>

    <!-- Card Central -->
    <FlipCard
      v-if="currentCard"
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
    />

    <!-- Botão Avançar -->
    <button
      class="btn-seta"
      @click="nextCard"
    >
      <img src="/images/seta.png" alt="Avançar" />
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import FlipCard from '@/components/game/FlipCard.vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

onMounted(() => {
  gameStore.initializeGame();
});

const currentCard = computed(() => gameStore.currentCard);

function handleFlip() {
  gameStore.flipCard(currentCard.value.cardId);
}

function nextCard() {
  gameStore.nextCard();
}

function previousCard() {
  gameStore.previousCard();
}
</script>

<style scoped>
/* Botões de seta */
.btn-seta {
  background-color: rgba(0, 240, 255, 0.2);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.5),
              inset 0 0 0 3px rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 10;
}

.btn-seta:hover {
  background-color: rgba(0, 240, 255, 0.7);
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.9),
              inset 0 0 0 3px rgba(255, 255, 255, 1);
  transform: scale(1.05);
}

.btn-seta img {
  width: 40px;
  height: 40px;
  filter: invert(1);
  transition: transform 0.3s ease-in-out;
}

/* Responsividade */
@media (max-width: 768px) {
  .btn-seta {
    width: 55px;
    height: 55px;
  }

  .btn-seta img {
    width: 30px;
    height: 30px;
  }

  .flex {
    flex-direction: column;
    gap: 40px;
  }
}
</style>