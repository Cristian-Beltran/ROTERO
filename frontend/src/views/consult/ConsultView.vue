<template>
  <div class="container mx-auto p-4 mt-8">
    <h2 class="text-2xl font-bold mb-8">Consulta de vehiculo de transporte</h2>
    <div class="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <label for="licensePlate" class="block text-sm font-medium text-gray-700 mb-2">
        Ingrese la placa del vehículo:
      </label>
      <div class="relative">
        <input
          v-model="licensePlate"
          id="licensePlate"
          name="licensePlate"
          type="text"
          class="shadow-sm focus:outline-none focus:ring-0 focus:border-purple-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 pl-2"
          placeholder="Ejemplo: ABC123"
        />
        <button
          @click="search"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300"
        >
          Buscar
        </button>
      </div>
      <div v-if="vehicleStore.vehicle" class="mt-6">
        <h3 class="text-xl font-bold mb-2">Resultado:</h3>
        <ul>
          <li><strong>Tipo de Servicio:</strong> {{ vehicleStore.vehicle.typeService }}</li>
          <li><strong>Modalidad:</strong> {{ vehicleStore.vehicle.modality }}</li>
          <li><strong>Carga Máxima:</strong> {{ vehicleStore.vehicle.maxLoad }}</li>
          <li><strong>Pasajeros Máximos:</strong> {{ vehicleStore.vehicle.maxPass }}</li>
          <li><strong>Tipo de Vehículo:</strong> {{ vehicleStore.vehicle.typeVehicle }}</li>
          <li><strong>Modelo:</strong> {{ vehicleStore.vehicle.model }}</li>
          <li><strong>Marca:</strong> {{ vehicleStore.vehicle.brand }}</li>
          <li><strong>Motor:</strong> {{ vehicleStore.vehicle.motor }}</li>
          <li><strong>Chasis:</strong> {{ vehicleStore.vehicle.chassis }}</li>
          <li><strong>SOAT:</strong> {{ vehicleStore.vehicle.soat ? 'Sí' : 'No' }}</li>
          <li><strong>Inspección:</strong> {{ vehicleStore.vehicle.inspection ? 'Sí' : 'No' }}</li>
          <li><strong>Aseguradora:</strong> {{ vehicleStore.vehicle.sure }}</li>
          <li><strong>Placa:</strong> {{ vehicleStore.vehicle.plate }}</li>
          <li>
            <strong>Conductor:</strong> {{ vehicleStore.vehicle.driver.firstName }}
            {{ vehicleStore.vehicle.driver.lastName }} (CI: {{ vehicleStore.vehicle.driver.ci }},
            Teléfono: {{ vehicleStore.vehicle.driver.cellphone }})
          </li>
          <li>
            <strong>Clase de Vehículo:</strong>
            {{ vehicleStore.vehicle.classVehicle.name }} (Descripción:
            {{ vehicleStore.vehicle.classVehicle.description }})
          </li>
          <li>
            <strong>Operador:</strong>
            {{ vehicleStore.vehicle.operator.businessName }} (Representante Legal:
            {{ vehicleStore.vehicle.operator.legalRepresentative }}, Propietario:
            {{ vehicleStore.vehicle.operator.owner }})
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useVehicleStore } from '@/stores/vehicle.stores'
const vehicleStore = useVehicleStore()
const licensePlate = ref('')
const search = async () => {
  await vehicleStore.getVehicleByPlate(licensePlate.value)
}
</script>
