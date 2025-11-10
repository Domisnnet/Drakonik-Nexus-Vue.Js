<template>
  <div class="home-root relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black text-white">
    <!-- Fundo dinâmico roxo/preto + névoa -->
    <div class="absolute inset-0 -z-20">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0b0010] via-[#14051a] to-black opacity-95"></div>

      <!-- Camada de névoa (SVG para suavidade) -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="40" result="blur" />
            <feColorMatrix in="blur" type="matrix"
              values="0 0 0 0 0.12
                      0 0 0 0 0
                      0 0 0 0 0.15
                      0 0 0 0.6 0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"></rect>
      </svg>

      <!-- Canvas de partículas (usar para partículas leves) -->
      <canvas ref="particleCanvas" class="absolute inset-0 w-full h-full -z-10"></canvas>
    </div>

    <!-- Personagem emergindo -->
    <img
      v-if="showCharacter"
      src="/images/tela-inicial.jpg"
      alt="Personagem Drakonik Nexus"
      class="character absolute bottom-0 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none"
      :style="{ width: characterWidth }"
    />

    <!-- Conteúdo central (Título + menu) -->
    <div class="z-10 flex flex-col items-center gap-8 px-6">
      <h1
        class="title text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-widest text-center"
        :class="{ 'glow': showTitle }"
      >
        Drakonik Nexus!
      </h1>

      <nav class="menu flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button class="menu-btn" @click="handle('start')">Iniciar</button>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

/* Visual behavior */
const showCharacter = ref(false)
const showTitle = ref(false)
const characterWidth = ref('70vw') // responsivo; será reduzido por CSS em telas grandes

// particles
const particleCanvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let particles: {
  x: number
  y: number
  size: number
  vx: number
  vy: number
  alpha: number
}[] = []

function resizeCanvas() {
  if (!particleCanvas.value) return
  particleCanvas.value.width = window.innerWidth
  particleCanvas.value.height = window.innerHeight
}

function spawnParticles(count = 80) {
  particles = []
  const w = window.innerWidth
  const h = window.innerHeight
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: 0.15 + Math.random() * 0.6,
    })
  }
}

function renderParticles() {
  if (!particleCanvas.value) return
  if (!ctx) return
  const w = particleCanvas.value.width
  const h = particleCanvas.value.height

  ctx.clearRect(0, 0, w, h)

  // subtle vignette glow behind center
  const rad = ctx.createRadialGradient(w/2, h/2, w*0.05, w/2, h/2, Math.max(w,h))
  rad.addColorStop(0, 'rgba(80,0,120,0.06)')
  rad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = rad
  ctx.fillRect(0,0,w,h)

  particles.forEach((p) => {
    p.x += p.vx
    p.y += p.vy

    // wrap around
    if (p.x < -10) p.x = w + 10
    if (p.x > w + 10) p.x = -10
    if (p.y < -10) p.y = h + 10
    if (p.y > h + 10) p.y = -10

    // draw soft particle
    const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size*8)
    g.addColorStop(0, `rgba(180,120,255,${p.alpha})`)
    g.addColorStop(1, `rgba(120,40,160,0)`)
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size*6, 0, Math.PI * 2)
    ctx.fill()
  })

  animationId = requestAnimationFrame(renderParticles)
}

/* Lifecycle */
onMounted(() => {
  // reveal sequence
  setTimeout(() => { showCharacter.value = true }, 900) // personagem surge
  setTimeout(() => { showTitle.value = true }, 1700) // título brilha depois
  setTimeout(() => { /* menu appears via CSS animation delay */ }, 2600)

  // character size adapt for large screens
  if (window.innerWidth >= 1280) characterWidth.value = '60rem'
  else if (window.innerWidth >= 768) characterWidth.value = '48rem'
  else characterWidth.value = '90vw'

  // setup particles canvas
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  if (particleCanvas.value) {
    ctx = particleCanvas.value.getContext('2d')
    spawnParticles(Math.round((window.innerWidth/1920) * 100) + 40)
    renderParticles()
  }
})

onBeforeUnmount(() => {
  if (animationId) cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeCanvas)
})

function handle(action: string) {
  if (action === 'start') {
    router.push('/game')
  }
}
</script>

<style scoped>
/* Layout base */
.home-root { background-attachment: fixed; }

/* Character styling */
.character {
  bottom: -2vh;
  opacity: 0;
  transform-origin: center bottom;
  transition: opacity 1.6s ease-out, transform 1.8s ease-out, filter 1.6s ease-out;
  filter: blur(10px);
  z-index: 5;
}
.character[style] {
  /* nothing: keep inline width control */
}
.character[alt] {
  /* placeholder to make linter happy */
}

/* When showCharacter is true (via class binding) we rely on inline style toggles triggered by JS.
   But we still add a CSS animation as fallback for appearance: */
.animate-character-enter {
  opacity: 0.8 !important;
  transform: translateY(0) scale(1) !important;
  filter: blur(0) !important;
}

/* Title */
.title {
  letter-spacing: 0.04em;
  line-height: 0.95;
  transition: text-shadow 400ms ease;
}

/* glow effect toggled via showTitle boolean (class 'glow') */
.glow {
  text-shadow: 0 0 30px rgba(160, 80, 255, 0.9), 0 0 60px rgba(100, 40, 180, 0.6);
}

/* Menu buttons */
.menu-btn {
  @apply px-8 py-3 rounded-xl border-2 border-purple-500/60 text-white text-sm font-semibold tracking-wider bg-black/20 transition-all duration-500;
}
.menu-btn:hover {
  @apply scale-105 border-purple-300/80 bg-purple-700/20 shadow-[0_0_25px_rgba(160,80,255,0.18)];
}

/* Entrance animation for menu handled by the parent animation (we used CSS keyframes in a previous example) */
.menu { will-change: transform, opacity }

/* Responsive tweaks */
@media (min-width: 1024px) {
  .title { font-size: 4.25rem; }
  .character { bottom: -1vh; }
}

@media (max-width: 640px) {
  .title { font-size: 2.25rem; }
  .menu-btn { @apply px-6 py-2 text-sm }
}
</style>