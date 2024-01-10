<template>
  <div class="flex flex-col min-h-screen font-sans">
    <Header />
    <main class="flex-1 bg-gray-100">
      <router-view />
    </main>
    <Footer />
  </div>
</template>
<script setup lang="ts">
import Header from '@/layouts/consult/PublicHeader.vue'
import Footer from '@/layouts/consult/PublicFooter.vue'
</script>
