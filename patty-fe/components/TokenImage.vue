<template>
  <div>
    <img
      v-if="imgSrc"
      :src="imgSrc"
      class="w-24 h-24 border-2 border-accent rounded"
    />
    <p v-if="description" class="text-center">{{ description }}</p>
  </div>
</template>

<script lang="ts" setup>
import type { Token } from "~/types";
const props = defineProps<{
  token: Token;
}>();

const description = ref<string | null>(null);

const imgSrc = ref<string | null>(null);

onMounted(async () => {
  if (!props.token.meta) return;
  const rawMeta = await $fetch<string>(props.token.meta);
  const meta = JSON.parse(rawMeta) as { image?: string; description?: string };
  description.value = meta.description ?? null;
  imgSrc.value = meta.image ?? null;
});
</script>
