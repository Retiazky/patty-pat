<template>
  <s-card>
    <s-card-header>
      <s-card-title>{{ name }}</s-card-title>
    </s-card-header>
    <s-card-content>
      <div class="flex justify-between">
        <div class="flex-1">
          <chart-candle :data="data" :chart-options="chartOptions" />
        </div>
        <div class="w-80 flex flex-col ml-4">
          <form class="flex w-full flex-col items-center" @submit="onSubmit">
            <s-form-field v-slot="{ componentField }" name="amount">
              <s-form-item class="w-full">
                <s-form-label>Amount</s-form-label>
                <s-form-control>
                  <s-input
                    type="number"
                    step="0.0001"
                    v-bind="componentField"
                  />
                </s-form-control>
                <s-form-description> ETH </s-form-description>
                <s-form-message />
              </s-form-item>
            </s-form-field>
            <span
              class="text-gray-500 transition-transform duration-300 cursor-pointer border rounded-full h-12 w-12 flex justify-center items-center"
              :class="{
                'rotate-180': direction === 'up',
              }"
            >
              <icon
                name="mdi:arrow-down"
                size="24"
                @click="direction = direction === 'down' ? 'up' : 'down'"
              />
            </span>
            <s-form-field v-slot="{ componentField }" name="price">
              <s-form-item class="w-full">
                <s-form-label>Price</s-form-label>
                <s-form-control>
                  <s-input v-bind="componentField" readonly />
                </s-form-control>
                <s-form-description>{{ symbol }}</s-form-description>
                <s-form-message />
              </s-form-item>
            </s-form-field>
            <s-button
              class="w-full mt-2"
              type="submit"
              :variant="direction === 'down' ? 'default' : 'secondary'"
            >
              {{ direction === "down" ? "Buy" : "Sell" }}
            </s-button>
          </form>
        </div>
      </div>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useWriteContract } from "@wagmi/vue";
import {
  LineStyle,
  PriceScaleMode,
  type CandlestickData,
  type ChartOptions,
  type Time,
} from "lightweight-charts";
import { useForm } from "vee-validate";
import { parseEther, type Address } from "viem";
import * as z from "zod";
import { config } from "~/plugins/1.wagmi";
import { patSwapContract } from "~/utils/contracts/PatSwapContract";

const props = defineProps<{
  name: string | undefined;
  symbol: string | undefined;
  address: string | undefined;
}>();

const direction = ref("down");

const tradeSchema = toTypedSchema(
  z.object({
    amount: z.number().positive(),
    price: z.number(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: tradeSchema,
  initialValues: {
    amount: 0,
    price: 0,
  },
});

const { writeContractAsync } = useWriteContract({ config });

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
  const _amount = parseEther(String(values.amount));
  const _poolKey = {
    currency0: "0x0000000000000000000000000000000000000000" as Address,
    currency1: props.address as Address,
    fee: 0,
    tickSpacing: 1,
    hooks: "0x0000000000000000000000000000000000000000" as Address,
  };
  const _minPriceLimit = BigInt(4295128739 - 1);
  const _params = {
    zeroForOne: true,
    amountSpecified: _amount * -1n,
    sqrtPriceLimitX96: _minPriceLimit,
  };
  const _settings = { settleUsingBurn: true, takeClaims: true };
  const _hooks = "0x0" as Address;
  console.log(_amount, _poolKey, _params, _settings, _hooks);
  await writeContractAsync({
    ...patSwapContract,
    functionName: "swap",
    value: _amount,
    args: [_poolKey, _params, _settings, _hooks],
  });
});

// Chart Options
const chartOptions: Partial<ChartOptions> = {
  autoSize: true,
  leftPriceScale: {
    visible: true,
    borderVisible: true,
    alignLabels: true,
    autoScale: true,
    borderColor: "#eee",
    entireTextOnly: false,
    invertScale: false,
    minimumWidth: 60,
    mode: PriceScaleMode.Normal,
    scaleMargins: {
      bottom: 0.2,
      top: 0.2,
    },
    ticksVisible: true,
  },
  grid: {
    vertLines: {
      style: LineStyle.Solid,
      color: "#eee",
      visible: true,
    },
    horzLines: {
      style: LineStyle.Solid,
      color: "#eee",
      visible: true,
    },
  },
};

// Chart DATA

const date = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
let i = 0;

const randomFactor = 25 + Math.random() * 25;
const samplePoint = (i: number) => {
  return (
    i *
      (0.5 +
        Math.sin(i / 10) * 0.2 +
        Math.sin(i / 20) * 0.4 +
        Math.sin(i / randomFactor) * 0.8 +
        Math.sin(i / 500) * 0.5) +
    200
  );
};

function generateSampleData(): CandlestickData[] {
  const res: CandlestickData[] = [];
  const numberOfPoints = 100;
  for (i = 0; i < numberOfPoints; ++i) {
    const time = date.getTime() / 1000;
    const value = samplePoint(i);

    const randomRanges = [-1 * Math.random(), Math.random(), Math.random()].map(
      (i) => i * 10
    );
    const sign = Math.sin(Math.random() - 0.5);
    res.push({
      time: time as Time,
      low: value + randomRanges[0],
      high: value + randomRanges[1],
      open: value + sign * randomRanges[2],
      close: samplePoint(i + 1),
    });

    date.setUTCDate(date.getUTCDate() + 1);
  }

  return res;
}

const data = ref(generateSampleData());

setInterval(() => {
  const time = date.getTime() / 1000;
  const value = samplePoint(i);

  const randomRanges = [-1 * Math.random(), Math.random(), Math.random()].map(
    (i) => i * 10
  );
  const sign = Math.sin(Math.random() - 0.5);
  const _data = data.value;
  _data.push({
    time: time as Time,
    low: value + randomRanges[0],
    high: value + randomRanges[1],
    open: value + sign * randomRanges[2],
    close: samplePoint(i + 1),
  });

  date.setUTCDate(date.getUTCDate() + 1);
  data.value = [..._data];
  i++;
}, 1000);
</script>

<style></style>
