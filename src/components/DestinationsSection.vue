<script setup>
const destinations = [
  { id: 1, name: 'La Plaza Constitución', image: 'Portfolio01.jpg', tag: 'Huancayo' },
  { id: 2, name: 'Concepción', image: 'Portfolio02.jpg', tag: 'Turismo' },
  { id: 3, name: 'Torre Torre', image: 'Portfolio03.jpg', tag: 'Aventura' },
  { id: 4, name: 'Nevado de Huaytapallana', image: 'Portfolio04.jpg', tag: 'Naturaleza' },
  { id: 5, name: 'Laguna de Paca', image: 'Portfolio05.jpg', tag: 'Jauja' },
  { id: 6, name: 'Ingenio', image: 'Portfolio06.jpg', tag: 'Gastronomía' },
]

// Note: Using a helper function to resolve image paths in Vite dynamically if needed,
// but for static assets in a template, we can just use new URL
const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>

<template>
  <section id="destinations" class="py-24 bg-premium-black relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-neutral-white mb-4">Nuestros <span class="text-modern-gold">Destinos</span></h2>
        <div class="w-24 h-1 bg-corp-red mx-auto rounded-full"></div>
        <p class="mt-6 text-light-gray max-w-2xl mx-auto text-lg">Descubre los increíbles lugares que conectamos para ti.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="dest in destinations" 
          :key="dest.id"
          class="group relative overflow-hidden rounded-2xl cursor-pointer"
        >
          <div class="aspect-w-4 aspect-h-3 w-full h-64">
            <img :src="getImageUrl(dest.image)" :alt="dest.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-premium-black via-premium-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          
          <div class="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span class="inline-block px-3 py-1 bg-corp-red text-neutral-white text-xs font-bold rounded-full mb-2 uppercase tracking-wider">{{ dest.tag }}</span>
            <h3 class="text-2xl font-bold text-neutral-white">{{ dest.name }}</h3>
            <div class="w-0 h-0.5 bg-modern-gold mt-4 group-hover:w-full transition-all duration-500 delay-100"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
