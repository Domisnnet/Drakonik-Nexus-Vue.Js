<template>
  <div class="relative w-full h-screen overflow-hidden bg-black">
    <!-- Fundo com reflexos e partículas -->
    <div class="absolute inset-0 bg-[url('/images/reflexo-bg.png')] bg-cover bg-center opacity-70 animate-reflexo"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>

    <!-- Efeito de partículas (leve) -->
    <div class="absolute inset-0 pointer-events-none">
      <div v-for="n in 25" :key="n" class="particle"></div>
    </div>

    <!-- Personagem central -->
    <img
      src="/images/tela-inicial.jpg"
      alt="Personagem"
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 max-w-[400px] opacity-0 animate-personagem"
    />

    <!-- Título -->
    <h1
      class="absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl md:text-6xl font-bold text-purple-400 drop-shadow-[0_0_15px_rgba(155,100,255,0.8)] opacity-0 animate-titulo"
    >
      Drakonik Nexus!
    </h1>
  </div>
</template>

<style scoped>
@keyframes reflexo {
  0%, 100% { background-position: center; }
  50% { background-position: 60% 40%; }
}
.animate-reflexo {
  animation: reflexo 12s ease-in-out infinite alternate;
}

@keyframes personagem {
  0% { opacity: 0; transform: translate(-50%, 30px); }
  100% { opacity: 1; transform: translate(-50%, 0); }
}
.animate-personagem {
  animation: personagem 2.5s ease-out forwards;
  animation-delay: 0.5s;
}

@keyframes titulo {
  0% { opacity: 0; transform: translate(-50%, 40px); }
  100% { opacity: 1; transform: translate(-50%, 0); }
}
.animate-titulo {
  animation: titulo 3s ease-out forwards;
  animation-delay: 1.2s;
}

/* Partículas flutuando */
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  animation: float 8s linear infinite;
}
@keyframes float {
  from {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
    transform: translateY(50vh) scale(1);
  }
  to {
    transform: translateY(-10vh) scale(0);
    opacity: 0;
  }
}
</style>