import { useFetch, useCountdown } from '@vueuse/core'
import { ref } from 'vue'

const URL = 'https://api.jikan.moe/v4/random/anime'
const MAX_SAFE_SPIN_ATTEMPTS = 5
const RETRY_SECONDS = 10

const isAllowedRating = (rating) => {
  if (!rating) return false

  return !rating.trim().startsWith('R')
}

export function useAnimeRoulette() {
  const anime = ref(null)
  const loading = ref(false)
  const error = ref('')
  const { remaining: cooldownLeft, start: startCooldown } = useCountdown(0, {
    interval: 1000,
  })

  const spin = async () => {
    if (loading.value || cooldownLeft.value > 0) return

    loading.value = true
    error.value = ''

    try {
      for (let attempt = 0; attempt < MAX_SAFE_SPIN_ATTEMPTS; attempt++) {
        const request = useFetch(URL, { immediate: false }).get().json()
        await request.execute()

        const response = request.response.value

        if (!response) {
          error.value =
            'Network error while contacting Jinkan. Check your connection and try again.'
          return
        }

        if (response.status === 429) {
          startCooldown(RETRY_SECONDS)
          error.value = `Rate limit exceeded. Please wait ${RETRY_SECONDS} seconds before trying again.`
          return
        }

        if (!response.ok) {
          error.value = `Something went wrong while contacting Jinkan. Status code: ${response.status}`
          return
        }

        if (request.error.value) {
          error.value =
            'Network error while contacting Jinkan. Check your connection and try again.'
          return
        }

        const candidateAnime = response.data.value?.data || null

        if (!candidateAnime) {
          error.value = 'Could not find an anime right now. Please try again.'
          return
        }

        if (!isAllowedRating(candidateAnime.rating)) {
          continue
        }

        anime.value = candidateAnime

        return
      }
    } catch {
      error.value = 'Could not find anime right now. Please try again.'
    } finally {
      loading.value = false
    }
  }

  return {
    anime,
    loading,
    error,
    spin,
    cooldownLeft,
  }
}
