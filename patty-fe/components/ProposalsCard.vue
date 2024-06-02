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
            <s-table-head>Votes For</s-table-head>
            <s-table-head>Votes Against</s-table-head>
            <s-table-head>Votes Abstain</s-table-head>
            <s-table-head>Execute</s-table-head>
          </s-table-row>
        </s-table-header>
        <s-table-body>
          <s-table-row
            v-for="proposal in proposals"
            :key="proposal.id"
            class="hover:bg-accent/60"
          >
            <s-table-cell>{{ proposal.title }}</s-table-cell>
            <s-table-cell>{{
              formatDate(proposal.endingDateTime)
            }}</s-table-cell>
            <s-table-cell>{{ proposal.votes.for }}</s-table-cell>
            <s-table-cell>{{ proposal.votes.against }}</s-table-cell>
            <s-table-cell>{{ proposal.votes.abstain }}</s-table-cell>
            <s-table-cell>
              <p v-if="proposal.executed">Executed</p>
              <s-button
                v-else-if="!canExecute(proposal)"
                disabled
                variant="success"
              >
                Execute
              </s-button>
              <p v-else-if="!isAccepted(proposal)">Not accepted</p>
              <p v-else-if="!enoughVotes(proposal)">Not enough votes</p>
              <s-button
                v-else
                variant="success"
                @click="executeProposal(proposal)"
              >
                Execute
              </s-button>
            </s-table-cell>
          </s-table-row>
        </s-table-body>
      </s-table>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import { useWriteContract } from "@wagmi/vue";
import { keccak256, toHex } from "viem";
import { config } from "~/plugins/1.wagmi";
import type { Proposal } from "~/types";
import { patGovernorContract } from "~/utils/contracts/PatGovernorContract";
import { formatDate } from "~/utils/helpers/date";

defineProps<{
  proposals: Proposal[];
}>();

const enoughVotes = (proposal: Proposal) => {
  return proposal.votes.for > proposal.totalSupply / 100;
};

const isAccepted = (proposal: Proposal) => {
  return proposal.votes.for > proposal.votes.against;
};

const canExecute = (proposal: Proposal) => {
  const date = new Date(proposal.endingDateTime);
  return date.getTime() < Date.now();
};

const { writeContractAsync } = useWriteContract({ config });

const executeProposal = async (proposal: Proposal) => {
  const hashedDescription = keccak256(toHex(proposal.description));
  writeContractAsync({
    ...patGovernorContract,
    functionName: "execute",
    args: [
      proposal.targets,
      proposal.values.map(BigInt),
      proposal.calldatas as `0x${string}`[],
      hashedDescription,
    ],
  });
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
