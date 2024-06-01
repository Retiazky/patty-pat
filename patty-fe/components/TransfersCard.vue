<template>
  <s-card>
    <s-card-header>
      <s-card-title>Transfers</s-card-title>
    </s-card-header>
    <s-card-content>
      <s-table>
        <s-table-header>
          <s-table-row>
            <s-table-head class="w-[100px]"> Account </s-table-head>
            <s-table-head>Type</s-table-head>
            <s-table-head>ETH</s-table-head>
            <s-table-head class="text-right"> {{ tokenName }} </s-table-head>
            <s-table-head class="text-right"> Date </s-table-head>
            <s-table-head class="text-right"> Transaction </s-table-head>
          </s-table-row>
        </s-table-header>
        <s-table-body>
          <s-table-row v-for="transfer in transfers" :key="transfer.id">
            <s-table-cell>{{ transfer.account }}</s-table-cell>
            <s-table-cell>{{ transfer.type }}</s-table-cell>
            <s-table-cell>{{ transfer.eth }}</s-table-cell>
            <s-table-cell class="text-right">{{ transfer.token }}</s-table-cell>
            <s-table-cell class="text-right">{{ transfer.date }}</s-table-cell>
            <s-table-cell class="text-right">{{
              transfer.transaction
            }}</s-table-cell>
          </s-table-row>
        </s-table-body>
      </s-table>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import type { Transfer } from '~/types';

defineProps<{
  tokenName: string | undefined;
}>();

const { params } = useRoute();
const fundingId = params.id as string;
const transfers = ref<Transfer[]>([]);

onMounted(async () => {
  const data: Transfer[] = await $fetch('/api/transfer/' + fundingId);
  transfers.value = data;
});
</script>
