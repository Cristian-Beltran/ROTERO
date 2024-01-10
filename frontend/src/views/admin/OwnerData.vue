<template>
  <Card title="Propietario" description="Datos de propietario de vehiculo" icon="fa-user-tie">
    <FormOwner />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import FormOwner from '@/modules/admin/FormOwner.vue'
</script>
