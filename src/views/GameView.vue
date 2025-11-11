<template>
  <div class="game-container">
    <!-- Fundo do jogo -->
    <div class="background-overlay"></div>

    <!-- Área principal do jogo -->
    <div class="game-content">
      <h1 class="title">Drakonik Nexus</h1>

      <!-- Card principal -->
      <div class="card-area">
        <FlipCard />
      </div>

      <!-- Controles ou navegação -->
      <router-link to="/" class="return-link">Voltar à Tela Inicial</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import FlipCard from "@/components/FlipCard.vue";
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center, #0d001a, #000);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-overlay {
  position: absolute;
  inset: 0;
  background-image: url("/images/fundo-carta.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.25;
  filter: blur(8px);
}

.game-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #c084fc;
  text-shadow: 0 0 15px rgba(180, 70, 255, 0.8);
  margin-bottom: 2rem;
}

.card-area {
  width: 320px;
  height: 480px;
  margin-bottom: 2rem;
}

.return-link {
  color: #a855f7;
  font-size: 1.1rem;
  text-decoration: none;
  transition: color 0.3s;
}

.return-link:hover {
  color: #c084fc;
}
</style>