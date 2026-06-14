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

const originRegion = ref('')
const destRegion = ref('')
const originCoords = ref(null)
const destCoords = ref(null)

const regions = {
  'Huancayo': { bounds: [[-12.18, -75.35], [-11.95, -75.10]] },
  'Jauja': { bounds: [[-11.88, -75.60], [-11.65, -75.35]] },
  'Concepción': { bounds: [[-12.00, -75.40], [-11.85, -75.20]] },
  'Ingenio': { bounds: [[-11.95, -75.35], [-11.80, -75.15]] },
  'Lima': { bounds: [[-12.30, -77.20], [-11.80, -76.80]] }
}
const defaultBounds = [[-12.5, -77.5], [-11.5, -75.0]]

const updateMapBounds = () => {
  if (!map) return
  
  let currentRegion = activeSelection.value === 'origin' ? originRegion.value : destRegion.value
  
  if (currentRegion && regions[currentRegion]) {
    const bounds = L.latLngBounds(regions[currentRegion].bounds)
    map.setMaxBounds(bounds) // Restringe la vista a esta zona
    map.flyToBounds(bounds, { padding: [20, 20], maxZoom: 14 })
    map.setMinZoom(11) // Evita que hagan mucho zoom out y salgan de la zona
  } else {
    // Si no hay zona seleccionada, vista general pero restringida al centro de Perú
    const bounds = L.latLngBounds(defaultBounds)
    map.setMaxBounds(bounds)
    map.flyToBounds(bounds)
    map.setMinZoom(8)
  }
}

watch(activeSelection, updateMapBounds)
watch(originRegion, () => {
  if (activeSelection.value === 'origin') updateMapBounds()
})
watch(destRegion, () => {
  if (activeSelection.value === 'destination') updateMapBounds()
})

const initMap = () => {
  if (map) {
    map.invalidateSize()
    updateMapBounds()
    return
  }
  
  map = L.map(mapContainer.value, {
    maxBoundsViscosity: 1.0 // Fuerza el rebote exacto en el borde
  }).setView([-11.85, -75.3], 9)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    className: 'map-tiles'
  }).addTo(map)

  map.on('click', (e) => {
    // Verificar si el usuario ha seleccionado una región en el combobox primero
    const currentRegion = activeSelection.value === 'origin' ? originRegion.value : destRegion.value
    if (!currentRegion) {
      alert(`Por favor, selecciona primero la ciudad de ${activeSelection.value === 'origin' ? 'Origen' : 'Destino'} en el menú desplegable.`)
      return
    }

    if (activeSelection.value === 'origin') {
      if (originMarker) map.removeLayer(originMarker)
      originMarker = L.marker(e.latlng).addTo(map).bindPopup('Origen').openPopup()
      originCoords.value = e.latlng
      // Auto-pasar a seleccionar destino
      activeSelection.value = 'destination'
    } else {
      if (destMarker) map.removeLayer(destMarker)
      destMarker = L.marker(e.latlng).addTo(map).bindPopup('Destino').openPopup()
      destCoords.value = e.latlng
      // Auto-pasar a origen por si quiere cambiarlo
      activeSelection.value = 'origin'
    }
  })
  
  updateMapBounds()
}

watch(isQuoteModalOpen, async (val) => {
  if (val) {
    await nextTick()
    setTimeout(initMap, 100) // Small delay to ensure CSS transitions finish
  }
})

const sendQuote = () => {
  if (!originCoords.value || !destCoords.value) {
    alert("Por favor selecciona un punto de origen y un destino en el mapa.")
    return
  }

  let text = `Hola, deseo solicitar una cotización de viaje.%0A`
  text += `%0A📍 *Región Origen:* ${originRegion.value}`
  text += `%0A🗺️ *Punto Origen:* https://maps.google.com/?q=${originCoords.value.lat},${originCoords.value.lng}`
  text += `%0A%0A📍 *Región Destino:* ${destRegion.value}`
  text += `%0A🗺️ *Punto Destino:* https://maps.google.com/?q=${destCoords.value.lat},${destCoords.value.lng}`
  text += `%0A%0A👥 *Pasajeros:* ${passengers.value}`
  text += `%0A%0A¿Me podrían brindar información de disponibilidad y precios?`
  
  window.open(`https://wa.me/51950934511?text=${text}`, '_blank')
  isQuoteModalOpen.value = false
}
</script>

