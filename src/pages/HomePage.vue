<script setup>
import {} from 'vue'
import AnimeCard from '@/components/AnimeCard.vue'
import { useAnimeRoulette } from '@/composables/useAnimeRoulette'

const { anime, loading, error, spin } = useAnimeRoulette()
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
                class="cursor-pointer rounded-full border border-cyan-300/70 bg-cyan-300/20 px-4 py-2 text-cyan-300 hover:bg-cyan-300/30"
                @click="spin"
              >
                Spin
              </button>
            </div>
          </div>
          <AnimeCard
            :loading="loading"
            :error="error"
            :anime="anime"
          />
        </section>
      </div>
    </div>
  </main>
</template>
