<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="email">Email</Label>
        <Input id="email" type="email" placeholder="Correo electronico" v-model="v$.email.$model" />
        <Error :errors="v$.email.$errors" />
      </div>
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
    <div class="flex justify-between mt-4">
      <router-link to="/">
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
import { useAuthStore } from '@/stores/auth.stores'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  birthday: '',
  ci: '',
  cellphone: ''
})

const rules = computed(() => ({
  firstName: { required: helpers.withMessage('El nombre es requerido', required) },
  lastName: { required: helpers.withMessage('El apellido es requerido', required) },
  email: {
    required: helpers.withMessage('El email es requerido', required),
    email: helpers.withMessage('El email no es válido', required)
  },
  birthday: { required: helpers.withMessage('La fecha de nacimiento es requerida', required) },
  ci: { required: helpers.withMessage('La cédula de identidad es requerida', required) },
  cellphone: { required: helpers.withMessage('El teléfono es requerido', required) }
}))

const v$ = useVuelidate(rules, formData)

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    try {
      await authStore.updateProfile(formData)
      toast.success('Perfil actualizado correctamente')
    } catch (error: any) {
      toast.error(error?.response?.data?.message)
    }
  }
}

onMounted(async () => {
  try {
    console.log('authStore.auth', authStore.auth)
    formData.firstName = authStore.auth.firstName
    formData.lastName = authStore.auth.lastName
    formData.email = authStore.auth.email
    formData.birthday = new Date(authStore.auth.birthday).toISOString().split('T')[0]
    formData.ci = authStore.auth.ci
    formData.cellphone = authStore.auth.cellphone
  } catch (error: any) {
    toast.error(error?.response?.data?.message)
  }
})
</script>
