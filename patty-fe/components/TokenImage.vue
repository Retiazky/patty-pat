<template>
  <img
    v-if="imgSrc"
    :src="imgSrc"
    class="w-24 h-24 border-2 border-accent rounded"
  />
</template>

<script lang="ts" setup>
import type { Token } from "~/types";
const props = defineProps<{
  token: Token;
}>();

const imgSrc = ref<string | null>(null);

onMounted(async () => {
  if (!props.token.meta) return;
  const rawMeta = await $fetch<string>(props.token.meta);
  const meta = JSON.parse(rawMeta) as { image: string };
  imgSrc.value = meta.image;
});
</script>
