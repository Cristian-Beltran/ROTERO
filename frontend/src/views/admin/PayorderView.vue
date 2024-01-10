<template>
  <Card title="Ordernes de pago" description="Lista de ordernes de pago" icon="fa-dollar-sign">
    <template v-slot:button>
      <router-link to="/payorder/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Generar orden de pago</Button>
      </router-link>
      <Button type="primary" @click="print"
        ><v-icon name="fa-file-pdf" class="mr-2" />Imprimir</Button
      >
    </template>
    <ListPayorder />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListPayorder from '@/modules/admin/ListPayorder.vue'
import { usePayorderStore } from '@/stores/payorder.stores'
const payorderStore = usePayorderStore()
const print = async () => {
  payorderStore.getPayordersPdf()
}
</script>
