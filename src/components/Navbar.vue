<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navLinks = [
  { name: 'Inicio', href: '#home' },
  { name: 'Servicios', href: '#services' },
  { name: 'Destinos', href: '#destinations' },
  { name: 'Nosotros', href: '#about' },
  { name: 'Precios', href: '#pricing' },
  { name: 'Contáctanos', href: '#contact' },
]
</script>

<template>
  <nav
    :class="[
      'fixed w-full z-50 transition-all duration-300',
      isScrolled ? 'bg-premium-black/90 backdrop-blur-md py-4 shadow-lg shadow-black/50' : 'bg-transparent py-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <a href="#" class="flex items-center gap-2">
            <!-- Using text as fallback if logo image is not found initially -->
            <span class="text-2xl font-bold text-neutral-white tracking-wider">
              TUMI<span class="text-modern-gold">DE</span>ORO
            </span>
          </a>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8 items-center">
          <a
            v-for="link in navLinks"
            :key="link.name"
            :href="link.href"
            class="text-neutral-white hover:text-corp-red transition-colors duration-300 text-sm font-medium uppercase tracking-wide relative group"
          >
            {{ link.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-corp-red transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-neutral-white hover:text-corp-red focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-premium-black/95 backdrop-blur-lg absolute w-full top-full left-0 border-t border-dark-gray">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          @click="isMobileMenuOpen = false"
          class="block px-3 py-4 text-base font-medium text-neutral-white hover:text-corp-red hover:bg-dark-gray/50 rounded-md transition-colors"
        >
          {{ link.name }}
        </a>
      </div>
    </div>
  </nav>
</template>
