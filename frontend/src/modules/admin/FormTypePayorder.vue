<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="name">Nombre del tipo de pago</Label>
        <Input
          id="name"
          type="text"
          placeholder="Nombre de tipo de pago"
          v-model="v$.name.$model"
        />
        <Error :errors="v$.name.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="detail">Detalle</Label>
        <Input
          id="detail"
          type="text"
          placeholder="Detalle del tipo de pago"
          v-model="v$.detail.$model"
        />
        <Error :errors="v$.detail.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="amount">Monto de tipo de pago (Bs)</Label>
        <Input id="amount" type="number" v-model="v$.amount.$model" />
        <Error :errors="v$.amount.$errors" />
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <router-link to="/type-payorder">
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
import { useTypePayorderStore } from '@/stores/typePayorder.stores'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const typePayorderStore = useTypePayorderStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const formData = reactive({
  name: '',
  detail: '',
  amount: '',
  type: 'PAGO'
})

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Se requiere el nombre', required)
  },
  detail: {
    required: helpers.withMessage('Se requiere un detalle', required)
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
      if (!route.query.id) await typePayorderStore.createTypePayorder(formData)
      else await typePayorderStore.updateTypePayorder(route.query.id, formData)
      toast.success('El tipo de sanción se guardo correctamenti')
      router.push({ name: 'type-payorder' })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      await typePayorderStore.getTypePayorder(route.query.id)
      formData.name = typePayorderStore.typePayorder?.name
      formData.detail = typePayorderStore.typePayorder?.detail
      formData.amount = typePayorderStore.typePayorder?.amount
      formData.type = typePayorderStore.typePayorder?.type
    } catch (error) {
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
