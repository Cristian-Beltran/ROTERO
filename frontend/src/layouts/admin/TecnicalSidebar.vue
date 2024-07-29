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
          <Archor to="/payorder" icon="fa-dollar-sign" name="Ordenes de pago" />
        </li>
        <li>
          <Archor to="/rossete" icon="fa-ticket-alt" name="Rosetas" />
        </li>
        <li>
          <Archor to="/santion" icon="fa-clipboard-list" name="Sanciones" />
        </li>
        <!-- 
        <li>
          <Archor to="/readQr" icon="fa-qrcode" name="Leer roseta" />
        </li>
        -->
        <li>
          <Archor to="/route/map" icon="fa-map-marked-alt" name="Vista de rutas" />
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
