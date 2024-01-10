<template>
  <Card title="Rosetas" description="Lista de rosetas" icon="fa-ticket-alt">
    <template v-slot:button>
      <router-link to="/rossete/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Crear Roseta</Button>
      </router-link>
    </template>
    <ListRossete />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListRossete from '@/modules/admin/ListRossete.vue'
</script>
