<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-4">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Datos del representante legal</h3>
      <p class="mt-1 text-sm text-gray-500">Datos del representante legal de la empresa</p>
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
        <Label for="birthday">Fecha de nacimiento</Label>
        <Input
          id="birthday"
          type="date"
          placeholder="Fecha de nacimiento"
          v-model="v$.birthday.$model"
        />
        <Error :errors="v$.birthday.$errors" />
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
      <h3 class="text-lg leading-6 font-medium text-gray-900">Datos de la empresa</h3>
      <p class="mt-1 text-sm text-gray-500">Datos de la empresa que se registrara como operador</p>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="businessName">Razón social</Label>
        <Input
          id="businessName"
          type="text"
          placeholder="Razón social"
          v-model="v$.businessName.$model"
        />
        <Error :errors="v$.businessName.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="legalRepresentative">Representante legal</Label>
        <Input
          id="legalRepresentative"
          type="text"
          placeholder="Representante legal"
          v-model="v$.legalRepresentative.$model"
        />
        <Error :errors="v$.legalRepresentative.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="owner">Propietario</Label>
        <Input id="owner" type="text" placeholder="Propietario" v-model="v$.owner.$model" />
      </div>
      <div class="grid items-center">
        <Label for="nit">NIT</Label>
        <Input id="nit" type="text" placeholder="NIT" v-model="v$.nit.$model" />
      </div>

      <div class="grid items-center">
        <Label for="observations">Observaciones</Label>
        <Textarea
          id="observations"
          type="text"
          placeholder="Observaciones"
          v-model="v$.observations.$model"
        />
        <Error :errors="v$.observations.$errors" />
      </div>

      <div class="grid items-center">
        <Label for="seprec">SEPREC</Label>
        <Input id="seprec" type="text" placeholder="SEPREC" v-model="v$.seprec.$model" />
      </div>
      <div class="grid items-center">
        <Label for="entityMatris">Entidad matriz</Label>
        <Input
          id="entityMatris"
          type="text"
          placeholder="Entidad matriz"
          v-model="v$.entityMatris.$model"
        />
        <Error :errors="v$.entityMatris.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="color">Color</Label>
        <Input id="color" type="color" v-model="v$.color.$model" />
        <Error :errors="v$.color.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="observations">Detalle de ruta</Label>
        <Textarea id="route" type="text" placeholder="Ruta explicada" v-model="v$.route.$model" />
        <Error :errors="v$.route.$errors" />
      </div>
    </div>
    <hr class="h-px my-8 bg-gray-600 border-0" />
    <div class="mt-4">
      <h3 class="text-lg leading-6 font-medium text-gray-900">Documentos requeridos</h3>
      <p class="mt-1 text-sm text-gray-500">
        Documentos del operador requeridos para su validación
      </p>
    </div>
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="administrativeResolution">Resolución administrativa</Label>
        <Input id="administrativeResolution" type="file" v-on:change="onFileChangeRA" />
      </div>
      <div class="grid items-center">
        <Label for="dateRa">Fecha de RA</Label>
        <Input id="dateRa" type="date" placeholder="Fecha de RA" v-model="v$.dateRa.$model" />
      </div>
      <div class="grid items-center">
        <Label for="tecnicalNumberUrl">Número técnico PDF</Label>
        <Input id="tecnicalNumberUrl" type="file" v-on:change="onFileChangeTN" />
      </div>
      <div class="grid items-center">
        <Label for="tecnicalNumber">Número técnico</Label>
        <Input
          id="tecnicalNumber"
          type="text"
          placeholder="Número técnico"
          v-model="formData.tecnicalNumber"
        />
      </div>
      <div class="grid items-center">
        <Label for="legalNumberUrl">Número legal PDF</Label>
        <Input id="legalNumberUrl" type="file" v-on:change="onFileChangeLN" />
      </div>
      <div class="grid items-center">
        <Label for="legalNumber">Número legal</Label>
        <Input
          id="legalNumber"
          type="text"
          placeholder="Número legal"
          v-model="formData.legalNumber"
        />
      </div>
      <div class="grid items-center">
        <Label for="validity">Validez de Certificado de operador</Label>
        <Input id="validity" type="date" placeholder="Validez" v-model="formData.validity" />
      </div>
    </div>

    <div class="flex justify-between mt-4">
      <router-link to="/operator">
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
import Input from '@/commun/ui/input/Input.vue'
import Label from '@/commun/ui/label/Label.vue'
import Error from '@/commun/me/ErrorBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import { Textarea } from '@/commun/ui/textarea'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { ref, reactive, computed, onMounted } from 'vue'

