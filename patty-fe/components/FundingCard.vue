<template>
  <s-card class="w-1/2 border-2 rounded-lg">
    <s-card-header>
      <s-card-title>{{ funding.title }}</s-card-title>
    </s-card-header>
    <s-card-content>
      <p class="mb-2">{{ description }}</p>
      <div class="flex justify-center items-center">
        <img v-if="imgSrc" class="w-1/2 h-1/2 rounded-lg" :src="imgSrc" />
      </div>
    </s-card-content>
    <s-card-footer class="flex">
      <s-button
        class="flex-1 border-2"
        variant="success"
        @click="$router.push(`/funding/${funding.id}`)"
        >Support</s-button
      >
    </s-card-footer>
  </s-card>
</template>
<script setup lang="ts">
import { $purifyOne } from "@kodadot1/minipfs";
import type { Funding } from "~/types";
const props = defineProps<{
  funding: Funding;
}>();

const imgSrc = ref<string | null>(null);
const description = ref<string | null>(null);

onMounted(async () => {
  if (props.funding.imageSrc.startsWith("ipfs://")) {
    const path = $purifyOne(props.funding.imageSrc, "nftstorage");
    const meta = await $fetch<{ image: string; description: string }>(path);
    const pureImage = $purifyOne(meta.image, "dweb");
    imgSrc.value = pureImage;
    description.value = meta.description;
  } else if (props.funding.imageSrc.startsWith("http")) {
    console.log("Img src:", props.funding);
    const rawMeta = await $fetch<string>(props.funding.imageSrc);
    console.log(rawMeta);
    const meta = JSON.parse(rawMeta);
    imgSrc.value = meta.image;
    description.value = meta.description;
  }
});
</script>
