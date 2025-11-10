<template>
  <div class="relative h-screen flex flex-col items-center justify-center overflow-hidden">
    <!-- Fundo principal -->
    <div
      class="absolute inset-0 bg-cover bg-center brightness-75"
      style="background-image: url('/images/tela-inicial.jpg');"
    ></div>

    <!-- Camada de partículas -->
    <div class="absolute inset-0">
      <canvas ref="particlesCanvas" class="w-full h-full"></canvas>
    </div>

    <!-- Conteúdo principal -->
    <div class="relative z-10 flex flex-col items-center">
      <h1 class="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(128,0,255,0.8)] mb-8 animate-fade-in">
        Drakonik Nexus!
      </h1>

      <button
        class="px-8 py-3 text-lg font-semibold text-white border-2 border-purple-500 rounded-xl hover:bg-purple-700 transition duration-300 shadow-[0_0_10px_rgba(128,0,255,0.6)]"
      >
        Iniciar
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const particlesCanvas = ref(null);

onMounted(() => {
  const canvas = particlesCanvas.value;
  const ctx = canvas.getContext("2d");

  const particles = [];
  const particleCount = 100;

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      d: Math.random() * 1.5 + 0.5,
    });
  }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(155, 80, 255, 0.8)";
    ctx.beginPath();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
    }

    ctx.fill();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.d;
      if (p.y > canvas.height) {
        p.y = 0;
        p.x = Math.random() * canvas.width;
      }
    }

    requestAnimationFrame(animate);
  };

  animate();
});
</script>

<style>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 1.8s ease-out forwards;
}
</style>