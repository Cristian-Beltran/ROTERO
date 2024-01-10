<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button><v-icon name="fa-lock" /> Cambiar contraseña</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle> <v-icon name="fa-lock" />Cambiar contraseña</DialogTitle>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="old" class="text-right"> Contraseña actual </Label>
          <Input v-model="passwordOld" id="old" type="password" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="new" class="text-right"> Nueva contraseña</Label>
          <Input v-model="password" id="new" type="password" class="col-span-3" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="repeat" class="text-right"> Repetir nueva contraseña</Label>
          <Input v-model="passwordRepeat" id="repeat" type="password" class="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" @click="submit"> <v-icon name="fa-save" /> Guardar contraseña</Button>
        <DialogClose as-child>
          <Button type="button" variant="destructive"> Cerrar</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
<script setup lang="ts">
import { Button } from '@/commun/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/commun/ui/dialog'
import { Input } from '@/commun/ui/input'
import { Label } from '@/commun/ui/label'
import { useToast } from 'vue-toastification'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth.stores'
const authStore = useAuthStore()
const toast = useToast()
const password = ref('')
const passwordRepeat = ref('')
const passwordOld = ref('')

const validate = () => {
  if (!passwordOld.value) {
    toast.error('Ingrese su contraseña actual')
    return false
  }
  if (!password.value) {
    toast.error('Ingrese su nueva contraseña')
    return false
  }
  if (!passwordRepeat.value) {
    toast.error('Repita su nueva contraseña')
    return false
  }
  if (password.value !== passwordRepeat.value) {
    toast.error('Las contraseñas no coinciden')
    return false
  }
  return true
}

const submit = async () => {
  try {
    if (!validate()) return
    await authStore.updatePassword({ oldPassword: passwordOld.value, password: password.value })
    toast.success('Contraseña cambiada con éxito')
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
}
</script>
