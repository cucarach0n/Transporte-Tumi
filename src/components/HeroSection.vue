<script setup>
import { isQuoteModalOpen } from '../store.js'
import heroBg from '../assets/images/PORTADA DE FB.png'
</script>

<template>
  <section id="home" class="relative min-h-screen flex items-center justify-start pt-20 overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img :src="heroBg" alt="Tumi de Oro Portada" class="w-full h-full object-cover object-center opacity-60" />
      <div class="absolute inset-0 bg-gradient-to-r from-premium-black via-premium-black/80 to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
      <div class="max-w-2xl">
        <h1 class="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-neutral-white tracking-tight leading-tight mb-4 animate-fade-in-up">
          VIAJA SEGURO, <br/>
          <span class="text-modern-gold">LLEGA MEJOR</span>
        </h1>
        
        <p class="mt-4 text-lg md:text-xl text-neutral-white mb-8 font-sans font-light leading-relaxed animate-fade-in-up" style="animation-delay: 0.1s;">
          Transporte privado y turístico con puntualidad, cumplimiento, garantía y seguridad.
        </p>

        <!-- Atributos: Local, Regional, Nacional -->
        <div class="flex items-center gap-6 mb-10 text-modern-gold font-heading font-semibold text-sm md:text-base animate-fade-in-up" style="animation-delay: 0.2s;">
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            LOCAL
          </div>
          <div class="w-px h-6 bg-modern-gold/50"></div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            REGIONAL
          </div>
          <div class="w-px h-6 bg-modern-gold/50"></div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            NACIONAL
          </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style="animation-delay: 0.3s;">
          <button @click="isQuoteModalOpen = true" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-corp-red hover:bg-red-700 text-neutral-white rounded-full font-heading font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(214,16,30,0.4)] hover:shadow-[0_0_30px_rgba(214,16,30,0.6)] hover:-translate-y-1">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            RESERVA TU VIAJE
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>
