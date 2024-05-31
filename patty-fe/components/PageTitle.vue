<template>
    <div>
        <h1 class="flex justify-center text-3xl text-secondary p-10">
            {{ title }}
        </h1>
    </div>
</template>

<script lang="ts" setup>
withDefaults(
    defineProps<{
        title: string;
    }>(),
    {
        title: "Hello World",
    },
);
</script>

<style></style>
