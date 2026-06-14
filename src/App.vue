<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import DestinationsSection from './components/DestinationsSection.vue'
import AboutSection from './components/AboutSection.vue'
import PricingSection from './components/PricingSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterComponent from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-premium-black text-neutral-white font-sans selection:bg-corp-red selection:text-neutral-white">
    <Navbar />
    <main>
      <HeroSection />
      <ServicesSection />
      <DestinationsSection />
      <AboutSection />
      <PricingSection />
      <ContactSection />
    </main>
    <FooterComponent />
  </div>
</template>

<style>
/* Any global adjustments that require scoped css */
</style>
