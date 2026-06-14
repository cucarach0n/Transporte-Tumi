<script setup>
import { isQuoteModalOpen } from '../store.js'
</script>

<template>
  <section id="pricing" class="py-24 bg-premium-black relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="bg-dark-gray p-10 md:p-16 rounded-3xl border border-dark-gray/50 shadow-2xl relative overflow-hidden">
        <!-- Decoración de fondo -->
        <div class="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-corp-red/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 -ml-10 -mb-10 w-64 h-64 bg-modern-gold/10 rounded-full blur-3xl"></div>
        
        <h2 class="text-3xl md:text-5xl font-bold text-neutral-white mb-6 relative z-10">Cotizador de <span class="text-modern-gold">Viajes</span></h2>
        <div class="w-24 h-1 bg-corp-red mx-auto rounded-full mb-8 relative z-10"></div>
        
        <p class="text-light-gray text-xl md:text-2xl mb-12 relative z-10 max-w-2xl mx-auto font-light leading-relaxed">
          Prueba nuestro nuevo mapa interactivo. Escoge tu punto de partida y llegada con un solo clic y obtén tu cotización por WhatsApp al instante.
        </p>

        <button 
          @click="isQuoteModalOpen = true" 
          class="relative z-10 inline-flex items-center justify-center gap-3 bg-corp-red hover:bg-red-700 text-neutral-white font-bold text-xl py-5 px-10 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(214,31,38,0.4)] hover:shadow-[0_0_40px_rgba(214,31,38,0.6)] transform hover:-translate-y-2 group"
        >
          <svg class="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          Abrir Mapa Interactivo
        </button>
      </div>
    </div>
  </section>
</template>
