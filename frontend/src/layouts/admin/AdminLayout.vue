<template>
  <main>
    <Navbar />
    <Sidebar />
    <div class="p-4 sm:ml-64">
      <div class="p-4 rounded-lg mt-14">
        <router-view></router-view>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import Sidebar from '@/layouts/admin/AdminSidebar.vue'
import Navbar from '@/layouts/admin/AdminNavbar.vue'
</script>
