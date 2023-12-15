<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1" class="border-b-0">
      <AccordionTrigger
        class="flex items-center w-full py-2 pr-1 text-base transition duration-75 rounded-lg group text-zinc-400 hover:bg-gray-700"
      >
        <p class="flex-1 ml-3 text-left whitespace-nowrap">
          <v-icon :name="icon"  />
          {{ name }}</p
        ></AccordionTrigger
      >
      <AccordionContent class="pl-4">
        <slot />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/commun/ui/accordion'
defineProps({
  icon: {
    type: String
  },
  name: {
    type: String
  }
})
</script>
