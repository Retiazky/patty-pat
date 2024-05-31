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
import { useFundingService } from '~/server/services';

const service = useFundingService();
const { params } = useRoute();
const funding = service.getFundingById(params.id as string);
</script>
