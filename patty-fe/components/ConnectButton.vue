<template>
  <s-dialog v-if="!isConnected">
    <s-dialog-trigger as-child>
      <s-button class="border h-10 rounded-xl m-2">
        Connect your wallet
      </s-button>
    </s-dialog-trigger>
    <s-dialog-content class="sm:max-w-[1200px]">
      <s-dialog-header>
        <s-dialog-title>Select your profile</s-dialog-title>
      </s-dialog-header>
      <div class="flex flex-col w-full p-2">
        <s-button
          v-for="connector in displayedConnectors"
          :key="connector.id"
          class="mb-2"
          @click="connectWallet(connector)"
        >
          {{ connector.name }}
        </s-button>
      </div>
    </s-dialog-content>
  </s-dialog>

  <s-button v-else class="border h-10 rounded-xl m-2" @click="disconnectWallet">
    Disconnect
  </s-button>
</template>

<script lang="ts" setup>
import type { Connector } from "@wagmi/vue";
import { useAccount, useConnect, useDisconnect } from "@wagmi/vue";

const { isConnected } = useAccount();

const { disconnect } = useDisconnect();
const { connect, connectors } = useConnect();

const disconnectWallet = () => {
  disconnect();
  useRouter().push("/");
};

const connectWallet = (connector: Connector) => {
  connect({ connector });
  useRouter().push("/home");
};

const displayedConnectors = computed(() => {
  return connectors.filter((connector) => connector.id !== "injected");
});
</script>

<style></style>
