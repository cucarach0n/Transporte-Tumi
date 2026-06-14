<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoUrl from '../assets/images/LOGO HORIZONTAL OSCURO PW.png'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const checkScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})

const navLinks = [
  { name: 'INICIO', href: '#home' },
  { name: 'NOSOTROS', href: '#about' },
  { name: 'SERVICIOS', href: '#services' },
  { name: 'RUTAS Y SALIDAS', href: '#routes' },
  { name: 'FLOTA', href: '#fleet' },
  { name: 'TURISMO', href: '#tourism' },
  { name: 'PAGOS', href: '#pricing' },
  { name: 'CONTACTO', href: '#contact' },
]
</script>

<template>
  <nav :class="[
    'fixed w-full z-50 transition-all duration-300',
    isScrolled ? 'bg-premium-black/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2' : 'bg-transparent py-4'
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <a href="#home">
            <img :src="logoUrl" alt="J&G Tumi de Oro" class="h-14 sm:h-16 md:h-20 object-contain drop-shadow-2xl transition-transform hover:scale-105" />
          </a>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden lg:flex items-center space-x-6">
          <a v-for="link in navLinks" :key="link.name" :href="link.href" class="text-neutral-white hover:text-modern-gold text-sm font-heading font-semibold transition-colors uppercase tracking-wide">
            {{ link.name }}
          </a>
        </div>

        <!-- CTA Button -->
        <div class="hidden lg:flex items-center">
          <a href="https://wa.me/51950934511" target="_blank" class="flex items-center gap-2 bg-corp-red hover:bg-red-700 text-neutral-white px-6 py-2.5 rounded-full font-heading font-bold text-sm transition-all duration-300 shadow-lg shadow-corp-red/20 hover:shadow-corp-red/40 hover:-translate-y-1">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            RESERVAR AHORA
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="lg:hidden flex items-center">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-neutral-white hover:text-modern-gold outline-none">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isMobileMenuOpen" class="lg:hidden bg-premium-black/95 backdrop-blur-md border-t border-dark-gray">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a v-for="link in navLinks" :key="link.name" :href="link.href" @click="isMobileMenuOpen = false" class="block px-3 py-2 text-base font-heading font-semibold text-neutral-white hover:text-modern-gold uppercase">
          {{ link.name }}
        </a>
        <a href="https://wa.me/51950934511" target="_blank" class="mt-4 flex items-center justify-center gap-2 bg-corp-red hover:bg-red-700 text-neutral-white px-3 py-3 rounded-xl font-heading font-bold text-base shadow-lg shadow-corp-red/20 mx-3">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          RESERVAR AHORA
        </a>
      </div>
    </div>
  </nav>
</template>
