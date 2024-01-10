<template>
  <Card title="Clases de vehiculos" description="Lista de clases de vehiculos" icon="fa-car">
    <template v-slot:button>
      <router-link to="/class-vehicle/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar clase</Button>
      </router-link>
    </template>
    <ListClassVehicle/>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListClassVehicle from '@/modules/admin/ListClassVehicle.vue'
</script>
