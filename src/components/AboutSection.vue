<script setup>
const values = [
  {
    title: 'Seguridad',
    desc: 'Nuestros conductores más hábiles a disposición de usted para garantizar un viaje seguro a su destino.',
    image: 'Team1.jpg'
  },
  {
    title: 'Puntualidad',
    desc: 'Es un compromiso con usted, que le garantiza llegar a tiempo a su destino.',
    image: 'Team2.jpg'
  },
  {
    title: 'Confianza',
    desc: 'Cada viaje que realice con nosotros será una experiencia nueva y agradable.',
    image: 'Team3.jpg'
  }
]

const getImageUrl = (name) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
</script>

<template>
  <section id="about" class="py-24 bg-dark-gray relative">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Intro About -->
      <div class="flex flex-col lg:flex-row items-center gap-12 mb-20">
        <div class="lg:w-1/2">
          <h2 class="text-3xl md:text-5xl font-bold text-neutral-white mb-6">Sobre <span class="text-corp-red">Nosotros</span></h2>
          <div class="w-16 h-1 bg-modern-gold rounded-full mb-8"></div>
          <p class="text-light-gray text-lg leading-relaxed mb-6">
            Transportes Tumi de Oro es una empresa líder en el rubro de transportes. Su sólida trayectoria demuestra su confiabilidad y su orientación a ofrecer un servicio de calidad total a sus clientes.
          </p>
          <p class="text-light-gray text-lg leading-relaxed">
            Nuestra preocupación por la constante innovación y el uso de tecnologías de punta garantiza la seguridad y comodidad durante todo el viaje.
          </p>
        </div>
        <div class="lg:w-1/2 relative">
          <div class="absolute inset-0 bg-corp-red rounded-3xl transform translate-x-4 translate-y-4 opacity-50"></div>
          <img src="../assets/images/Slider03.jpg" alt="Buses Tumi de Oro" class="relative rounded-3xl shadow-2xl z-10 w-full object-cover h-80" />
        </div>
      </div>

      <!-- Values -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="val in values" :key="val.title" class="bg-premium-black rounded-2xl overflow-hidden group border border-dark-gray/50">
          <div class="h-48 overflow-hidden relative">
            <img :src="getImageUrl(val.image)" :alt="val.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
            <div class="absolute inset-0 bg-gradient-to-t from-premium-black to-transparent"></div>
          </div>
          <div class="p-8 relative -mt-12">
            <h3 class="text-2xl font-bold text-modern-gold mb-3">{{ val.title }}</h3>
            <p class="text-light-gray">{{ val.desc }}</p>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>
