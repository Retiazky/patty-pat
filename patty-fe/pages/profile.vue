<template>
  <div class="flex flex-col items-center w-full justify-center">
    <div class="flex flex-col gap-y-10">
      <!-- Profile img & address -->
      <div class="flex gap-10 items-center">
        <img
          src="https://avatars.githubusercontent.com/u/56182241?v=4"
          alt="Profile Picture"
          class="rounded-full w-48 h-48"
        />
        <span>{{ address }}</span>
      </div>
      <trades-table-card :transfers="transfers" :profile-view="true" />
      <tokens-card :tokens="tokens" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAccount } from '@wagmi/vue';
import type { Token, Transfer } from '~/types';
const { address } = useAccount();

const transfers = ref<Transfer[]>([]);
const tokens = ref<Token[]>([]);

onMounted(async () => {
  if (!address.value) return;
  const params = new URLSearchParams();
  params.append('address', address.value);
  const trans: Transfer[] = await $fetch('/api/transfer?' + params.toString());
  transfers.value = trans;

  const toks: Token[] = await $fetch('/api/token?' + params.toString());
  tokens.value = toks;
});
</script>

<style></style>
