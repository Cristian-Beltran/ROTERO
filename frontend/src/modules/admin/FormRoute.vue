<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="description">Descripción de ruta</Label>
        <Textarea
          id="description"
          placeholder="Indique la descripción de la ruta"
          v-model="v$.description.$model"
        />
        <Error :errors="v$.description.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="distance">Recorrido en Km</Label>
        <Input
          id="distance"
          type="number"
          placeholder="Indique el recorrido en Km"
          v-model="v$.distance.$model"
        />
        <Error :errors="v$.distance.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="hourEntry">Horas de entrada</Label>
        <Textarea
          id="hourEntry"
          placeholder="Indique las horas de entrada"
          v-model="v$.hourEntry.$model"
        />
        <Error :errors="v$.hourEntry.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="hourExit">Horas de salida</Label>
        <Textarea
          id="hourExit"
          placeholder="Indique las horas de salida"
          v-model="v$.hourExit.$model"
        />
        <Error :errors="v$.hourExit.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="dayEntry">Dias de entrada</Label>
        <Textarea
          id="dayEntry"
          placeholder="Indique los dias de entrada"
          v-model="v$.dayEntry.$model"
        />
        <Error :errors="v$.dayEntry.$errors" />
      </div>

      <div class="grid items-center">
        <Label for="dayExit">Dias de salida</Label>
        <Textarea
          id="dayExit"
          placeholder="Indique los dias de salida"
          v-model="v$.dayExit.$model"
        />
        <Error :errors="v$.dayExit.$errors" />
      </div>

      <div class="grid items-center">
        <Label for="route">Archivo de ruta</Label>
        <Input id="route" type="file" v-on:change="onFileChange" />
      </div>
    </div>

    <div class="flex flex-wrap cols-span-2">
      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Ruta</h6>
      <div class="w-full lg:w-12/12 px-4">
        <div class="relative w-full mb-3">
          <div ref="mapDiv" style="height: 600px"></div>
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-4">
      <router-link :to="'/operator/' + route.params.id">
        <Button type="button" variant="destructive"
          ><v-icon name="fa-times" class="mr-2" />Salir</Button
        >
      </router-link>
      <Button class="" :disabled="load" type="submit">
        <v-icon v-if="load" name="fa-spinner" animation="spin-pulse" />
        <v-icon v-else name="fa-save" /> Guardar</Button
      >
    </div>
  </form>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet-geosearch/dist/geosearch.css'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/commun/ui/select'
import Input from '@/commun/ui/input/Input.vue'
import Label from '@/commun/ui/label/Label.vue'
import Error from '@/commun/me/ErrorBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import { Textarea } from '@/commun/ui/textarea'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed, onMounted, watch, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useRouteStore } from '@/stores/route.stores'

const load = ref(false)
const routeStore = useRouteStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const formData = reactive({
  description: '',
  distance: '',
  hourEntry: '',
  hourExit: '',
  dayEntry: '',
  dayExit: '',
  operatorId: '',
  startLat: 0,
  startLng: 0,
  endLat: 0,
  endLng: 0
})

const rules = computed(() => ({
  description: { required: helpers.withMessage('Campo requerido', required) },
  distance: { required: helpers.withMessage('Campo requerido', required) },
  hourEntry: { required: helpers.withMessage('Campo requerido', required) },
  hourExit: { required: helpers.withMessage('Campo requerido', required) },
  dayEntry: { required: helpers.withMessage('Campo requerido', required) },
  dayExit: { required: helpers.withMessage('Campo requerido', required) },
}))

const v$ = useVuelidate(rules, formData)
const file = ref(null)

const onFileChange = (event) => {
  file.value = event.target.files[0]
}

async function handleSubmit(e) {
  if (e) e.preventDefault()
  if (routes.length < 1) return toast.error('Debe generar al menos una ruta')
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    load.value = true
    const data = {
      description: formData.description,
      distance: formData.distance,
      hourEntry: formData.hourEntry,
      hourExit: formData.hourExit,
      dayEntry: formData.dayEntry,
      dayExit: formData.dayExit,
      operatorId: parseInt(route.params.id),
      routeArray: routes.map((route) => route.geometry.coordinates)
    }
    try {
      let res
      if (!route.query.id) res = await routeStore.createRoute(data)
      else res = await routeStore.updateRoute(route.query.id, data)
      if (file.value) {
        const formData = new FormData()
        formData.append('file', file.value)
        await routeStore.uploadFile(res.data.id, formData)
      }
      toast.success('Ruta guardada')
      router.push({ name: 'operator-info', params: { id: route.params.id } })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

    load.value = false
  }
}

const mapDiv = ref(null)
var map = null
var drawnItems = null
var routes = []
function initMap() {
  map = L.map(mapDiv.value).setView([-17.3958441, -66.1879133], 12)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
  drawnItems = new L.FeatureGroup().addTo(map)

  const drawControl = new L.Control.Draw({
    draw: {
      polyline: true,
      polygon: false,
      marker: false,
      circlemarker: false,
      rectangle: false,
      circle: false
    },
    edit: {
      featureGroup: drawnItems,
      remove: true
    }
  })
  map.addControl(drawControl)
  map.on(L.Draw.Event.CREATED, (e) => {
    const layer = e.layer
    drawnItems.addLayer(layer)
    routes.push(layer.toGeoJSON())
  })

  map.on(L.Draw.Event.DELETED, () => {
    const updatedRoutes = []
    drawnItems.eachLayer((layer) => {
      updatedRoutes.push(layer.toGeoJSON())
    })
    routes = updatedRoutes
  })
  const provider = new OpenStreetMapProvider()
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar', // Estilo del buscador ('bar', 'button', 'button-hidden')
    autoComplete: true,
    autoCompleteDelay: 250,
    showMarker: true,
    retainZoomLevel: false,
    animateZoom: true,
    keepResult: true
  })
  map.addControl(searchControl)
}

onMounted(async () => {
  initMap()
  if (route.query.id) {
    try {
      await routeStore.getRoute(route.params.id)
      formData.hourEntry = routeStore.route.hourEntry
      formData.hourExit = routeStore.route.hourExit
      formData.dayEntry = routeStore.route.dayEntry
      formData.dayExit = routeStore.route.dayExit
      formData.description = routeStore.route.description
      formData.distance = routeStore.route.distance
      drawnItems.clearLayers()

      JSON.parse(routeStore.route.routeArray).forEach((route) => {
        const polyline = L.polyline(
          route.map((coordenada) => [coordenada[1], coordenada[0]]),
          { color: 'red' }
        ).addTo(drawnItems)
        map.fitBounds(polyline.getBounds())
        routes.push(polyline.toGeoJSON())
      })
    } catch (error) {
      console.log(error)
      //toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
