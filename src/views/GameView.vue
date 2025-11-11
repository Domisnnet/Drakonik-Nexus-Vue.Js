<template>
  <div class="game-container">
    <div class="background-overlay" />

    <!-- canvas de partículas -->
    <canvas ref="particlesCanvas" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>

    <div class="content">
      <h1 class="title">Drakonik Nexus</h1>

      <div class="card-area">
        <!-- mostra um placeholder enquanto não houver card -->
        <div v-if="!mainCard" class="card-placeholder">Carregando carta...</div>

        <FlipCard
          v-else
          :fundo="mainCard.fundo"
          :card-state="mainCard.cardState"
          :content-url="mainCard.contentUrl"
          :alt="mainCard.alt"
          :nivel="mainCard.nivel"
          :descricao="mainCard.descricao"
          :atk="mainCard.atk"
          :def="mainCard.def"
          @click-event="flipMainCard"
        />
      </div>

      <router-link to="/" class="return-btn">Voltar à Tela Inicial</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { useGameStore } from "@/stores/game";
import FlipCard from "@/components/game/FlipCard.vue";

const router = useRouter();
const gameStore = useGameStore();

const particlesCanvas = ref<HTMLCanvasElement | null>(null);

const mainCard = computed(() => {
  return (gameStore && Array.isArray(gameStore.cards) && gameStore.cards.length > 0)
    ? gameStore.cards[0]
    : null;
});

let raf = 0;

onMounted(async () => {
  try {
    if (!gameStore.cards || gameStore.cards.length === 0) {
      if (typeof gameStore.initializeGame === "function") {
        const res = gameStore.initializeGame();
        if (res && typeof res.then === "function") await res;
      }
    }
  } catch (err) {
    console.error("Erro ao inicializar gameStore:", err);
  }

  const canvas = particlesCanvas.value;
  if (!canvas) {
    console.warn("Canvas não encontrado (particlesCanvas está null)");
    return;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.warn("2D context não disponível no canvas");
    return;
  }

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener("resize", resize);

  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.8,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
  }));

  const draw = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(155,80,255,0.8)";
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    raf = requestAnimationFrame(draw);
  };
  draw();

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
  });
});

function flipMainCard() {
  if (!mainCard.value) return;
  if (!("cardState" in mainCard.value)) {
    mainCard.value.cardState = "flipped";
    return;
  }
  mainCard.value.cardState = mainCard.value.cardState === "flipped" ? "default" : "flipped";
}
</script>

<style scoped>
.game-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #0d001a, #000);
}
.background-overlay {
  position: absolute;
  inset: 0;
  background-image: url("/images/fundo-carta.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.18;
  filter: blur(6px);
}
.content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title { color: #c084fc; text-shadow: 0 0 25px rgba(180,70,255,0.9); margin-bottom: 1rem; }
.card-area { width: 320px; height: 520px; display:flex; align-items:center; justify-content:center; }
.card-placeholder { color: #aaa; padding: 2rem; border: 1px dashed rgba(200,200,200,0.06); border-radius: 8px; }
.return-btn { margin-top: 1.5rem; color: #c084fc; }
</style>