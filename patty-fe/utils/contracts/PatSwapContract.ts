import { abi } from "@/utils/abi/PatSwap";
import type { Address } from "viem";

export const patSwapContract = {
  address: "0xa747cf70899c9b2c31df8ffcebd3d28fd65c99af" as Address,
  abi,
} as const;
