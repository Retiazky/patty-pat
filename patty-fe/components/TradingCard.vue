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
                  <s-input v-bind="componentField" />
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
import {
  LineStyle,
  PriceScaleMode,
  type CandlestickData,
  type ChartOptions,
  type Time,
} from "lightweight-charts";
import { useForm } from "vee-validate";
import * as z from "zod";

defineProps<{
  name: string | undefined;
  symbol: string | undefined;
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

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

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

function generateSampleData(): CandlestickData[] {
  const randomFactor = 25 + Math.random() * 25;
  function samplePoint(i: number) {
    return (
      i *
        (0.5 +
          Math.sin(i / 10) * 0.2 +
          Math.sin(i / 20) * 0.4 +
          Math.sin(i / randomFactor) * 0.8 +
          Math.sin(i / 500) * 0.5) +
      200
    );
  }

  const res: CandlestickData[] = [];
  const date = new Date(Date.UTC(2018, 0, 1, 0, 0, 0, 0));
  const numberOfPoints = 100;
  for (let i = 0; i < numberOfPoints; ++i) {
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
</script>

<style></style>
