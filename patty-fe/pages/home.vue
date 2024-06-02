<template>
  <div>
    <div
      v-if="fundings.length"
      class="flex flex-col gap-10 items-center justify-center"
    >
      <funding-card
        v-for="funding in fundings"
        :key="funding.id"
        :funding="funding"
      />
    </div>
    <div v-else class="flex flex-col gap-10 items-center">
      <img src="/img/404_fundings.png" alt="404 fundings" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Funding } from '~/types';

const fundings = ref<Funding[]>([]);

onMounted(async () => {
  const data: Funding[] = await $fetch('/api/funding/');
  fundings.value = data.filter((f) => f.symbol !== 'PAT');
});
</script>
