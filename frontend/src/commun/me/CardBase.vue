<template>
  <Card class="w-full">
    <CardHeader class="bg-zinc-200">
      <CardTitle class="flex items-center justify-between">
        <div><v-icon :name="icon" scale="1.6" class="mr-2" />{{ title }}</div>
        <slot name="button"
      /></CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardContent> <slot /></CardContent>
    <CardFooter class="flex justify-between px-6 pb-6"> <slot name="footer" /></CardFooter>
  </Card>
</template>
<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/commun/ui/card'
defineProps({
  title: {
    type: String,
    default: 'Card title'
  },
  description: {
    type: String,
    default: 'Card description'
  },
  icon: {
    type: String
  }
})
</script>
