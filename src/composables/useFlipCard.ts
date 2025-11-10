import { ref } from 'vue'

export function useFlipCard() {
  const isFlipped = ref(false)
  function toggleFlip() {
    isFlipped.value = !isFlipped.value
  }
  return { isFlipped, toggleFlip }
}