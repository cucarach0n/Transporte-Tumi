<script setup>
import { ref, computed } from 'vue'

const quote = ref({
  origin: '',
  destination: '',
  passengers: 1
})

const locations = ['Huancayo', 'Jauja', 'Concepción', 'Ingenio', 'Lima', 'Otro destino']

const whatsappLink = computed(() => {
  const { origin, destination, passengers } = quote.value
  let text = `Hola, deseo solicitar una cotización de viaje.%0A`
  if (origin) text += `%0A📍 *Origen:* ${origin}`
  if (destination) text += `%0A📍 *Destino:* ${destination}`
  text += `%0A👥 *Pasajeros:* ${passengers}`
  text += `%0A%0A¿Me podrían brindar información de disponibilidad y precios?`
  
  return `https://wa.me/51950934511?text=${text}`
})
</script>

<template>
  <section id="pricing" class="py-24 bg-premium-black relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-5xl font-bold text-neutral-white mb-4">Cotizador de <span class="text-modern-gold">Viajes</span></h2>
        <div class="w-24 h-1 bg-corp-red mx-auto rounded-full"></div>
        <p class="mt-6 text-light-gray text-lg">Arma tu viaje a medida y obtén una cotización inmediata enviando los detalles por WhatsApp.</p>
      </div>

      <div class="bg-dark-gray p-8 md:p-12 rounded-3xl border border-dark-gray/50 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-corp-red/10 rounded-full blur-3xl"></div>
        
        <h3 class="text-2xl font-bold text-modern-gold mb-8 relative z-10 text-center">Detalles de tu viaje</h3>
        
        <div class="space-y-6 relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Origen -->
            <div>
              <label class="block text-light-gray mb-2 font-medium">¿Desde dónde viajas?</label>
              <select v-model="quote.origin" class="w-full bg-premium-black text-neutral-white border border-dark-gray focus:border-modern-gold rounded-xl px-4 py-3 outline-none transition-colors appearance-none cursor-pointer">
                <option disabled value="">Selecciona tu origen</option>
                <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
              </select>
            </div>
            
            <!-- Destino -->
            <div>
              <label class="block text-light-gray mb-2 font-medium">¿A dónde te diriges?</label>
              <select v-model="quote.destination" class="w-full bg-premium-black text-neutral-white border border-dark-gray focus:border-modern-gold rounded-xl px-4 py-3 outline-none transition-colors appearance-none cursor-pointer">
                <option disabled value="">Selecciona tu destino</option>
                <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
              </select>
            </div>
          </div>
          
          <!-- Pasajeros -->
          <div class="max-w-xs mx-auto pt-4">
            <label class="block text-center text-light-gray mb-2 font-medium">Número de Pasajeros</label>
            <div class="flex items-center bg-premium-black rounded-xl border border-dark-gray overflow-hidden">
              <button @click="quote.passengers > 1 && quote.passengers--" class="px-6 py-3 text-light-gray hover:text-corp-red hover:bg-dark-gray transition-colors text-xl font-bold">-</button>
              <input type="number" min="1" v-model="quote.passengers" class="w-full bg-transparent text-center text-neutral-white font-bold outline-none text-xl" />
              <button @click="quote.passengers++" class="px-6 py-3 text-light-gray hover:text-corp-red hover:bg-dark-gray transition-colors text-xl font-bold">+</button>
            </div>
          </div>
        </div>

        <div class="mt-12 relative z-10">
          <a :href="whatsappLink" target="_blank" class="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-neutral-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-xl shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transform hover:-translate-y-1 text-lg">
            <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Enviar Cotización a WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
