<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="startText">Punto de partida</Label>
        <Input
          id="startText"
          type="text"
          placeholder="Indique el punto de partida"
          v-model="v$.startText.$model"
        />
        <Error :errors="v$.startText.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="endText">Punto de llegada</Label>
        <Input
          id="endText"
          type="text"
          placeholder="Indique el punto de llegada"
          v-model="v$.endText.$model"
        />
        <Error :errors="v$.endText.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="description">Descripción de ruta</Label>
        <Input
          id="description"
          type="text"
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
        <Label for="operator">Operador</Label>
        <Select id="operator" v-model="v$.operatorId.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un operador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Operadores</SelectLabel>
              <SelectItem
                v-for="operator in operatorStore.operators"
                :key="operator.id"
                :value="operator.id"
              >
                {{ operator.businessName }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.operatorId.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="vehicleId">Vehiculo</Label>
        <Select id="vehicleId" v-model="v$.vehicleId.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un operador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Vehiculo</SelectLabel>
              <SelectItem
                v-for="vehicle in vehicleStore.vehicles"
                :key="vehicle.id"
                :value="vehicle.id"
              >
                {{ vehicle.brand }}{{ vehicle.plate }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.operatorId.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="route">Archivo de ruta</Label>
        <Input id="route" type="file" v-on:change="onFileChange" />
      </div>
    </div>

    <div class="flex flex-wrap cols-span-2">
      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Ruta
        <Button type="button" @click="generateRoute"
          ><v-icon name="fa-plus" class="mr-2" />Generar Ruta</Button
        >
      </h6>
      <div class="w-full lg:w-12/12 px-4">
        <div class="relative w-full mb-3">
          <div ref="mapDiv" style="height: 600px"></div>
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-4">
      <router-link to="/route">
        <Button type="button" variant="destructive"
          ><v-icon name="fa-times" class="mr-2" />Salir</Button
        >
      </router-link>
      <Button class=""><v-icon name="fa-save" type="submit" />Guardar</Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
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
import { useOperatorStore } from '@/stores/operator.stores'
import { useRouteStore } from '@/stores/route.stores'
import { useVehicleStore } from '@/stores/vehicle.stores'

const vehicleStore = useVehicleStore()
const operatorStore = useOperatorStore()
const routeStore = useRouteStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const formData = reactive({
  startText: '',
  endText: '',
  description: '',
  distance: '',
  hourEntry: '',
  hourExit: '',
  dayEntry: '',
  dayExit: '',
  vehicleId: '',
  operatorId: '',
  startLat: 0,
  startLng: 0,
  endLat: 0,
  endLng: 0
})

const rules = computed(() => ({
  startText: { required: helpers.withMessage('Campo requerido', required) },
  description: { required: helpers.withMessage('Campo requerido', required) },
  distance: { required: helpers.withMessage('Campo requerido', required) },
  endText: { required: helpers.withMessage('Campo requerido', required) },
  hourEntry: { required: helpers.withMessage('Campo requerido', required) },
  hourExit: { required: helpers.withMessage('Campo requerido', required) },
  dayEntry: { required: helpers.withMessage('Campo requerido', required) },
  dayExit: { required: helpers.withMessage('Campo requerido', required) },
  vehicleId: { required: helpers.withMessage('Campo requerido', required) },
  operatorId: { required: helpers.withMessage('Campo requerido', required) }
}))

const v$ = useVuelidate(rules, formData)
try {
  operatorStore.getOperators()
} catch (error) {
  toast.error('Error al cargar los operadores')
}

watch(
  () => formData.operatorId,
  async (value) => {
    try {
      await vehicleStore.getVehicles(value)
    } catch (error) {
      toast.error('Error al cargar los vehiculos')
    }
  }
)
const file = ref(null)

const onFileChange = (event) => {
  file.value = event.target.files[0]
}

async function handleSubmit(e) {
  if (e) e.preventDefault()
  if (currentRoute?.geometry?.coordinates.length < 1) return toast.error('Debe generar una ruta')
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    const data = {
      startText: formData.startText,
      endText: formData.endText,
      description: formData.description,
      distance: formData.distance,
      hourEntry: formData.hourEntry,
      hourExit: formData.hourExit,
      dayEntry: formData.dayEntry,
      dayExit: formData.dayExit,
      vehicleId: formData.vehicleId,
      operatorId: formData.operatorId,
      routeArray: currentRoute.geometry.coordinates
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
      router.push({ name: 'route' })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}

const mapDiv = ref(null)
var map = null
var drawnItems = null
var currentRoute = null
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
    drawnItems.clearLayers()
    drawnItems.addLayer(layer)
    currentRoute = layer.toGeoJSON()
  })
}

onMounted(async () => {
  initMap()
  if (route.query.id) {
    try {
      await routeStore.getRoute(route.query.id)
      formData.startText = routeStore.route.startText
      formData.endText = routeStore.route.endText
      formData.hourEntry = routeStore.route.hourEntry
      formData.hourExit = routeStore.route.hourExit
      formData.dayEntry = routeStore.route.dayEntry
      formData.dayExit = routeStore.route.dayExit
      formData.vehicleId = routeStore.route?.vehicle.id
      formData.operatorId = routeStore.route?.vehicle.operator.id
      formData.description = routeStore.route.description
      formData.distance = routeStore.route.distance
      drawnItems.clearLayers()

      const polyline = L.polyline(
        JSON.parse(routeStore.route.routeArray).map((coordenada) => [coordenada[1], coordenada[0]]),
        { color: 'red' }
      ).addTo(drawnItems)
      map.fitBounds(polyline.getBounds())
      currentRoute = polyline.toGeoJSON()
      vehicleStore.getVehicle(formData.operatorId)
    } catch (error) {
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
