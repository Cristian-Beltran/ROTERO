<template>
  <form action="" @submit="handleSubmit">
    <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
      <div class="grid items-center">
        <Label for="name">Nombre</Label>
        <Input id="name" type="text" placeholder="Nombre de rol" v-model="v$.name.$model" />
        <Error :errors="v$.name.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="description">Descripción</Label>
        <Input
          id="descrption"
          type="text"
          placeholder="Descripción de rol"
          v-model="v$.description.$model"
        />
        <Error :errors="v$.description.$errors" />
      </div>
      <div class="grid items-center">
        <Label for="pPersonal">Persmiso personal</Label>
        <Input
          id="pPersonal"
          type="checkbox"
          class="w-4"
          placeholder="Permiso personal"
          v-model="v$.pPersonal.$model"
        />
      </div>
      <div class="grid items-center">
        <Label for="pOwner">Persmiso de propietario</Label>
        <Input
          id="pOwner"
          type="checkbox"
          class="w-4"
          placeholder="Permiso de propietario"
          v-model="v$.pOwner.$model"
        />
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <router-link to="/role">
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
import { useRoleStore } from '@/stores/role.stores'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const roleStore = useRoleStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const formData = reactive({
  name: '',
  description: '',
  pOwner: false,
  pPersonal: false
})

const rules = computed(() => ({
  name: {
    required: helpers.withMessage('Se requiere el nombre', required)
  },
  description: {
    required: helpers.withMessage('Se requiere una descripción', required)
  },
  pPersonal: {
    required: helpers.withMessage('Se requiere ', required)
  },
  pOwner: {
    required: helpers.withMessage('Se requiere ', required)
  }
}))

const v$ = useVuelidate(rules, formData)

async function handleSubmit(e) {
  if (e) e.preventDefault()
  const isFormCorrect = await v$.value.$validate()
  if (isFormCorrect) {
    try {
      if (!route.query.id) await roleStore.createRole(formData)
      else await roleStore.updateRole(route.query.id, formData)
      toast.success('Rol guardado con éxito')
      router.push({ name: 'role' })
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
}

onMounted(async () => {
  if (route.query.id) {
    try {
      await roleStore.getRole(route.query.id)
      formData.name = roleStore.role.name
      formData.description = roleStore.role.description
      formData.pOwner = roleStore.role.pOwner
      formData.pPersonal = roleStore.role.pPersonal
    } catch (error) {
      toast.error(error?.response.data.errors[0])
    }
  }
})
</script>