<template>
  <div v-if="isQuoteModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="isQuoteModalOpen = false"></div>
    
    <div class="bg-premium-black border border-dark-gray w-full max-w-6xl rounded-3xl shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden max-h-full">
      <!-- Botón cerrar modal -->
      <button @click="isQuoteModalOpen = false" class="absolute top-4 right-4 z-20 bg-dark-gray hover:bg-corp-red text-neutral-white p-2 rounded-full transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <!-- Panel Izquierdo: Formulario y Controles -->
      <div class="w-full md:w-2/5 p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          <h2 class="text-3xl font-bold text-modern-gold mb-2">Cotizar Viaje</h2>
          <p class="text-light-gray mb-8">Elige la zona y selecciona el punto exacto en el mapa.</p>
          
          <div class="space-y-6">
            
            <!-- Selector de Regiones (Comboboxes) -->
            <div class="bg-dark-gray/50 rounded-xl p-4 border border-dark-gray space-y-4">
              <div>
                <label class="block text-light-gray mb-1 font-medium text-sm">Zona de Origen</label>
                <select v-model="originRegion" class="w-full bg-premium-black text-neutral-white border border-dark-gray focus:border-corp-red rounded-xl px-3 py-2 outline-none transition-colors appearance-none cursor-pointer">
                  <option disabled value="">Selecciona la ciudad de origen</option>
                  <option v-for="(_, loc) in regions" :key="loc" :value="loc">{{ loc }}</option>
                </select>
              </div>
              <div>
                <label class="block text-light-gray mb-1 font-medium text-sm">Zona de Destino</label>
                <select v-model="destRegion" class="w-full bg-premium-black text-neutral-white border border-dark-gray focus:border-corp-red rounded-xl px-3 py-2 outline-none transition-colors appearance-none cursor-pointer">
                  <option disabled value="">Selecciona la ciudad de destino</option>
                  <option v-for="(_, loc) in regions" :key="loc" :value="loc">{{ loc }}</option>
                </select>
              </div>
            </div>

            <!-- Selector de qué clic hace qué -->
            <div class="flex gap-4">
              <button 
                @click="activeSelection = 'origin'"
                :class="['flex-1 py-3 px-2 rounded-xl font-bold text-sm transition-colors border', activeSelection === 'origin' ? 'bg-corp-red text-neutral-white border-corp-red shadow-lg shadow-corp-red/20' : 'bg-transparent text-light-gray border-dark-gray hover:border-modern-gold']"
              >
                1. Fijar Origen en Mapa
              </button>
              <button 
                @click="activeSelection = 'destination'"
                :class="['flex-1 py-3 px-2 rounded-xl font-bold text-sm transition-colors border', activeSelection === 'destination' ? 'bg-corp-red text-neutral-white border-corp-red shadow-lg shadow-corp-red/20' : 'bg-transparent text-light-gray border-dark-gray hover:border-modern-gold']"
              >
                2. Fijar Destino en Mapa
              </button>
            </div>

            <!-- Estado de selecciones -->
            <div class="bg-dark-gray/50 rounded-xl p-4 space-y-3">
              <div class="flex items-center gap-3">
                <div :class="['w-3 h-3 rounded-full', originCoords ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-500']"></div>
                <span class="text-sm" :class="originCoords ? 'text-neutral-white' : 'text-gray-400'">
                  {{ originCoords ? 'Origen seleccionado' : 'Falta seleccionar origen en mapa' }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <div :class="['w-3 h-3 rounded-full', destCoords ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-gray-500']"></div>
                <span class="text-sm" :class="destCoords ? 'text-neutral-white' : 'text-gray-400'">
                  {{ destCoords ? 'Destino seleccionado' : 'Falta seleccionar destino en mapa' }}
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
      <div class="w-full md:w-3/5 h-[500px] md:h-auto min-h-[500px]">
        <div ref="mapContainer" class="w-full h-full border-l border-dark-gray"></div>
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
