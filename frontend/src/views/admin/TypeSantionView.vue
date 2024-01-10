<template>
  <Card title="Tipos de sanciones" description="Lista de tipos de sanciones" icon="fa-clipboard-list">
    <template v-slot:button>
      <router-link to="/type-santion/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar tipo de sanción</Button>
      </router-link>
    </template>
    <ListTypeSantion/>
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListTypeSantion from '@/modules/admin/ListTypeSantion.vue'
</script>
