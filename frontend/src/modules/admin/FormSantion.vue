<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="typeSantionId">Tipo de sanción</Label>
        <Select id="typeSantionId" v-model="v$.typeSantionId.$model">
          <SelectTrigger class="">
            <SelectValue placeholder="Seleccione un tipo sanción" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipos de sanciones</SelectLabel>
              <SelectItem
                v-for="typeSantion in typeSantionStore.typeSantions"
                :key="typeSantion.id"
                :value="typeSantion.id"
              >
                {{ typeSantion.typePayorder.name }} - {{ typeSantion.typePayorder.amount }} Bs.
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Error :errors="v$.typeSantionId.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="detail">Detalle</Label>
        <Input
          id="detail"
          type="text"
          placeholder="Detalle de la orden de pago"
          v-model="v$.detail.$model"
        />
        <Error :errors="v$.detail.$errors" />
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
    </div>
    <div class="flex justify-between mt-4">
      <router-link to="/santion">
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
import { useSantionStore } from '@/stores/santion.stores'
import { useOperatorStore } from '@/stores/operator.stores'
import { useTypeSantionStore } from '@/stores/typeSantion.stores'
const typeSantionStore = useTypeSantionStore()
const operatorStore = useOperatorStore()
const santionStore = useSantionStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const formData = reactive({
  typeSantionId: '',
  detail: '',
  operatorId: ''
})

const rules = computed(() => ({
  detail: { required: helpers.withMessage('Campo requerido', required) },
  operatorId: { required: helpers.withMessage('Campo requerido', required) },
  typeSantionId: { required: helpers.withMessage('Campo requerido', required) }
}))

const v$ = useVuelidate(rules, formData)
try {
  operatorStore.getOperators()
} catch (error) {
  toast.error('Error al cargar los operadores')
}
try {
  typeSantionStore.getTypeSantions()
} catch (error) {
  toast.error('Error al cargar los tipos de sanciones')
}

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    try {
      if (!route.query.id) await santionStore.createSantion(formData)
      else await santionStore.updateSantion(route.query.id, formData)
      toast.success('Multa guardada')
      router.push({ name: 'santion' })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      await santionStore.getSantion(route.query.id)
      formData.typeSantionId = santionStore.santion.typeSantion.id
      formData.detail = santionStore.santion.detail
      formData.operatorId = santionStore.santion?.operator.id
    } catch (error) {
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
