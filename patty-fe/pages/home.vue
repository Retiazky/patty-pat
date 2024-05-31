<template>
  <div>
    <div class="flex flex-col gap-10 items-center">
      <funding-card v-for="funding in fundings" :funding="funding" />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Funding } from '~/types';
import { useFundingService } from '~/server/services';

const service = useFundingService();
const fundings: Funding[] = service.getFundings();
</script>
