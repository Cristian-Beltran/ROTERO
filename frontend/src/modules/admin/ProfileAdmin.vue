<template>
  <form @submit="onsubmit">
    <div class="grid lg:grid-cols-2 mt-6 gap-y-4 gap-x-2 sm:grid-cols-1">
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="col-span-2">
          <FormLabel>Correo electrónico</FormLabel>
          <FormControl>
            <Input type="email" disabled placeholder="correo@gmail.com " v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" class="w-6/12" name="firstName">
        <FormItem>
          <FormLabel>Nombre/s</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Nombre" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastName">
        <FormItem>
          <FormLabel>Apellido/s</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Apellidos" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="birthday">
        <FormItem>
          <FormLabel>Fecha de nacimiento</FormLabel>
          <FormControl>
            <Input type="date" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="ci">
        <FormItem>
          <FormLabel>Carnet de identidad</FormLabel>
          <FormControl>
            <Input type="text" placeholder="123456" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="cellphone">
        <FormItem>
          <FormLabel>Teléfono celular</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Numero de celular" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="flex justify-between mt-8">
      <Button type="button" variant="destructive" @click="exit"
        ><v-icon name="fa-times" class="mr-2" />Salir</Button
      >
      <Button type="submit"><v-icon name="fa-save" class="mr-2" />Guardar cambios</Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import { Button } from '@/commun/ui/button'
import { useAuthStore } from '@/stores/auth.stores'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useToast } from 'vue-toastification'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/commun/ui/form'
import { Input } from '@/commun/ui/input'
import { useRouter } from 'vue-router'
const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()
const formSchema = toTypedSchema(
  z.object({
    firstName: z
      .string()
      .min(2, {
        message: 'El nombre debe tener al menos 2 caracteres'
      })
      .max(50, {
        message: 'El nombre debe tener menos de 50 caracteres'
      }),
    lastName: z
      .string()
      .min(2, {
        message: 'El apellido debe tener al menos 2 caracteres'
      })
      .max(50, {
        message: 'El apellido debe tener menos de 50 caracteres'
      }),
    birthday: z
      .date()
      .min(new Date(1900, 1, 1), {
        message: 'La fecha de nacimiento debe ser mayor a 1900'
      })
      .max(new Date(), {
        message: 'La fecha de nacimiento debe ser menor a la fecha actual'
      }),
    ci: z
      .string()
      .min(7, {
        message: 'El carnet de identidad debe tener al menos 7 caracteres'
      })
      .max(10, {
        message: 'El carnet de identidad debe tener menos de 10 caracteres'
      }),
    email: z.string().email({
      message: 'El correo electrónico no es válido'
    }),
    cellphone: z.optional(z.null())
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    firstName: authStore.auth.firstName,
    lastName: authStore.auth.lastName,
    birthday: new Date(authStore.auth.birthday),
    ci: authStore.auth.ci,
    email: authStore.auth.email,
    cellphone: authStore.auth.cellphone
  }
})
const onsubmit = handleSubmit(async (values) => {
  try {
    toast.success('Perfil actualizado')
  } catch (error: any) {
    toast.error(error.message)
  }
})
const exit = () => {
  console.log('exit')
  router.push('/')
}
</script>
