<template>
  <div v-if="!rosseteStore.rosette">
    <LoadingBase />
  </div>
  <div v-else class="bg-white rounded-xl overflow-hidden">
    <div class="container mt-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-gray-100 p-4 rounded shadow">
          <h1 class="text-2xl font-bold mb-4">Información del Rossete</h1>
          <p><strong>ID:</strong> {{ rosseteStore.rosette.id }}</p>
          <p><strong>Fecha de Expiración:</strong> {{ rosseteStore.rosette.expiration }}</p>
          <p><strong>Estado:</strong> {{ rosseteStore.rosette.status }}</p>
          <p><strong>Creado en:</strong> {{ rosseteStore.rosette.createdAt }}</p>
          <p><strong>Actualizado en:</strong> {{ rosseteStore.rosette.updatedAt }}</p>
        </div>

        <div
          v-if="rosseteStore.rosette.route"
          class="bg-gray-100 p-4 rounded shadow mt-4"
        >
          <h2 class="text-xl font-bold mb-4">Información de la Ruta</h2>
          <p><strong>Punto de Inicio:</strong> {{ rosseteStore.rosette.route.startText }}</p>
          <p><strong>Punto de Destino:</strong> {{ rosseteStore.rosette.route.endText }}</p>
          <p><strong>Hora de Entrada:</strong> {{ rosseteStore.rosette.route.hourEntry }}</p>
          <p><strong>Hora de Salida:</strong> {{ rosseteStore.rosette.route.hourExit }}</p>
          <p><strong>Día de Entrada:</strong> {{ rosseteStore.rosette.route.dayEntry }}</p>
          <p><strong>Día de Salida:</strong> {{ rosseteStore.rosette.route.dayExit }}</p>
          <!-- Agrega más detalles de la ruta según sea necesario -->
        </div>

        <div class="bg-gray-100 p-4 rounded shadow mt-4">
          <h2 class="text-xl font-bold mb-4">Información del Vehículo</h2>
          <p>
            <strong>Tipo de Servicio:</strong> {{ rosseteStore.rosette.route.vehicle.typeService }}
          </p>
          <p><strong>Modalidad:</strong> {{ rosseteStore.rosette.route.vehicle.modality }}</p>
          <p><strong>Carga Máxima:</strong> {{ rosseteStore.rosette.route.vehicle.maxLoad }}</p>
          <p>
            <strong>Pasajeros Máximos:</strong> {{ rosseteStore.rosette.route.vehicle.maxPass }}
          </p>
          <p>
            <strong>Tipo de Vehículo:</strong> {{ rosseteStore.rosette.route.vehicle.typeVehicle }}
          </p>
          <p><strong>Modelo:</strong> {{ rosseteStore.rosette.route.vehicle.model }}</p>
          <p><strong>Marca:</strong> {{ rosseteStore.rosette.route.vehicle.brand }}</p>
          <p><strong>Motor:</strong> {{ rosseteStore.rosette.route.vehicle.motor }}</p>
          <p><strong>Chasis:</strong> {{ rosseteStore.rosette.route.vehicle.chassis }}</p>
          <p><strong>SOAT:</strong> {{ rosseteStore.rosette.route.vehicle.soat ? 'si' : 'no' }}</p>
          <p>
            <strong>Inspección:</strong>
            {{ rosseteStore.rosette.route.vehicle.inspection ? 'si' : 'no' }}
          </p>
          <p><strong>Clase:</strong> {{ rosseteStore.rosette.route.vehicle.classVehicle.name }}</p>
          <p><strong>Placa:</strong> {{ rosseteStore.rosette.route.vehicle.plate }}</p>
          <!-- Agrega más detalles del vehículo según sea necesario -->
        </div>

        <div
          v-if="rosseteStore.rosette.route.vehicle.operator"
          class="bg-gray-100 p-4 rounded shadow mt-4"
        >
          <h2 class="text-xl font-bold mb-4">Información del Operador</h2>
          <p>
            <strong>Razon social:</strong>
            {{ rosseteStore.rosette.route.vehicle.operator.businessName }}
          </p>
          <p>
            <strong>Representante Legal:</strong>
            {{ rosseteStore.rosette.route.vehicle.operator.legalRepresentative }}
          </p>
          <p>
            <strong>Propietario:</strong> {{ rosseteStore.rosette.route.vehicle.operator.owner }}
          </p>
          <p><strong>NIT:</strong> {{ rosseteStore.rosette.route.vehicle.operator.nit }}</p>
          <p>
            <strong>Resolución Administrativa:</strong>
            <a
              class="text-blue-600"
              :href="rosseteStore.rosette.route.vehicle.operator.administrativeResolution"
            >
              Ver</a
            >
          </p>
          <p>
            <strong>Fecha de Resolución:</strong>
            {{ rosseteStore.rosette.route.vehicle.operator.dateRa }}
          </p>
          <p>
            <strong>Número Técnico:</strong>
            {{ rosseteStore.rosette.route.vehicle.operator.tecnicalNumber }}
          </p>
          <p>
            <strong>Número Legal:</strong>
            {{ rosseteStore.rosette.route.vehicle.operator.legalNumber }}
          </p>
          <p>
            <strong>Observaciones:</strong>
            {{ rosseteStore.rosette.route.vehicle.operator.observations }}
          </p>
          <p><strong>Estado:</strong> {{ rosseteStore.rosette.route.vehicle.operator.state }}</p>
          <p>
            <strong>Certificación del Operador:</strong>
            <a
              class="text-blue-600"
              :href="rosseteStore.rosette.route.vehicle.operator.operatorCertification"
            >
              Ver</a
            >
          </p>
          <p>
            <strong>Validez:</strong> {{ rosseteStore.rosette.route.vehicle.operator.validity }}
          </p>
        </div>
        <div
          v-if="rosseteStore.rosette.route.vehicle.driver"
          class="bg-gray-100 p-4 rounded shadow mt-4"
        >
          <h2 class="text-xl font-bold mb-4">Información Conductor</h2>
          <p><strong>Nombre:</strong> {{ rosseteStore.rosette.route.vehicle.driver.firstName }}</p>
          <p><strong>Apellido:</strong> {{ rosseteStore.rosette.route.vehicle.driver.lastName }}</p>
          <p><strong>CI:</strong> {{ rosseteStore.rosette.route.vehicle.driver.ci }}</p>
          <!-- Agrega más detalles del vehículo según sea necesario -->
        </div>
        <div
          v-if="rosseteStore.rosette.route.vehicle.owner"
          class="bg-gray-100 p-4 rounded shadow mt-4"
        >
          <h2 class="text-xl font-bold mb-4">Información del propietario</h2>
          <p><strong>Nombre:</strong> {{ rosseteStore.rosette.route.vehicle.owner.firstName }}</p>
          <p><strong>Apellido:</strong> {{ rosseteStore.rosette.route.vehicle.owner.lastName }}</p>
          <p><strong>CI:</strong> {{ rosseteStore.rosette.route.vehicle.owner.ci }}</p>
          <!-- Agrega más detalles del vehículo según sea necesario -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoadingBase from '@/commun/me/LoadingBase.vue'
import { useRosseteStore } from '@/stores/rossete.stores'
const rosseteStore = useRosseteStore()
</script>
