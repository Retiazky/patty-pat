<template>
  <s-card class="w-1/2 border-2 rounded-lg">
    <s-card-header>
      <s-card-title>{{ funding.title }}</s-card-title>
    </s-card-header>
    <s-card-content>
      <p>{{ funding.description }}</p>
      <div class="flex justify-center items-center">
        <img class="w-1/2 h-1/2 rounded-lg" :src="funding.imageSrc" />
      </div>
    </s-card-content>
    <s-card-footer class="flex">
      <s-button
        class="flex-1 border-2"
        variant="success"
        @click="$router.push(`/funding/${funding.id}`)"
        >Support</s-button
      >
    </s-card-footer>
  </s-card>
</template>
<script setup lang="ts">
import type { Funding } from '~/types';
defineProps<{
  funding: Funding;
}>();
</script>
