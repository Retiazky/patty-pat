<template>
    <div>
        <h1
            class="flex items-center text-2xl text-foreground/70 pl-10 pt-10 pb-2"
        >
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
