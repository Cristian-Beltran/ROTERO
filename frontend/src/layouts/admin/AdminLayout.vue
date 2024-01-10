<template>
  <main>
    <Navbar />
    <SidebarSAdmin v-if="authStore.auth.permissionLevel === 'SUPERADMINISTRADOR'" />
    <SidebarAdmin v-else-if="authStore.auth.permissionLevel === 'ADMINISTRADOR'" />
    <SidebarTecnical v-else-if="authStore.auth.permissionLevel === 'TECNICO'" />
    <SidebarConsultor v-else-if="authStore.auth.permissionLevel === 'CONSULTOR'" />

    <div class="p-4 sm:ml-64">
      <div class="p-4 rounded-lg mt-14">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import SidebarSAdmin from '@/layouts/admin/SuperAdminSidebar.vue'
import SidebarAdmin from '@/layouts/admin/AdminSidebar.vue'
import SidebarTecnical from '@/layouts/admin/TecnicalSidebar.vue'
import SidebarConsultor from '@/layouts/admin/ConsultorSidebar.vue'
import Navbar from '@/layouts/admin/AdminNavbar.vue'
import { useAuthStore } from '@/stores/auth.stores'
const authStore = useAuthStore()
</script>
