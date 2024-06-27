<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-4">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Datos del Conductor</h3>
      <p class="mt-1 text-sm text-gray-500">Datos del conductor de vehiculo</p>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="firstName">Nombre/s</Label>
        <Input
          id="firstName"
          type="text"
          placeholder="Nombre de administrador"
          v-model="v$.firstName.$model"
        />
        <Error :errors="v$.firstName.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="lastName">Apellido/s</Label>
        <Input
          id="lastName"
          type="text"
          placeholder="Apellido de administrador"
          v-model="v$.lastName.$model"
        />
        <Error :errors="v$.lastName.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="ci">CI</Label>
        <Input id="ci" type="text" placeholder="Carnet de identidad" v-model="v$.ci.$model" />
        <Error :errors="v$.ci.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="cellphone">Celular</Label>
        <Input
          id="cellphone"
          type="text"
          placeholder="Numero de celular"
          v-model="v$.cellphone.$model"
        />
        <Error :errors="v$.cellphone.$errors" />
      </div>
    </div>
    <hr class="h-px my-8 bg-gray-600 border-0" />
    <div class="mt-4">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Datos del vehiculo</h3>
      <p class="mt-1 text-sm text-gray-500">Datos del vehiculo</p>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="typeService">Tipo de servicio</Label>
        <Select id="typeService" v-model="v$.typeService.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un tipo de servicio" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Servicios</SelectLabel>
              <SelectItem value="interprovincial">Transporte interprovincial</SelectItem>
              <SelectItem value="interdepartamental">Transporte interdepartamental</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.typeService.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="modality">Modalidad</Label>
        <Select id="modality" v-model="v$.modality.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un modalidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Modalidades</SelectLabel>
              <SelectItem value="pasajero">Pasajero</SelectItem>
              <SelectItem value="carga">Carga</SelectItem>
              <SelectItem value="pasajero y carga">Pasajero y Carga</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.modality.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="maxLoad">Maxima carga (Kg)</Label>
        <Input id="maxLoad" type="number" v-model="v$.maxLoad.$model" />
        <Error :errors="v$.maxLoad.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="maxPass">Maximo pasajeros</Label>
        <Input id="maxPass" type="number" v-model="v$.maxPass.$model" />
        <Error :errors="v$.maxPass.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="typeVehicle">Tipo de vehiculo</Label>
        <Select id="typeVehicle" v-model="v$.typeVehicle.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un tipo de vehiculo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos de vehiculos</SelectLabel>
              <SelectItem value="taxi">Taxi</SelectItem>
              <SelectItem value="taxi trufi">Taxi Trufi</SelectItem>
              <SelectItem value="trufi minibus">Trufi Minubus</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.typeVehicle.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="model">Modelo</Label>
        <Input id="model" type="text" v-model="v$.model.$model" />
        <Error :errors="v$.model.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="brand">Marca</Label>
        <Input id="brand" type="text" v-model="v$.brand.$model" />
        <Error :errors="v$.brand.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="motor">Motor</Label>
        <Input id="motor" type="text" v-model="v$.motor.$model" />
        <Error :errors="v$.motor.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="chassis">Chasis</Label>
        <Input id="chassis" type="text" v-model="v$.chassis.$model" />
        <Error :errors="v$.chassis.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="soat">SOAT</Label>
        <Input id="soat" type="checkbox" v-model="v$.soat.$model" />
        <Error :errors="v$.soat.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="soat">Inspección Vehicular</Label>
        <Input id="soat" type="checkbox" v-model="v$.inspection.$model" />
        <Error :errors="v$.inspection.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="sure">Seguro</Label>
        <Input id="sure" type="text" v-model="v$.sure.$model" />
        <Error :errors="v$.sure.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="plate">Placa</Label>
        <Input id="plate" type="text" v-model="v$.plate.$model" />
        <Error :errors="v$.plate.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="classVehicleId">Clase de vehiculo</Label>
        <Select id="classVehicleId" v-model="v$.classVehicleId.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione una clase " />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Clases</SelectLabel>
              <SelectItem
                v-for="classVehicle in classVehicleStore.classVehicles"
                :key="classVehicle.id"
                :value="classVehicle.id"
              >
                {{ classVehicle.name }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.ownerId.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="ownerId">Propietario</Label>
        <Select id="ownerId" v-model="v$.ownerId.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un operador" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Propietarios</SelectLabel>
              <SelectItem v-for="owner in ownerStore.owners" :key="owner.id" :value="owner.id">
                {{ owner.firstName }} {{ owner.lastName }}</SelectItem
              >
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.ownerId.$errors" />
      </div>
    </div>

    <div class="flex justify-between mt-4">
      <router-link :to="'/operator/' + route.params.id">
        <Button type="button" variant="destructive"
          ><v-icon name="fa-times" class="mr-2" />Salir</Button
        >
      </router-link>
      <Button class=""><v-icon name="fa-save" type="submit" />Guardar</Button>
    </div>
  </form>
</template>
<script setup lang="ts">
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
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed, onMounted } from 'vue'

