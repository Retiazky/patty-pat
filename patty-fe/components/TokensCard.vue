<template>
  <s-card>
    <s-card-header class="flex flex-row justify-between items-center">
      <s-card-title>My Tokens</s-card-title>
      <modal-governance-swap
        v-if="filteredTokens.length > 0"
        :tokens="filteredTokens"
      />
    </s-card-header>
    <s-card-content>
      <div class="grid grid-cols-4 gap-y-10">
        <div
          v-for="token in tokens"
          :key="token.id"
          class="flex flex-col items-center"
        >
          <token-image :token="token" />
          <span>{{ token.amount }} {{ token.symbol }}</span>
        </div>
      </div>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import type { Token } from "~/types";
const props = defineProps<{
  tokens: Token[];
}>();

const filteredTokens = computed(() =>
  props.tokens.filter((t) => t.symbol !== "PAT")
);
</script>
