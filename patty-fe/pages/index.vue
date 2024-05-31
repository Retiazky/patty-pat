<template>
  <div class="w-full h-screen">
    <transition name="fade">
      <div v-if="showContent" class="flex flex-col items-center gap-2">
        <img
          class="h-[60vh] w-screen"
          src="/img/landing.svg"
          alt="Landing background"
        />
        <s-title class="z-20 text-6xl text-black font-bold mb-2">
          A New Dawn for Animal Welfare
        </s-title>
        <s-subtitle class="z-20 text-2xl text-black text-center mb-5">
          Support injured animals by trading custom tokens. <br />
          Join our Ethereum-based DAO and transform lives with your
          contribution. </s-subtitle
        ><s-button
          class="z-20 w-1/3 h-20 text-4xl rounded-xl text-white"
          variant="secondary"
          @click="goToHome"
          >PATTY PAT!</s-button
        >
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: false,
});

const showContent = ref(true);

const goToHome = () => {
  showContent.value = false;
  setTimeout(() => {
    useRouter().push('/home');
  }, 500);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
