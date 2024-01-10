<template>
  <Card title="Perfil de usuario" description="Datos personales de la cuenta" icon="fa-user">
    <template v-slot:button>
      <FormPassword />
    </template>
    <ProfileAdmin />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import ProfileAdmin from '@/modules/admin/ProfileAdmin.vue'
import FormPassword from '@/modules/admin/FormPassword.vue'
</script>
