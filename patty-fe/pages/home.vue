<template>
  <div>
    <div class="flex flex-col gap-10 items-center">
      <funding-card v-for="funding in fundings" :funding="funding" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Funding } from '~/types';

const fundings = ref<Funding[]>([]);

onMounted(async () => {
  const data: Funding[] = await $fetch('/api/funding/');
  fundings.value = data;
});
</script>
