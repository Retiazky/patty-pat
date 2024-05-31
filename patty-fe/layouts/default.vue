<template>
  <div class="min-h-screen w-full flex flex-col">
    <page-header />
    <main class="h-full flex-1">
      <slot />
    </main>
    <page-footer />
  </div>
</template>

<script lang="ts" setup>
import PageFooter from "@/components/layout/PageFooter.vue";
import PageHeader from "@/components/layout/PageHeader.vue";
</script>

<style></style>
