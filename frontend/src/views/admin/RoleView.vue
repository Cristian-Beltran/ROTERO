<template>
  <Card title="Roles" description="Lista de roles de consultores" icon="fa-user-cog">
    <template v-slot:button>
      <router-link to="/role/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar role</Button>
      </router-link>
    </template>

    <ListRole />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListRole from '@/modules/admin/ListRole.vue'
</script>
