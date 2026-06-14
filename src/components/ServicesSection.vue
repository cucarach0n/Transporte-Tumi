<script setup>
const services = [
  {
    id: 1,
    title: 'Transporte',
    description: 'Ofrecemos el servicio de transporte de Huancayo a Jauja y viceversa.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z' // Example icon path
  },
  {
    id: 2,
    title: 'Alquiler de Vehículos',
    description: 'Podrás alquilar vehículos como camionetas, buses, entre otros.',
    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
  },
  {
    id: 3,
    title: 'Transporte Turístico',
    description: 'Ofrecemos el servicio de transporte turístico en Jauja y Huancayo.',
    icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]
</script>

<template>
  <section id="services" class="py-24 bg-dark-gray relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-neutral-white mb-4">Nuestros <span class="text-corp-red">Servicios</span></h2>
        <div class="w-24 h-1 bg-modern-gold mx-auto rounded-full"></div>
        <p class="mt-6 text-light-gray max-w-2xl mx-auto text-lg">Brindamos soluciones integrales de transporte adaptadas a tus necesidades.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div 
          v-for="service in services" 
          :key="service.id"
          class="bg-premium-black p-8 rounded-2xl border border-dark-gray/50 hover:border-modern-gold/50 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl hover:shadow-modern-gold/10"
        >
          <div class="w-16 h-16 bg-dark-gray rounded-full flex items-center justify-center mb-6 group-hover:bg-corp-red transition-colors duration-300">
            <svg class="w-8 h-8 text-modern-gold group-hover:text-neutral-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.icon"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-neutral-white mb-4 group-hover:text-modern-gold transition-colors">{{ service.title }}</h3>
          <p class="text-light-gray leading-relaxed">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
