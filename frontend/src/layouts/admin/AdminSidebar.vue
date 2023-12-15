<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform border-r sm:translate-x-0 bg-zinc-800 border-zinc-700"
    :class="[utilsStore.sideBarShow ? 'translate-x-0 ease-out' : '-translate-x-full ease-in']"
    aria-label="Sidebar"
  >
    <div class="h-full px-1 pb-4 overflow-y-auto bg-zinc-800">
      <ul class="space-y-2 font-medium">
        <li>
          <Archor to="/dashboard" icon="fa-flipboard" name="Panel de control" />
        </li>
        <li>
          <Archor to="/admin" icon="fa-user-shield" name="Administrador" />
        </li>
        <li>
          <Archor to="/auth/login" icon="fa-building" name="Operadores" />
        </li>
        <li>
          <ArchorGroup icon="fa-user-tie" name="Consultores">
            <Archor to="/consultor" icon="fa-user-tie" name="Consultores" />
            <Archor to="/role" icon="fa-user-cog" name="Roles" />
          </ArchorGroup>
        </li>
        <li>
          <ArchorGroup icon="fa-dollar-sign" name="Ordenes de pago">
            <Archor to="/auth/login" icon="fa-dollar-sign" name="Ordenes de pago" />
            <Archor to="/auth/login" icon="fa-file-invoice-dollar" name="Reporte" />
          </ArchorGroup>
        </li>
        <li>
          <Archor to="/auth/login" icon="fa-ticket-alt" name="Rosetas" />
        </li>
        <li>
          <Archor to="/auth/login" icon="fa-clipboard-list" name="Sanciones" />
        </li>
        <li>
          <ArchorGroup icon="fa-map-marked-alt" name="Rutas">
            <Archor to="/auth/login" icon="fa-list-ul" name="Lista de rutas" />
            <Archor to="/auth/login" icon="fa-map-marked-alt" name="Vista de rutas" />
          </ArchorGroup>
        </li>
      </ul>
    </div>
  </aside>
</template>
<script setup lang="ts">
import ArchorGroup from '@/commun/me/ArchorGroup.vue'
import Archor from '@/commun/me/ArchorBase.vue'
import { useUtilsStore } from '@/stores/utils.stores'
const utilsStore = useUtilsStore()
</script>
