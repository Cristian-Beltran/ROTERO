<template>
  <Card title="Sanciones" description="Lista de sanciones" icon="fa-clipboard-list">
    <template v-slot:button>
      <router-link to="/santion/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Generar sanción</Button>
      </router-link>
    </template>
    <ListSantion />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListSantion from '@/modules/admin/ListSantion.vue'
</script>
