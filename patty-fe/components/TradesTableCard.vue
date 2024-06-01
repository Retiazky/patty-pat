<template>
  <s-card>
    <s-card-header>
      <s-card-title>{{ profileView ? 'My ' : '' }}Trades</s-card-title>
    </s-card-header>
    <s-card-content>
      <s-table>
        <s-table-header>
          <s-table-row class="hover:bg-transparent">
            <s-table-head v-if="!profileView" class="w-[100px]">
              Account
            </s-table-head>
            <s-table-head>Type</s-table-head>
            <s-table-head>ETH</s-table-head>
            <s-table-head>
              {{ profileView ? 'Token' : transfers[0]?.tokenSymbol }}
            </s-table-head>
            <s-table-head> Date </s-table-head>
            <s-table-head class="w-[100px]"> Transaction </s-table-head>
          </s-table-row>
        </s-table-header>
        <s-table-body>
          <s-table-row
            v-for="transfer in transfers"
            :key="transfer.id"
            class="hover:bg-accent/60"
          >
            <s-table-cell v-if="!profileView" class="truncate-cell"
              ><span
                class="truncate hover:underline cursor-pointer"
                @click="openAddressUrl(transfer.account)"
              >
                {{ transfer.account }}
              </span></s-table-cell
            >
            <s-table-cell :class="getTypeTextColor(transfer.type)">{{
              transfer.type
            }}</s-table-cell>
            <s-table-cell>{{ transfer.eth }}</s-table-cell>
            <s-table-cell
              >{{ transfer.token }}
              {{ profileView && transfer.tokenSymbol }}</s-table-cell
            >
            <s-table-cell>{{ transfer.date }}</s-table-cell>
            <s-table-cell class="truncate-cell"
              ><span
                class="truncate hover:underline cursor-pointer"
                @click="openTransactionUrl(transfer.transaction)"
              >
                {{ transfer.transaction }}
              </span></s-table-cell
            >
          </s-table-row>
        </s-table-body>
      </s-table>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import type { Transfer } from '~/types';

defineProps<{
  transfers: Transfer[];
  profileView?: boolean;
}>();

const getTypeTextColor = (type: string) => {
  if (type === 'buy') return 'text-green-500';
  if (type === 'sell') return 'text-red-500';
};

const openAddressUrl = (address: string) => {
  window.open(`https://sepolia.lineascan.build/address/${address}`, '_blank');
};

const openTransactionUrl = (transaction: string) => {
  window.open(`https://sepolia.lineascan.build/tx/${transaction}`, '_blank');
};
</script>
<style scoped>
.truncate-cell {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
