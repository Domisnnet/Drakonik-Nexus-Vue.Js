<template>
  <BaseLayout>
    <div
      class="relative flex flex-col items-center justify-end h-full w-full pb-[8vh] text-center"
    >
      <!-- Fundo de Dragões para Desktop -->
      <div class="absolute inset-0 z-0 hidden md:flex">
        <div
          class="absolute left-0 top-0 bottom-0 w-1/2 bg-[url('/images/dragon-left.png')] bg-cover bg-center bg-no-repeat transform -scale-x-100"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('/images/dragon-right.png')] bg-cover bg-center bg-no-repeat"
        ></div>
      </div>

      <!-- Fundo Mobile -->
      <div
        class="absolute inset-0 z-0 md:hidden bg-[url('/images/tela-mobile.jpg')] bg-cover bg-center bg-no-repeat"
      ></div>

      <!-- Canvas de Partículas -->
      <canvas ref="particlesCanvas" class="absolute inset-0 w-full h-full pointer-events-none z-10"></canvas>

      <!-- Conteúdo -->
      <div class="relative z-20">
        <h1 class="text-5xl md:text-6xl font-extrabold text-black drop-shadow-[0_0_20px_rgba(128,0,255,0.8)] mb-8 animate-fade-in">
          Drakonik Nexus!
        </h1>
        <button
          @click="startGame"
          class="px-8 py-3 text-xl font-semibold text-white border-2 border-purple-500 rounded-xl bg-black/80 shadow-[0_0_10px_rgba(128,0,255,0.6)] transition hover:bg-purple-800"
        >
          Iniciar
        </button>
      </div>
    </div>
  </BaseLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseLayout from "@/components/layouts/BaseLayout.vue";

const router = useRouter();
const particlesCanvas = ref(null);
const fadingOut = ref(false);
let iniciarSom;

onMounted(() => {
  iniciarSom = new Audio("/sounds/intro-sound.mp3");
  iniciarSom.volume = 0.6;

  const canvas = particlesCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    d: Math.random() * 1.2 + 0.5,
  }));

  const animate = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(160, 80, 255, 0.7)";
    ctx.beginPath();
    for (const p of particles) {
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      p.y += p.d;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    }
    ctx.fill();
    requestAnimationFrame(animate);
  };

  animate();
});

const startGame = () => {
  if (iniciarSom) iniciarSom.play();
  fadingOut.value = true;
  setTimeout(() => router.push("/game"), 1500);
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 1.5s ease-out forwards;
}
</style>