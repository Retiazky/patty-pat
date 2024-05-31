<template>
  <header class="w-full bg-accent grid grid-cols-3 items-center px-2 shadow-md">
    <h1 class="text-xl font-thin px-8">PattyPat</h1>
    <page-navigation />
    <span class="flex justify-end items-center gap">
      <client-only>
        <s-button
          variant="link"
          class="text-foreground"
          @click="toggleColorMode"
        >
          <icon
            v-if="colorMode.preference === 'light'"
            height="24"
            class="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            icon="radix-icons:moon"
          />
          <icon
            v-else
            icon="radix-icons:sun"
            height="24"
            class="rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
        </s-button>
        <connect-button class="w-1/3" />
      </client-only>
    </span>
  </header>
</template>

<script lang="ts" setup>
import PageNavigation from '@/components/layout/PageNavigation.vue';
import { Icon } from '@iconify/vue';

const colorMode = useColorMode();
colorMode.preference = 'light';
const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light';
};
</script>

<style></style>
