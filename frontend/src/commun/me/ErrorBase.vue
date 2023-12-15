<template>
  <p class="text-xs text-red-400 rounded-md">
    {{ errors[0]?.$message }}
  </p>
</template>

<script setup lang="ts">
defineProps({
  errors: {
    type: Array,
    required: true
  }
})
</script>
