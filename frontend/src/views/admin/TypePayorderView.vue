<template>
  <Card title="Tipos de pagos" description="Lista de tipos de pagos" icon="fa-dollar-sign">
    <template v-slot:button>
      <router-link to="/type-payorder/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar tipo de pago</Button>
      </router-link>
    </template>
    <ListTypePayorder/>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListTypePayorder from '@/modules/admin/ListTypePayorder.vue'
</script>