import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useOperatorStore } from '@/stores/operator.stores'
const load = ref(false)
const operatorStore = useOperatorStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const formData = reactive({
  businessName: '',
  legalRepresentative: '',
  owner: '',
  nit: '',
  dateRa: '',
  tecnicalNumber: '',
  legalNumber: '',
  observations: '',
  validity: '',
  seprec: '',
  route: '',

  firstName: '',
  lastName: '',
  ci: '',
  birthday: '',
  cellphone: '',
  entityMatris: '',
  color: ''
})

const rules = computed(() => ({
  firstName: { required: helpers.withMessage('El nombre es requerido', required) },
  lastName: { required: helpers.withMessage('El apellido es requerido', required) },

  birthday: { required: helpers.withMessage('La fecha de nacimiento es requerida', required) },
  ci: { required: helpers.withMessage('La cédula de identidad es requerida', required) },
  cellphone: { required: helpers.withMessage('El teléfono es requerido', required) },
  businessName: { required: helpers.withMessage('La razón social es requerida', required) },
  legalRepresentative: {
    required: helpers.withMessage('El representante legal es requerido', required)
  },
  route: { required: helpers.withMessage('La ruta es requerida', required) },
  owner: {  },
  nit: { },
  dateRa: { },
  observations: { required: helpers.withMessage('Las observaciones son requeridas', required) },
  seprec: {  },
  entityMatris: { required: helpers.withMessage('La entidad matriz es requerida', required) },
  color: { required: helpers.withMessage('El color es requerido', required) }
}))

const administrativeResolution = ref(null)
const legalNumberUrl = ref(null)
const tecnicalNumberUrl = ref(null)

const onFileChangeRA = (event) => {
  administrativeResolution.value = event.target.files[0]
}
const onFileChangeLN = (event) => {
  legalNumberUrl.value = event.target.files[0]
}
const onFileChangeTN = (event) => {
  tecnicalNumberUrl.value = event.target.files[0]
}

const v$ = useVuelidate(rules, formData)

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    load.value = true
    try {
      const data = {
        operator: {
          businessName: formData.businessName,
          legalRepresentative: formData.legalRepresentative,
          owner: formData.owner || null,
          nit: formData.nit || null,
          dateRa: formData.dateRa || null,
          tecnicalNumber: formData.tecnicalNumber,
          legalNumber: formData.legalNumber,
          observations: formData.observations,
          validity: formData.validity || null,
          seprec: formData.seprec || null,
          entityMatris: formData.entityMatris,
          color: formData.color,
          route: formData.route
        },
        operatorUser: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          ci: formData.ci,
          birthday: formData.birthday,
          cellphone: formData.cellphone
        }
      }
      let operator
      let id
      if (!route.query.id) {
        operator = await operatorStore.createOperator(data)
        id = operator.data.id
      } else {
        operator = await operatorStore.updateOperator(route.query.id, data)
        id = operator.data.operator.id
      }

      if (administrativeResolution.value) {
        const formData = new FormData()
        formData.append('file', administrativeResolution.value)
        await operatorStore.uploadFile(id, formData, 'administrativeResolution')
      }
      if (legalNumberUrl.value) {
        const formData = new FormData()
        formData.append('file', legalNumberUrl.value)
        await operatorStore.uploadFile(id, formData, 'legalNumberUrl')
      }
      if (tecnicalNumberUrl.value) {
        const formData = new FormData()
        formData.append('file', tecnicalNumberUrl.value)
        await operatorStore.uploadFile(id, formData, 'tecnicalNumberUrl')
      }

      toast.success('Operador guardado')
      router.push({ name: 'operator' })
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
    load.value = false
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      await operatorStore.getOperator(route.query.id)
      formData.businessName = operatorStore.operator.businessName
      formData.legalRepresentative = operatorStore.operator.legalRepresentative
      formData.owner = operatorStore.operator.owner
      formData.nit = operatorStore.operator.nit
      formData.dateRa = operatorStore.operator.dateRa
      formData.tecnicalNumber = operatorStore.operator.tecnicalNumber
      formData.legalNumber = operatorStore.operator.legalNumber
      formData.observations = operatorStore.operator.observations
      formData.validity = operatorStore.operator.validity
      formData.seprec = operatorStore.operator.seprec
      formData.firstName = operatorStore.operator.operator.firstName
      formData.lastName = operatorStore.operator.operator.lastName
      formData.ci = operatorStore.operator.operator.ci
      formData.birthday = new Date(operatorStore.operator?.operator.birthday)
        .toISOString()
        .split('T')[0]
      formData.cellphone = operatorStore.operator?.operator.cellphone
      formData.entityMatris = operatorStore.operator.entityMatris
      formData.color = operatorStore.operator.color
      formData.route = operatorStore.operator.route
    } catch (error) {
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
