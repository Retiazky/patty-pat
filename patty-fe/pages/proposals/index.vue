<template>
  <div>
    <div v-if="proposals.length" class="flex flex-col gap-10 items-center">
      <voting-card
        v-for="proposal in proposals"
        :key="proposal.id"
        :proposal="proposal"
      />
    </div>
    <div v-else class="flex flex-col gap-10 items-center">
      <img src="/img/404_proposals.png" alt="404 proposals" />
    </div>
    <span
      class="fixed rounded-full bottom-8 right-4 border cursor-pointer p-2 shadow-md hover:bg-accent/80"
      @click="$router.push('/proposals/create')"
    >
      <icon name="mdi:plus" size="48" />
    </span>
  </div>
</template>
<script setup lang="ts">
import type { Proposal } from '~/types';

const proposals = ref<Proposal[]>([]);

onMounted(async () => {
  const data: Proposal[] = await $fetch('/api/proposal/');
  proposals.value = data;
});
</script>
