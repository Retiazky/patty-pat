import { createConfig, http, WagmiPlugin } from "@wagmi/vue";
import { baseSepolia } from "@wagmi/vue/chains";
import { injected } from "@wagmi/vue/connectors";

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [injected()],
  transports: {
    [baseSepolia.id]: http(),
  },
});
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(WagmiPlugin, { config });
});
