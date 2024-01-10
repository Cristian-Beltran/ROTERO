<template>
  <Card title="Rutas" description="Lista de rutas" icon="fa-list">
    <template v-slot:button>
      <router-link to="/route/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Crear ruta</Button>
      </router-link>
    </template>
    <ListRoute />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListRoute from '@/modules/admin/ListRoute.vue'
</script>
