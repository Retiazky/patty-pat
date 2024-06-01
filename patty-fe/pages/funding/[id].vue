<template>
  <div class="flex flex-col gap-10">
    <trading-card :name="funding?.name" :symbol="funding?.symbol" />
    <trades-table-card :transfers="transfers" />
  </div>
</template>
<script setup lang="ts">
import type { Funding, Transfer } from "~/types";
const { params } = useRoute();

const funding = ref<Funding | null>(null);
const transfers = ref<Transfer[]>([]);

onMounted(async () => {
  const fun: Funding = await $fetch("/api/funding/" + params.id);
  funding.value = fun;

  const trans: Transfer[] = await $fetch("/api/transfer/" + fun.id);
  transfers.value = trans;
});
</script>
