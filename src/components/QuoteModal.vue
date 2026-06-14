<script setup>
import { ref, watch, nextTick } from 'vue'
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

const originSearchQuery = ref('')
const destSearchQuery = ref('')
const originSuggestions = ref([])
const destSuggestions = ref([])

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
    map.setMaxBounds(bounds)
    map.flyToBounds(bounds, { padding: [20, 20], maxZoom: 14 })
    map.setMinZoom(11)
  } else {
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

let debounceTimeout = null
const searchAddress = (type) => {
  const query = type === 'origin' ? originSearchQuery.value : destSearchQuery.value;
  const region = type === 'origin' ? originRegion.value : destRegion.value;
  
  if (!query || query.length < 3) {
    if (type === 'origin') originSuggestions.value = []
    else destSuggestions.value = []
    return
  }

  // Adjuntamos la región seleccionada para hacer la búsqueda más exacta
  const fullQuery = `${query}, ${region ? region + ', ' : ''}Peru`

  clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullQuery)}&limit=5&accept-language=es`)
      const data = await res.json()
      if (type === 'origin') originSuggestions.value = data
      else destSuggestions.value = data
    } catch (e) {
      console.error("Error buscando dirección:", e)
    }
  }, 600)
}

const selectSuggestion = (type, place) => {
  const latlng = L.latLng(place.lat, place.lon)
  // Nombre corto de la sugerencia
  const shortName = place.display_name.split(',')[0] + ', ' + (place.display_name.split(',')[1] || '')
  
  if (type === 'origin') {
    originSearchQuery.value = shortName
    originSuggestions.value = []
    if (originMarker) map.removeLayer(originMarker)
    originMarker = L.marker(latlng).addTo(map).bindPopup('Origen: ' + shortName).openPopup()
    originCoords.value = latlng
    map.flyTo(latlng, 16)
    activeSelection.value = 'destination'
  } else {
    destSearchQuery.value = shortName
    destSuggestions.value = []
    if (destMarker) map.removeLayer(destMarker)
    destMarker = L.marker(latlng).addTo(map).bindPopup('Destino: ' + shortName).openPopup()
    destCoords.value = latlng
    map.flyTo(latlng, 16)
    activeSelection.value = 'origin'
  }
}

const initMap = () => {
  if (map) {
    map.invalidateSize()
    updateMapBounds()
    return
  }
  
  map = L.map(mapContainer.value, { maxBoundsViscosity: 1.0 }).setView([-11.85, -75.3], 9)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    className: 'map-tiles'
  }).addTo(map)

  map.on('click', (e) => {
    const currentRegion = activeSelection.value === 'origin' ? originRegion.value : destRegion.value
    if (!currentRegion) {
      alert(`Por favor, selecciona primero la ciudad de ${activeSelection.value === 'origin' ? 'Origen' : 'Destino'} en el menú desplegable.`)
      return
    }

    if (activeSelection.value === 'origin') {
      if (originMarker) map.removeLayer(originMarker)
      originMarker = L.marker(e.latlng).addTo(map).bindPopup('Origen (Pin)').openPopup()
      originCoords.value = e.latlng
      originSearchQuery.value = 'Ubicación seleccionada en mapa'
      activeSelection.value = 'destination'
    } else {
      if (destMarker) map.removeLayer(destMarker)
      destMarker = L.marker(e.latlng).addTo(map).bindPopup('Destino (Pin)').openPopup()
      destCoords.value = e.latlng
      destSearchQuery.value = 'Ubicación seleccionada en mapa'
      activeSelection.value = 'origin'
    }
  })
  
  updateMapBounds()
}

watch(isQuoteModalOpen, async (val) => {
  if (val) {
    await nextTick()
    setTimeout(initMap, 100)
  }
})

const sendQuote = () => {
  if (!originCoords.value || !destCoords.value) {
    alert("Por favor selecciona o busca un punto de origen y un destino.")
    return
  }

  let text = `Hola, deseo solicitar una cotización de viaje.%0A`
  text += `%0A📍 *Región Origen:* ${originRegion.value}`
  if(originSearchQuery.value !== 'Ubicación seleccionada en mapa') text += `%0A🏠 *Dirección:* ${originSearchQuery.value}`
  text += `%0A🗺️ *Ubicación:* https://maps.google.com/?q=${originCoords.value.lat},${originCoords.value.lng}`
  
  text += `%0A%0A📍 *Región Destino:* ${destRegion.value}`
  if(destSearchQuery.value !== 'Ubicación seleccionada en mapa') text += `%0A🏠 *Dirección:* ${destSearchQuery.value}`
  text += `%0A🗺️ *Ubicación:* https://maps.google.com/?q=${destCoords.value.lat},${destCoords.value.lng}`
  
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
      <button @click="isQuoteModalOpen = false" class="absolute top-4 right-4 z-20 bg-dark-gray hover:bg-corp-red text-neutral-white p-2 rounded-full transition-colors">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <!-- Panel Izquierdo: Formulario -->
      <div class="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          <h2 class="text-3xl font-bold text-modern-gold mb-2">Cotizar Viaje</h2>
          <p class="text-light-gray mb-6 text-sm sm:text-base">Busca una dirección o haz clic en el mapa.</p>
          
          <div class="space-y-5">
            
            <!-- Selector Origen -->
            <div class="bg-dark-gray/50 rounded-xl p-4 border" :class="activeSelection === 'origin' ? 'border-corp-red shadow-[0_0_15px_rgba(214,31,38,0.2)]' : 'border-dark-gray'">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-modern-gold">1. Origen</span>
                <button @click="activeSelection = 'origin'" v-if="activeSelection !== 'origin'" class="text-xs bg-premium-black hover:bg-modern-gold hover:text-black text-light-gray px-2 py-1 rounded">Activar</button>
              </div>
              <select v-model="originRegion" class="w-full bg-premium-black text-neutral-white border border-dark-gray rounded-lg px-3 py-2 mb-3 outline-none text-sm appearance-none cursor-pointer">
                <option disabled value="">Selecciona la zona...</option>
                <option v-for="(_, loc) in regions" :key="loc" :value="loc">{{ loc }}</option>
              </select>
              
              <div class="relative">
                <input 
                  type="text" 
                  v-model="originSearchQuery" 
                  @input="searchAddress('origin')"
                  placeholder="Ej: Calle Real 123..." 
                  class="w-full bg-premium-black text-neutral-white border border-dark-gray rounded-lg px-3 py-2 text-sm outline-none focus:border-modern-gold"
                  :disabled="!originRegion"
                />
                <!-- Sugerencias Origen -->
                <ul v-if="originSuggestions.length > 0" class="absolute z-50 w-full mt-1 bg-premium-black border border-dark-gray rounded-lg shadow-xl max-h-40 overflow-y-auto">
                  <li 
                    v-for="sug in originSuggestions" 
                    :key="sug.place_id"
                    @click="selectSuggestion('origin', sug)"
                    class="px-3 py-2 text-xs text-light-gray hover:bg-corp-red hover:text-white cursor-pointer border-b border-dark-gray/50 last:border-0"
                  >
                    {{ sug.display_name }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Selector Destino -->
            <div class="bg-dark-gray/50 rounded-xl p-4 border" :class="activeSelection === 'destination' ? 'border-corp-red shadow-[0_0_15px_rgba(214,31,38,0.2)]' : 'border-dark-gray'">
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-modern-gold">2. Destino</span>
                <button @click="activeSelection = 'destination'" v-if="activeSelection !== 'destination'" class="text-xs bg-premium-black hover:bg-modern-gold hover:text-black text-light-gray px-2 py-1 rounded">Activar</button>
              </div>
              <select v-model="destRegion" class="w-full bg-premium-black text-neutral-white border border-dark-gray rounded-lg px-3 py-2 mb-3 outline-none text-sm appearance-none cursor-pointer">
                <option disabled value="">Selecciona la zona...</option>
                <option v-for="(_, loc) in regions" :key="loc" :value="loc">{{ loc }}</option>
              </select>
              
              <div class="relative">
                <input 
                  type="text" 
                  v-model="destSearchQuery" 
                  @input="searchAddress('destination')"
                  placeholder="Ej: Plaza Principal..." 
                  class="w-full bg-premium-black text-neutral-white border border-dark-gray rounded-lg px-3 py-2 text-sm outline-none focus:border-modern-gold"
                  :disabled="!destRegion"
                />
                <!-- Sugerencias Destino -->
                <ul v-if="destSuggestions.length > 0" class="absolute z-50 w-full mt-1 bg-premium-black border border-dark-gray rounded-lg shadow-xl max-h-40 overflow-y-auto">
                  <li 
                    v-for="sug in destSuggestions" 
                    :key="sug.place_id"
                    @click="selectSuggestion('destination', sug)"
                    class="px-3 py-2 text-xs text-light-gray hover:bg-corp-red hover:text-white cursor-pointer border-b border-dark-gray/50 last:border-0"
                  >
                    {{ sug.display_name }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Pasajeros -->
            <div class="flex items-center justify-between bg-dark-gray/50 rounded-xl p-4">
              <label class="text-light-gray font-medium">Pasajeros:</label>
              <div class="flex items-center bg-premium-black rounded-lg border border-dark-gray overflow-hidden">
                <button @click="passengers > 1 && passengers--" class="px-4 py-1 text-light-gray hover:text-corp-red hover:bg-dark-gray transition-colors font-bold">-</button>
                <input type="number" min="1" v-model="passengers" class="w-12 bg-transparent text-center text-neutral-white font-bold outline-none" />
                <button @click="passengers++" class="px-4 py-1 text-light-gray hover:text-corp-red hover:bg-dark-gray transition-colors font-bold">+</button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <button @click="sendQuote" class="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-neutral-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-[#25D366]/20 hover:-translate-y-1">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp
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
