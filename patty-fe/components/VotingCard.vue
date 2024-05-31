<template>
  <s-card class="w-1/2 border-2 rounded-lg">
    <s-card-header>
      <s-card-title>{{ proposal.title }}</s-card-title>
      <s-card-description>
        Voting until: {{ proposal.endingDateTime }}
      </s-card-description>
    </s-card-header>
    <s-card-content>
      <p>{{ proposal.description }}</p>
      <p>Minimal amount: {{ proposal.minAmount }} $</p>
      <div class="flex justify-center items-center">
        <img class="w-1/2 h-1/2 rounded-lg" :src="proposal.imageSrc" />
      </div>
    </s-card-content>
    <s-card-footer class="flex gap-2">
      <s-button class="flex-1 border-2" variant="success">For</s-button>
      <s-button class="flex-1 border-2" variant="destructive">Against</s-button>
      <s-button class="flex-1 border-2" variant="ghost">Abstain</s-button>
    </s-card-footer>
  </s-card>
</template>
<script setup lang="ts">
import type { Proposal } from '~/types';
defineProps<{
  proposal: Proposal;
}>();
</script>
