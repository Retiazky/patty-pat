<template>
  <div>
    <span
      class="rounded-full absolute bottom-8 right-4 border cursor-pointer p-2 bg-white shadow-md hover:bg-accent/80"
      @click="$router.push('/proposals/create')"
    >
      <icon name="mdi:plus" size="48" />
    </span>
  </div>
</template>
