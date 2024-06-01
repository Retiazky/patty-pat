<template>
  <s-card>
    <s-card-header>
      <s-card-title>My Tokens</s-card-title>
    </s-card-header>
    <s-card-content>
      <div class="grid grid-cols-4 gap-y-10">
        <div
          v-for="token in tokens"
          :key="token.id"
          class="flex flex-col items-center"
        >
          <img
            :src="token.meta.image"
            class="w-24 h-24 border-2 border-accent rounded"
          />
          <span>{{ token.amount }} {{ token.symbol }}</span>
        </div>
      </div>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import type { Token } from '~/types';
defineProps<{
  tokens: Token[];
}>();
</script>

<style></style>
