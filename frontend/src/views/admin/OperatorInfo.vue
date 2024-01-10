<template>
  <Card
    title="Información de operador"
    description="Información de operador registrado"
    icon="fa-building"
  >
    <div v-if="!operatorStore.operator">
      <LoadingBase />
    </div>
    <div v-else class="bg-white rounded-xl overflow-hidden">
      <div class="container mt-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Columna izquierda -->
          <div>
            <div class="mb-4">
              <h3 class="text-lg font-bold mb-2">Información del Operador</h3>
              <p><strong>Nombre del Negocio:</strong> {{ operatorStore.operator.businessName }}</p>
              <p>
                <strong>Representante Legal:</strong>
                {{ operatorStore.operator.legalRepresentative }}
              </p>
              <p><strong>Dueño:</strong> {{ operatorStore.operator.owner }}</p>
              <p><strong>SEPREC:</strong> {{ operatorStore.operator.seprec }}</p>
              <p><strong>NIT:</strong> {{ operatorStore.operator.nit }}</p>
              <p style="white-space: pre-line">
                <strong>Ruta:</strong>{{ operatorStore.operator.route.replace('/\n/g', '<br />') }}
              </p>
              <p>
                <strong>Resolución Administrativa:</strong>
                <a
                  :href="operatorStore.operator.administrativeResolution"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-500 hover:underline"
                  >Ver Resolución Administrativa</a
                >
              </p>
              <p>
                <strong>Fecha de Resolución Administrativa:</strong>
                {{ dateFormat(new Date(operatorStore.operator.dateRa)) }}
              </p>
              <p><strong>Estado:</strong> {{ operatorStore.operator.state }}</p>
              <p v-if="operatorStore.operator.authorizationDate">
                <strong>Fecha de autorización</strong>
                {{ dateFormat(new Date(operatorStore.operator.authorizationDate)) }}
              </p>
              <p><strong>Número Técnico:</strong> {{ operatorStore.operator.tecnicalNumber }}</p>
              <p>
                <strong>Número Técnico PDF:</strong>
                <a
                  :href="operatorStore.operator.tecnicalNumberUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-500 hover:underline"
                  >Ver Número Técnico PDF</a
                >
              </p>

              <p><strong>Número Legal:</strong> {{ operatorStore.operator.legalNumber }}</p>
              <p>
                <strong>Número Legal PDF:</strong>
                <a
                  :href="operatorStore.operator.legalNumberUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-500 hover:underline"
                  >Ver Número Legal PDf</a
                >
              </p>
              <p style="white-space: pre-line">
                <strong>Observaciones:</strong> {{
                operatorStore.operator.observations.replace(/\n/g, '<br />') }}
              </p>
              <p>
                <strong>Validez:</strong>
                {{ dateFormat(new Date(operatorStore.operator.validity)) }}
              </p>
            </div>
          </div>

          <!-- Columna derecha -->
          <div>
            <div class="mb-4">
              <h3 class="text-lg font-bold mb-2">Detalles del Usuario que modifico al operador</h3>
              <p>
                <strong>Creado por:</strong> {{ operatorStore.operator.user.firstName }}
                {{ operatorStore.operator.user.lastName }}
              </p>
              <p><strong>CI:</strong> {{ operatorStore.operator.user.ci }}</p>
              <p><strong>Correo Electrónico:</strong> {{ operatorStore.operator.user.email }}</p>
              <p><strong>Número de Celular:</strong> {{ operatorStore.operator.user.cellphone }}</p>
            </div>

            <div class="mb-4">
              <h3 class="text-lg font-bold mb-2">Detalles del Usuario Operador</h3>
              <p>
                <strong>Usuario operador acargo:</strong>
                {{ operatorStore.operator.operator.firstName }}
                {{ operatorStore.operator.operator.lastName }}
              </p>
              <p>
                <strong>Fecha de Nacimiento:</strong>
                {{ operatorStore.operator.operator.birthday }}
              </p>
              <p><strong>CI:</strong> {{ operatorStore.operator.operator.ci }}</p>
              <p>
                <strong>Número de Celular:</strong>
                {{ operatorStore.operator.operator.cellphone }}
              </p>
            </div>
          </div>
        </div>

        <!-- Pie de la tarjeta -->
        <div class="mt-4">
          <p class="text-gray-600 text-sm">
            Fecha de Creación: {{ dateFormat(new Date(operatorStore.operator.createdAt)) }}
          </p>
          <p class="text-gray-600 text-sm">
            Fecha de Actualización: {{ dateFormat(new Date(operatorStore.operator.updatedAt)) }}
          </p>
        </div>
      </div>
    </div>
  </Card>
  <Card
    title="Propietarios de vehiculos"
    description="Propietarios de vehiculos del operador"
    icon="fa-user-tie"
  >
    <template v-slot:button>
      <router-link :to="'/owner/' + operatorId + '/create'">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar propietario</Button>
      </router-link>
    </template>
    <ListOwner />
  </Card>
  <Card
    title="Lista de vehiculos y conductores"
    description="Lista de vehiculos y conductores del operador"
    icon="fa-car-side"
  >
    <template v-slot:button>
      <router-link :to="'/vehicle/' + operatorId + '/create'">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar vehiculo</Button>
      </router-link>
    </template>
    <ListVehicle />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListVehicle from '@/modules/admin/ListVehicle.vue'
import ListOwner from '@/modules/admin/ListOwner.vue'
import { useRoute } from 'vue-router'
import { useOperatorStore } from '@/stores/operator.stores'
import { ref, onMounted } from 'vue'
import LoadingBase from '@/commun/me/LoadingBase.vue'
import { dateFormat } from '@/lib/dateFormat'
const operatorStore = useOperatorStore()
const route = useRoute()
const operatorId = ref(route.params.id)
if (!operatorId.value || operatorId.value === '' || typeof operatorId.value !== 'string') {
  throw new Error('No se ha encontrado el operador')
}

onMounted(() => {
  try {
    operatorStore.getOperator(parseInt(operatorId.value, 10))
  } catch (error) {
    console.log(error)
  }
})
</script>
