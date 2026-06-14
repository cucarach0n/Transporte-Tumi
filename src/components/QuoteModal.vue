<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { isQuoteModalOpen } from '../store.js'

// Fix default icons for Leaflet in Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const mapContainer = ref(null)
let map = null
let originMarker = null
let destMarker = null

const passengers = ref(1)
const activeSelection = ref('origin') // 'origin' or 'destination'
const originCoords = ref(null)
const destCoords = ref(null)

const initMap = () => {
  if (map) {
    map.invalidateSize()
    return
  }
  
  // Center roughly in Jauja/Huancayo
  map = L.map(mapContainer.value).setView([-11.85, -75.3], 9)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    className: 'map-tiles'
  }).addTo(map)

  map.on('click', (e) => {
    if (activeSelection.value === 'origin') {
      if (originMarker) map.removeLayer(originMarker)
      originMarker = L.marker(e.latlng).addTo(map).bindPopup('Origen').openPopup()
      originCoords.value = e.latlng
      activeSelection.value = 'destination'
    } else {
      if (destMarker) map.removeLayer(destMarker)
      destMarker = L.marker(e.latlng).addTo(map).bindPopup('Destino').openPopup()
      destCoords.value = e.latlng
    }
  })
}

watch(isQuoteModalOpen, async (val) => {
  if (val) {
    await nextTick()
    setTimeout(initMap, 100) // Small delay to ensure CSS transitions finish
  }
})

const sendQuote = () => {
  let text = `Hola, deseo solicitar una cotización de viaje.%0A`
  if (originCoords.value) text += `%0A📍 *Origen:* https://maps.google.com/?q=${originCoords.value.lat},${originCoords.value.lng}`
  if (destCoords.value) text += `%0A📍 *Destino:* https://maps.google.com/?q=${destCoords.value.lat},${destCoords.value.lng}`
  text += `%0A👥 *Pasajeros:* ${passengers.value}`
  text += `%0A%0A¿Me podrían brindar información de disponibilidad y precios?`
  
  window.open(`https://wa.me/51950934511?text=${text}`, '_blank')
  isQuoteModalOpen.value = false
}
</script>

<template>
  <div v-if="isQuoteModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="isQuoteModalOpen = false"></div>
    
    <div class="bg-premium-black border border-dark-gray w-full max-w-5xl rounded-3xl shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden max-h-full">
      <!-- Botón cerrar modal -->
      <button @click="isQuoteModalOpen = false" class="absolute top-4 right-4 z-20 bg-dark-gray hover:bg-corp-red text-neutral-white p-2 rounded-full transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <!-- Panel Izquierdo: Formulario y Controles -->
      <div class="w-full md:w-2/5 p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          <h2 class="text-3xl font-bold text-modern-gold mb-2">Cotizar Viaje</h2>
          <p class="text-light-gray mb-8">Usa el mapa para seleccionar tu origen y destino exactos con un clic.</p>
          
          <div class="space-y-6">
            <!-- Selector de qué clic hace qué -->
            <div class="flex gap-4">
              <button 
                @click="activeSelection = 'origin'"
                :class="['flex-1 py-3 px-4 rounded-xl font-bold transition-colors border', activeSelection === 'origin' ? 'bg-corp-red text-neutral-white border-corp-red' : 'bg-transparent text-light-gray border-dark-gray hover:border-modern-gold']"
              >
                1. Fijar Origen
              </button>
              <button 
                @click="activeSelection = 'destination'"
                :class="['flex-1 py-3 px-4 rounded-xl font-bold transition-colors border', activeSelection === 'destination' ? 'bg-corp-red text-neutral-white border-corp-red' : 'bg-transparent text-light-gray border-dark-gray hover:border-modern-gold']"
              >
                2. Fijar Destino
              </button>
            </div>

            <!-- Estado de selecciones -->
            <div class="bg-dark-gray/50 rounded-xl p-4 space-y-3">
              <div class="flex items-center gap-3">
                <div :class="['w-3 h-3 rounded-full', originCoords ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-500']"></div>
                <span class="text-sm" :class="originCoords ? 'text-neutral-white' : 'text-gray-400'">
                  {{ originCoords ? 'Origen seleccionado' : 'Falta seleccionar origen' }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <div :class="['w-3 h-3 rounded-full', destCoords ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-500']"></div>
                <span class="text-sm" :class="destCoords ? 'text-neutral-white' : 'text-gray-400'">
                  {{ destCoords ? 'Destino seleccionado' : 'Falta seleccionar destino' }}
                </span>
              </div>
            </div>
            
            <!-- Pasajeros -->
            <div>
              <label class="block text-light-gray mb-2 font-medium">Número de Pasajeros</label>
              <div class="flex items-center bg-dark-gray rounded-xl border border-dark-gray overflow-hidden">
                <button @click="passengers > 1 && passengers--" class="px-6 py-3 text-light-gray hover:text-corp-red hover:bg-black/20 transition-colors text-xl font-bold">-</button>
                <input type="number" min="1" v-model="passengers" class="w-full bg-transparent text-center text-neutral-white font-bold outline-none text-xl" />
                <button @click="passengers++" class="px-6 py-3 text-light-gray hover:text-corp-red hover:bg-black/20 transition-colors text-xl font-bold">+</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <button @click="sendQuote" class="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-neutral-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-[#25D366]/20 hover:-translate-y-1">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Enviar al WhatsApp
          </button>
        </div>
      </div>

      <!-- Panel Derecho: Mapa -->
      <div class="w-full md:w-3/5 h-96 md:h-auto min-h-[400px]">
        <div ref="mapContainer" class="w-full h-full"></div>
      </div>
    </div>
  </div>
</template>

<style>
/* CSS Filter to make OSM map dark */
.map-tiles {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}
</style>
