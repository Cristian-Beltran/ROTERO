<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.stores'
import { Button } from '@/commun/ui/button'
import { useToast } from 'vue-toastification'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/commun/ui/form'
import { Input } from '@/commun/ui/input'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const useAuth = useAuthStore()

const formSchema = toTypedSchema(
  z.object({
    email: z
      .string()
      .min(2, { message: 'email invalido' })
      .max(50)
      .email({ message: 'email invalido' }),
    password: z.string().min(2, { message: 'contraseña invalida' }).max(50)
  })
)
const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    email: '',
    password: ''
  }
})

const toast = useToast()
const loading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    await useAuth.login(values.email, values.password)
    window.location.reload()
  } catch (error: any) {
    toast.error(error.response.data.message)
    resetForm()
  }
  loading.value = false
})
</script>
<template>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight dark:text-white text-black">
      Ingreso del sistema
    </h1>
    <p class="text-sm text-muted-foreground">Sistema de control de transporte</p>
  </div>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email/Correo</FormLabel>
        <FormControl>
          <Input type="email" placeholder="email@gmail.com" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Contraseña</FormLabel>
        <FormControl>
          <Input type="password" placeholder="*****" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button class="w-full" type="submit">
      <v-icon v-if="loading" name="fa-spinner" animation="spin" /> Ingresar
    </Button>
  </form>
</template>
