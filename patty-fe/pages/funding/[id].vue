<template>
  <div class="flex flex-col gap-10">
    <trading-card
      :address="address"
      :name="funding?.name"
      :symbol="funding?.symbol"
    />
    <trades-table-card :transfers="transfers" />
  </div>
</template>
<script setup lang="ts">
import type { Funding, Transfer } from "~/types";
const route = useRoute();

const funding = ref<Funding | null>(null);
const transfers = ref<Transfer[]>([]);

const address = computed(() => route.params.id as string);

onMounted(async () => {
  if (!route.params.id) return;
  const id = route.params.id;
  const fun: Funding = await $fetch("/api/funding/" + id);
  funding.value = fun;

  const trans: Transfer[] = await $fetch("/api/transfer/" + id);
  transfers.value = trans;
});
</script>
