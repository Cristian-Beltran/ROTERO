<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="name">Nombre de sanción</Label>
        <Input
          id="name"
          type="text"
          placeholder="Nombre de tipo de sanción"
          v-model="v$.name.$model"
        />
        <Error :errors="v$.name.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="detail">Detalle</Label>
        <Input
          id="detail"
          type="text"
          placeholder="Descripción de rol"
          v-model="v$.detail.$model"
        />
        <Error :errors="v$.detail.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="amoun">Monto de tipo de pago (Bs)</Label>
        <Input id="amoun" type="number" v-model="v$.amount.$model" />
        <Error :errors="v$.amount.$errors" />
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <router-link to="/type-santion">
        <Button type="button" variant="destructive"
          ><v-icon name="fa-times" class="mr-2" />Salir</Button
        >
      </router-link>
      <Button class=""><v-icon name="fa-save" type="submit" />Guardar</Button>
    </div>
  </form>
</template>
<script setup lang="ts">

import Input from '@/commun/ui/input/Input.vue'
import Label from '@/commun/ui/label/Label.vue'
import Error from '@/commun/me/ErrorBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed, onMounted } from 'vue'
import { useTypeSantionStore } from '@/stores/typeSantion.stores'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const typeSantionStore = useTypeSantionStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const formData = reactive({
  name: '',
  detail: '',
  amount: '',
  type: 'SANCION'
})

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Se requiere el nombre', required)
  },
  detail: {
    required: helpers.withMessage('Se requiere una descripción', required)
  },
  amount: {
    required: helpers.withMessage('Se requiere el monto', required)
  }
}))

const v$ = useVuelidate(rules, formData)

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    try {
      if (!route.query.id) await typeSantionStore.createTypeSantion(formData)
      else await typeSantionStore.updateTypeSantion(route.query.id, formData)
      toast.success('El tipo de multa se guardo correctamenti')
      router.push({ name: 'type-santion' })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      await typeSantionStore.getTypeSantion(route.query.id)
      formData.name = typeSantionStore.typeSantion?.name
      formData.detail = typeSantionStore.typeSantion?.detail
      formData.amount = typeSantionStore.typeSantion?.amount
      formData.type = typeSantionStore.typeSantion?.type
    } catch (error) {
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
