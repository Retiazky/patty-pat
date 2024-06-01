<template>
  <s-card>
    <s-card-header>
      <s-card-title>My Proposals</s-card-title>
    </s-card-header>
    <s-card-content>
      <s-table>
        <s-table-header>
          <s-table-row class="hover:bg-transparent">
            <s-table-head> Title </s-table-head>
            <s-table-head>Ending Date</s-table-head>
            <s-table-head>Min Amount</s-table-head>
            <s-table-head>Votes For</s-table-head>
            <s-table-head>Votes Against</s-table-head>
            <s-table-head>Votes Abstain</s-table-head>
          </s-table-row>
        </s-table-header>
        <s-table-body>
          <s-table-row
            v-for="proposal in proposals"
            :key="proposal.id"
            class="hover:bg-accent/60"
          >
            <s-table-cell>{{ proposal.title }}</s-table-cell>
            <s-table-cell>{{ proposal.endingDateTime }}</s-table-cell>
            <s-table-cell class="text-center">{{
              proposal.minAmount
            }}</s-table-cell>
            <s-table-cell class="text-center">{{
              proposal.votes.votesFor
            }}</s-table-cell>
            <s-table-cell class="text-center">{{
              proposal.votes.votesAgainst
            }}</s-table-cell>
            <s-table-cell class="text-center">{{
              proposal.votes.votesAbstain
            }}</s-table-cell>
          </s-table-row>
        </s-table-body>
      </s-table>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import type { Proposal } from '~/types';

defineProps<{
  proposals: Proposal[];
}>();
</script>
<style scoped>
.truncate-cell {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
