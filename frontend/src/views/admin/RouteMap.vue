<template>
  <Card title="Mapa de rutas" description="Mapa con la ruta de vehiculos" icon="fa-map">
    <div class="flex flex-wrap cols-span-2">
      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Rutas</h6>
      <div class="w-full lg:w-12/12 px-4">
        <div class="relative w-full mb-3">
          <div ref="mapDiv" style="height: 600px"></div>
        </div>
      </div>
    </div>
  </Card>
  <Card title="Lista de rutas" description="filtro de rutas" icon="fa-list">
    <template #button><Button type="button" @click="drawRoute">Filtrar</Button></template>
    <ListRoute />
  </Card>
</template>
<script setup lang="ts">
import ListRoute from '@/modules/admin/ListRouteMap.vue'
import Button from '@/commun/ui/button/Button.vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import Card from '@/commun/me/CardBase.vue'
import { useRouteStore } from '@/stores/route.stores'
import { useToast } from 'vue-toastification'
import { onMounted, ref, watch } from 'vue'
const routeIsActive = ref([])
const toast = useToast()
const routeStore = useRouteStore()

function hashCode(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
  }
  return hash
}

async function getRoutes() {
  await routeStore.getRoutes()
  routeIsActive.value = new Array(routeStore.routes.length).fill(true)
}

const mapDiv = ref(null)
var map = null
function initMap() {
  map = L.map(mapDiv.value).setView([-17.3958441, -66.1879133], 12)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  routeStore.filter.forEach((route) => {
    const polyline = L.polyline(
      JSON.parse(route.routeArray).map((coordenada) => [coordenada[1], coordenada[0]]),
      { color: route.vehicle.operator.color }
    ).addTo(map)
    const popup = L.popup().setContent(
      `<p>${route.vehicle.plate} ${route.description} - ${route.distance} km</p>`
    )
    polyline.bindPopup(popup)
  })
}

function drawRoute() {
  map.eachLayer((layer) => {
    if (layer instanceof L.Polyline) {
      map.removeLayer(layer)
    }
  })
  routeStore.filter.forEach((route) => {
    if(route.check === true) return
    const polyline = L.polyline(
      JSON.parse(route.routeArray).map((coordenada) => [coordenada[1], coordenada[0]]),
      { color: route.vehicle.operator.color }
    ).addTo(map)
    const popup = L.popup().setContent(
      `<p>${route.vehicle.plate} ${route.description} - ${route.distance} km</p>`
    )
    polyline.bindPopup(popup)
  })
}
onMounted(async () => {
  await getRoutes()
  initMap()
  watch(routeStore.routes, () => {
    drawRoute()
  })
})
</script>
