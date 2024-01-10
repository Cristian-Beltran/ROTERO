<template>
  <Card title="Operadores" description="Lista de operadores registrados" icon="fa-building">
    <template v-slot:button>
      <router-link to="/operator/create">
        <Button type="primary"><v-icon name="fa-plus" class="mr-2" />Agregar operador</Button>
      </router-link>
    </template>
    <ListOperator />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ListOperator from '@/modules/admin/ListOperator.vue'
</script>
