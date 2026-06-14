<script setup>
import { isQuoteModalOpen } from '../store.js'
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img src="../assets/images/Slider01.jpg" alt="Bus Tumi de Oro" class="w-full h-full object-cover object-center opacity-40" />
      <div class="absolute inset-0 bg-gradient-to-b from-premium-black/80 via-premium-black/60 to-premium-black"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-extrabold text-neutral-white tracking-tight mb-6 animate-fade-in-up">
        Bienvenido a <span class="text-modern-gold">Tumi de Oro</span>
      </h1>
      
      <p class="mt-4 text-lg sm:text-xl md:text-2xl text-light-gray max-w-3xl mx-auto mb-10 font-light leading-relaxed">
        El mejor servicio de transporte terrestre en Huancayo y Jauja. Viaja rápido, seguro y con el máximo confort.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="#services" class="px-8 py-4 bg-corp-red hover:bg-red-700 text-neutral-white rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-corp-red/30 hover:shadow-corp-red/50 hover:-translate-y-1">
          Nuestros Servicios
        </a>
        <button @click="isQuoteModalOpen = true" class="px-8 py-4 bg-transparent border-2 border-modern-gold text-modern-gold hover:bg-modern-gold hover:text-premium-black rounded-full font-semibold text-lg transition-all duration-300">
          Cotizar en Mapa
        </button>
      </div>
    </div>
    
    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <a href="#services" class="text-light-gray hover:text-modern-gold transition-colors">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}
</style>
