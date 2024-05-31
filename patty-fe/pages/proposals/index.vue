<template>
  <div>
    <div class="flex flex-col gap-10 items-center">
      <voting-card v-for="proposal in proposals" :proposal="proposal" />
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
import { useProposalService } from '~/server/services';

const service = useProposalService();
const proposals: Proposal[] = service.getProposals();
</script>
