<template>
  <div class="flex flex-col gap-10">
    <trading-card
      :tokenName="funding?.tokenName"
      :tokenSymbol="funding?.tokenSymbol"
    />
    <transfers-card :tokenName="funding?.tokenName" />
  </div>
</template>
<script setup lang="ts">
import type { Funding } from '~/types';
const { params } = useRoute();

const funding = ref<Funding | null>(null);

onMounted(async () => {
  const data: Funding = await $fetch('/api/funding/' + params.id);
  funding.value = data;
});
</script>
