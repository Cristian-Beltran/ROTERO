<template>
  <form action="" @submit="handleSubmit">
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
import Input from '@/commun/ui/input/Input.vue'
import Label from '@/commun/ui/label/Label.vue'
import Error from '@/commun/me/ErrorBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed, onMounted } from 'vue'
import { useOwnerStore } from '@/stores/owner.stores'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const load = ref(false)
const ownerStore = useOwnerStore()
const toast = useToast()
const router = useRouter()
const route = useRoute()
const formData = reactive({
  firstName: '',
  lastName: '',
  ci: '',
  cellphone: ''
})

const rules = computed(() => ({
  firstName: { required: helpers.withMessage('El nombre es requerido', required) },
  lastName: { required: helpers.withMessage('El apellido es requerido', required) },
  ci: { required: helpers.withMessage('La cédula de identidad es requerida', required) },
  cellphone: { required: helpers.withMessage('El teléfono es requerido', required) }
}))

const v$ = useVuelidate(rules, formData)

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    load.value = true
    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        ci: formData.ci,
        cellphone: formData.cellphone,
        operatorId: parseInt(route.params.id)
      }
      if (!route.query.id) await ownerStore.createOwner(data)
      else await ownerStore.updateOwner(route.query.id, data)
      toast.success('Propietario guardado')
      router.push({ name: 'operator-info', params: { id: route.params.id } })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    load.value = false
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      await ownerStore.getOwner(route.query.id)
      formData.firstName = ownerStore.owner.firstName
      formData.lastName = ownerStore.owner.lastName
      formData.ci = ownerStore.owner.ci
      formData.cellphone = ownerStore.owner.cellphone
    } catch (error) {
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
