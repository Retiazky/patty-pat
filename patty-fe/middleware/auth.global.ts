import { useAccount } from "@wagmi/vue";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isConnected, isConnecting, isReconnecting } = useAccount();
  while (isConnecting.value || isReconnecting.value) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (to.path != "/" && !isConnected.value) {
    return navigateTo("/");
  }

  if (to.path == "/" && isConnected.value) {
    return navigateTo("/home");
  }

  return;
});
