<template>
  <Card title="Leer roseta" description="Lectura de roseta" icon="fa-qrcode">
    <template v-slot:button>
      <Button type="primary" @click="process = true"
        ><v-icon name="fa-plus" class="mr-2" />Leer qr</Button
      >
    </template>
    <div class="max-w-2xl m-auto mt-4" v-if="process">
      <qrcode-stream :track="paintOutline"></qrcode-stream>
    </div>
    <div v-else>
      <InfoRossete v-if="token && !loading" />
    </div>
  </Card>
</template>
<script setup lang="ts">
import InfoRossete from '@/modules/admin/InfoRossete.vue'
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { ref, watch } from 'vue'
import { useRosseteStore } from '@/stores/rossete.stores'
import { useToast } from 'vue-toastification'
import LoadingBase from '@/commun/me/LoadingBase.vue'
const loading = ref(false)
const toast = useToast()
const rosseteStore = useRosseteStore()
const token = ref('')
const process = ref(false)
async function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
    token.value = detectedCode.rawValue
    if (token.value && process.value) {
      process.value = false
    }
  }
}
watch(
  () => token.value,
  async (value) => {
    if (value) {
      try {
        loading.value = true;
        await rosseteStore.readQrRossete(token.value)
        loading.value = false;
      } catch (error) {
        toast.error(error.response.data.message)
        token.value = ''
      }
    }
  }
)
</script>