import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useOwnerStore } from '@/stores/owner.stores'
import { useVehicleStore } from '@/stores/vehicle.stores'
import { useDriverStore } from '@/stores/driver.stores'
import { useClassVehicleStore } from '@/stores/classVehicle.stores'

const classVehicleStore = useClassVehicleStore()
const ownerStore = useOwnerStore()
const driverStore = useDriverStore()
const vehicleStore = useVehicleStore()

const toast = useToast()
const router = useRouter()
const route = useRoute()
const formData = reactive({
  // Driver info
  firstName: '',
  lastName: '',
  ci: '',
  cellphone: '',
  ownerId: '',
  typeService: '',
  modality: '',
  maxLoad: '',
  maxPass: '',
  typeVehicle: '',
  classVehicleId: '',
  model: '',
  brand: '',
  motor: '',
  chassis: '',
  soat: false,
  inspection: false,
  sure: '',
  plate: ''
})

const rules = computed(() => ({
  firstName: { required: helpers.withMessage('Campo requerido', required) },
  lastName: { required: helpers.withMessage('Campo requerido', required) },
  ci: { required: helpers.withMessage('Campo requerido', required) },
  cellphone: { required: helpers.withMessage('Campo requerido', required) },
  typeService: { required: helpers.withMessage('Campo requerido', required) },
  modality: { required: helpers.withMessage('Campo requerido', required) },
  maxLoad: { required: helpers.withMessage('Campo requerido', required) },
  maxPass: { required: helpers.withMessage('Campo requerido', required) },
  typeVehicle: { required: helpers.withMessage('Campo requerido', required) },
  model: { required: helpers.withMessage('Campo requerido', required) },
  brand: { required: helpers.withMessage('Campo requerido', required) },
  motor: { required: helpers.withMessage('Campo requerido', required) },
  chassis: { required: helpers.withMessage('Campo requerido', required) },
  soat: { required: helpers.withMessage('Campo requerido', required) },
  sure: { required: helpers.withMessage('Campo requerido', required) },
  plate: { required: helpers.withMessage('Campo requerido', required) },
  ownerId: { required: helpers.withMessage('Campo requerido', required) },
  classVehicleId: { required: helpers.withMessage('Campo requerido', required) },
  inspection: { required: helpers.withMessage('Campo requerido', required) }
}))

const v$ = useVuelidate(rules, formData)

try {
  classVehicleStore.getClassVehicles()
} catch (error) {
  toast.error('Error al cargar las clases de vehiculos')
}

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    const driver = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      ci: formData.ci,
      cellphone: formData.cellphone,
      operatorId: parseInt(route.params.id)
    }
    const vehicle = {
      typeService: formData.typeService,
      modality: formData.modality,
      maxLoad: formData.maxLoad,
      maxPass: formData.maxPass,
      typeVehicle: formData.typeVehicle,
      model: formData.model,
      brand: formData.brand,
      motor: formData.motor,
      chassis: formData.chassis,
      soat: formData.soat,
      inspection: formData.inspection,
      sure: formData.sure,
      plate: formData.plate,
      ownerId: formData.ownerId,
      operatorId: parseInt(route.params.id),
      driverId: null,
      classVehicleId: formData.classVehicleId
    }
    try {
      if (!route.query.id) {
        const response = await driverStore.createDriver(driver)
        const driverId = response.data.id
        await vehicleStore.createVehicle({ ...vehicle, driverId })
      } else {
        const driverId = vehicleStore.vehicle?.driver.id
        await driverStore.updateDriver(driverId, driver)
        await vehicleStore.updateVehicle(route.query.id, { ...vehicle, driverId })
      }

      toast.success('Operador guardado')
      router.push({ name: 'operator-info', params: { id: route.params.id } })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}

onMounted(async () => {
  try {
    await ownerStore.getOwners(route.params.id)
  } catch (error) {
    toast.error('Error al cargar los propietarios')
  }
  if (route.query.id) {
    try {
      await vehicleStore.getVehicle(route.query.id)
      await driverStore.getDriver(vehicleStore.vehicle?.driver.id)
      formData.firstName = driverStore.driver.firstName
      formData.lastName = driverStore.driver.lastName
      formData.ci = driverStore.driver.ci
      formData.cellphone = driverStore.driver.cellphone
      formData.typeService = vehicleStore.vehicle.typeService
      formData.modality = vehicleStore.vehicle.modality
      formData.maxLoad = vehicleStore.vehicle.maxLoad
      formData.maxPass = vehicleStore.vehicle.maxPass
      formData.typeVehicle = vehicleStore.vehicle.typeVehicle
      formData.model = vehicleStore.vehicle.model
      formData.inspection = vehicleStore.vehicle.inspection
      formData.classVehicleId = vehicleStore.vehicle.classVehicle.id

      formData.brand = vehicleStore.vehicle.brand
      formData.motor = vehicleStore.vehicle.motor
      formData.chassis = vehicleStore.vehicle.chassis
      formData.soat = vehicleStore.vehicle.soat
      formData.sure = vehicleStore.vehicle.sure
      formData.plate = vehicleStore.vehicle.plate
      formData.ownerId = vehicleStore.vehicle.owner.id
    } catch (error) {
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
