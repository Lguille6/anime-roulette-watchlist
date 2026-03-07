<script setup>
import { computed } from 'vue'
import AnimeCard from '@/components/AnimeCard.vue'
import { useAnimeRoulette } from '@/composables/useAnimeRoulette'

const { anime, loading, error, spin, cooldownLeft } = useAnimeRoulette()

const spinDisabled = computed(() => loading.value || cooldownLeft.value > 0)

const spinLabel = computed(() => {
  if (loading.value) {
    return 'Spinning...'
  }

  if (cooldownLeft.value > 0) {
    return `Cooldown ${cooldownLeft.value}s`
  }

  return 'Spin'
})
</script>

<template>
  <main
    class="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#334155,transparent_40%),radial-gradient(circle_at_85%_0%,#0f766e,transparent_28%),linear-gradient(160deg,#020617,#0f172a,#111827)] px-4 py-8 text-slate-100 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-7xl">
      <header class="mb-8">
        <p class="text-sx font-semibold tracking-[0.3em] text-cyan-300/90 uppercase">Project #4</p>
        <h1 class="text=white mt-2 text-4xl font-black sm:text-5xl">Anime Roulette Machine</h1>
        <p class="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base"></p>
        <p>Spin the reel, request a random anime to watch!</p>
      </header>

      <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section class="space-y-5">
          <div
            class="rounded-3xl border border-slate-700/70 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-sm"
          >
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 class="text-xl font-bold text-white">Roulette</h2>
                <p class="text-sm text-slate-300">Pull the lever for your next random anime!</p>
              </div>
              <button
                type="button"
                :disabled="spinDisabled"
                class="cursor-pointer rounded-full border border-cyan-300/70 bg-cyan-300/20 px-4 py-2 text-cyan-100 hover:bg-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-60"
                @click="spin"
              >
                {{ spinLabel }}
              </button>
            </div>
            <p
              v-if="cooldownLeft > 0"
              class="mt-4 rounded-xl border border-amber-300/50 bg-amber-400/10 px-3 py-2 text-sm font-semibold text-amber-100"
            >
              Rate-limited. Try again in {{ cooldownLeft }}s.
            </p>
          </div>
          <AnimeCard
            :loading="loading"
            :error="error"
            :anime="anime"
          />
        </section>
        <Watchlist />
      </div>
    </div>
  </main>
</template>
