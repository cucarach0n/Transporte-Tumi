<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import FeaturesBar from './components/FeaturesBar.vue'
import ServicesSection from './components/ServicesSection.vue'
import PricingSection from './components/PricingSection.vue'
import FooterComponent from './components/Footer.vue'
import QuoteModal from './components/QuoteModal.vue'
import { isQuoteModalOpen } from './store.js'
</script>

<template>
  <div class="min-h-screen bg-premium-black text-neutral-white font-sans selection:bg-corp-red selection:text-neutral-white relative">
    <Navbar />
    <main>
      <HeroSection />
      <FeaturesBar />
      <ServicesSection />
      <!-- The map interactive banner -->
      <PricingSection />
    </main>
    <FooterComponent />
    
    <QuoteModal />

    <!-- Floating Action Button -->
    <button 
      @click="isQuoteModalOpen = true"
      class="fixed bottom-6 right-6 z-[90] bg-corp-red hover:bg-red-700 text-neutral-white p-4 rounded-full shadow-[0_0_20px_rgba(214,31,38,0.5)] hover:shadow-[0_0_30px_rgba(214,31,38,0.8)] transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center group animate-bounce-slow"
    >
      <svg class="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      <span class="absolute right-16 bg-premium-black border border-modern-gold text-modern-gold text-sm font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-lg shadow-modern-gold/10">
        Cotizar Viaje en el Mapa
      </span>
    </button>
  </div>
</template>

<style>
/* Any global adjustments that require scoped css */
</style>
