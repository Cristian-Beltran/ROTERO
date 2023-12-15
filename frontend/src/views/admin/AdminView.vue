<template>
  <Card title="Administradores" description="Lista de administradores" icon="fa-user-shield">
    <template v-slot:button>
      <router-link to="/admin/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar administrador </Button>
      </router-link>
    </template>
    <ListAdmin />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListAdmin from '@/modules/admin/ListAdmin.vue'
</script>
