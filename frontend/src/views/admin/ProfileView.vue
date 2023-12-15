<template>
  <Card title="Perfil de usuario" description="Datos personales de la cuenta" icon="fa-user">
    <template v-slot:button>
      <Button type="secondary"><v-icon name="fa-lock" class="mr-2" />Cambiar contraseña</Button>
    </template>
    <ProfileAdmin />
  </Card>
</template>
<script setup lang="ts">
import Card from '@/commun/me/CardBase.vue'
import Button from '@/commun/ui/button/Button.vue'
import ProfileAdmin from '@/modules/admin/ProfileAdmin.vue'
</script>
