<template>
  <Card title="Firmas" description="Firmas de autorización" icon="fa-signature">
    <form action="" @submit="handleSubmit">
      <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
        <div class="grid items-center">
          <Label for="firmOne">Primera firma</Label>
          <Input
            id="firmOne"
            type="file"
            v-on:change="onFileChangeF1"
            accept="image/png,image/jpg,image/jpeg"
          />
        </div>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-x-4 gap-y-4">
        <div class="grid items-center">
          <Label for="firmTwo">Segunda firma</Label>
          <Input
            id="firmTwo"
            type="file"
            v-on:change="onFileChangeF2"
            accept="image/png,image/jpg,image/jpeg"
          />
        </div>
      </div>
      <div class="flex justify-between mt-4">
        <Button class="" :disabled="load" type="submit">
          <v-icon v-if="load" name="fa-spinner" animation="spin-pulse" />
          <v-icon v-else name="fa-save" /> Guardar</Button
        >
      </div>
    </form>
  </Card>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import Input from '@/commun/ui/input/Input.vue'
import Label from '@/commun/ui/label/Label.vue'
import { useAuthStore } from '@/stores/auth.stores'
import { useToast } from 'vue-toastification'
const toast = useToast()
const authStore = useAuthStore()
const f1 = ref('')
const f2 = ref('')
const load = ref(false)
const onFileChangeF1 = (event) => {
  f1.value = event.target.files[0]
}
const onFileChangeF2 = (event) => {
  f2.value = event.target.files[0]
}
const handleSubmit = async (event) => {
  if (event) event.preventDefault()
  load.value = true
  if (f1.value) {
    const formData = new FormData()
    formData.append('file', f1.value)
    await authStore.uploadFirmOne(formData)
  }
  if (f2.value) {
    const formData = new FormData()
    formData.append('file', f2.value)
    await authStore.uploadFirmTwo(formData)
  }
  load.value = false
  toast.success('Firmas guardadas correctamente')
}
</script>
