import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Card = {
  id: number
  nome?: string
  fundo?: string
  nivel?: number
  imagem?: string
  alt?: string
  descricao?: string
  atk?: number
  def?: number
  cardState?: 'default' | 'flipped'
  isMatched?: boolean
}

const sampleCards = (): Card[] => ([
  { id: 1, nome: 'Carta A', fundo: 'fundo-1', nivel: 3, imagem: '/images/fundo-1.jpg', alt: 'Carta A', descricao: 'Descrição A', atk: 1000, def: 800, cardState: 'default', isMatched: false },
  { id: 2, nome: 'Carta B', fundo: 'fundo-2', nivel: 4, imagem: '/images/fundo-2.jpg', alt: 'Carta B', descricao: 'Descrição B', atk: 1500, def: 1200, cardState: 'default', isMatched: false }
])

export const useGameStore = defineStore('game', () => {
  const cards = ref<Card[]>([])
  const currentIndex = ref(0)

  function initializeGame() {
    cards.value = sampleCards()
    currentIndex.value = 0
  }

  const currentCard = computed(() => cards.value[currentIndex.value])

  function nextCard() {
    if (currentIndex.value < cards.value.length - 1) currentIndex.value++
  }

  function previousCard() {
    if (currentIndex.value > 0) currentIndex.value--
  }

  function flipCardById(id?: number) {
    const idx = cards.value.findIndex(c => c.id === id)
    if (idx === -1) return
    cards.value[idx].cardState = cards.value[idx].cardState === 'flipped' ? 'default' : 'flipped'
  }

  function flipCardCurrent() {
    const card = cards.value[currentIndex.value]
    if (!card) return
    card.cardState = card.cardState === 'flipped' ? 'default' : 'flipped'
  }

  return { cards, currentCard, initializeGame, nextCard, previousCard, flipCardById, flipCardCurrent }
})