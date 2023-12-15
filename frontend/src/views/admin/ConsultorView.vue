<template>
  <Card title="Consultores" description="Lista de consultores" icon="fa-user-tie">
    <template v-slot:button>
      <router-link to="/consultor/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar consultor</Button>
      </router-link>
    </template>
    <ListConsultor />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListConsultor from '@/modules/admin/ListConsultor.vue'
</script>
