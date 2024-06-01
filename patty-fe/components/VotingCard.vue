<template>
  <s-card class="w-1/2 border-2 rounded-lg">
    <s-card-header>
      <s-card-title>{{ proposal.title }}</s-card-title>
      <s-card-description>
        Voting until: {{ fullDateFormat }}
      </s-card-description>
    </s-card-header>
    <s-card-content>
      <p>{{ proposal.description }}</p>
      <p>Symbol: {{ proposal.symbol }}</p>
      <div class="flex justify-center items-center">
        <img v-if="imgSrc" class="w-1/2 h-1/2 rounded-lg" :src="imgSrc" />
      </div>
    </s-card-content>
    <s-card-footer v-if="!isAfterDeadline" class="flex gap-2">
      <s-button
        class="flex-1 border-2"
        variant="success"
        :disabled="!isConnected"
        @click="voteForCategory(Vote.For)"
      >
        For ({{ props.proposal.votes.for }})
      </s-button>
      <s-button
        class="flex-1 border-2"
        variant="destructive"
        :disabled="!isConnected"
        @click="voteForCategory(Vote.Against)"
      >
        Against ({{ props.proposal.votes.against }})
      </s-button>
      <s-button
        class="flex-1 border-2"
        variant="ghost"
        :disabled="!isConnected"
        @click="voteForCategory(Vote.Abstain)"
      >
        Abstain ({{ props.proposal.votes.abstain }})
      </s-button>
    </s-card-footer>
    <s-card-footer v-else>
      <s-button class="flex-1 border-2" variant="success" disabled>
        Voting has ended
      </s-button>
    </s-card-footer>
  </s-card>
</template>
<script setup lang="ts">
import { useAccount, useWriteContract } from "@wagmi/vue";
import { config } from "~/plugins/1.wagmi";
import type { Proposal } from "~/types";
import { patGovernorContract } from "~/utils/contracts/PatGovernorContract";
import { formatDate } from "~/utils/helpers/date";
const props = defineProps<{
  proposal: Proposal;
}>();

const { isConnected } = useAccount();

enum Vote {
  Against,
  For,
  Abstain,
}

const { writeContractAsync } = useWriteContract({ config });

/**
 * Voting info
 * @param id Voting ID
 * @param vote 0 - against, 1 - for, 2 - abstain
 */
const voteForCategory = async (vote: Vote) => {
  await writeContractAsync({
    ...patGovernorContract,
    functionName: "castVote",
    args: [BigInt(props.proposal.id), vote],
  });
};

const fullDateFormat = computed(() =>
  formatDate(props.proposal.endingDateTime)
);

const isAfterDeadline = computed(() => {
  return Date.now() > props.proposal.endingDateTime;
});

const imgSrc = ref<string | null>(null);

onMounted(async () => {
  const metaRaw = await $fetch<string>(props.proposal.meta);
  const meta: { image: string } = JSON.parse(metaRaw);
  imgSrc.value = meta.image;
});
</script>
