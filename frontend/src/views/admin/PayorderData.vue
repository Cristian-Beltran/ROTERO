<template>
  <Card title="Orden de pago" description="Datos de orden de pago" icon="fa-dollar-sign">
    <FormPayorder />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import FormPayorder from '@/modules/admin/FormPayorder.vue'
</script>
