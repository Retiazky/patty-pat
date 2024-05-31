<template>
  <div>
    <div class="flex flex-col gap-10 items-center">
      <voting-card v-for="proposal in proposals" :proposal="proposal" />
    </div>
    <span
      class="rounded-full absolute bottom-8 right-4 border cursor-pointer p-2 bg-white shadow-md hover:bg-accent/80"
      @click="$router.push('/proposals/create')"
    >
      <icon name="mdi:plus" size="48" />
    </span>
  </div>
</template>
<script setup lang="ts">
import type { Proposal } from '~/types';

const proposals: Proposal[] = [
  {
    title: 'Proposal 1',
    description: 'Description 1',
    minAmount: 100,
    imageSrc: 'img/prop_cat.png',
    votes: 0,
    endingDateTime: '2024-08-31 12:00',
  },
  {
    title: 'Proposal 2',
    description: 'Description 2',
    minAmount: 200,
    imageSrc: 'img/prop_dino.png',
    votes: 0,
    endingDateTime: '2024-08-31 13:00',
  },
];
</script>
