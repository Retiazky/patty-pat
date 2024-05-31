<template>
  <div class="w-full flex justify-evenly p-2">
    <nuxt-link
      v-for="link in NAVIGATION"
      :key="link.to"
      :to="link.to"
      class="text-xl font-thin"
      active-class="underline"
    >
      {{ link.label }}
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
interface NavigationLink {
  to: string;
  label: string;
}

const NAVIGATION: NavigationLink[] = [
  { to: "/home", label: "Home" },
  { to: "/proposals", label: "Proposals" },
  { to: "/profile", label: "Profile" },
];
</script>

<style></style>
