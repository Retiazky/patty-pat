<template>
  <s-dialog>
    <s-dialog-trigger as-child>
      <s-button variant="outline"> Swap tokens </s-button>
    </s-dialog-trigger>
    <s-dialog-content class="sm:max-w-[425px]">
      <s-dialog-header>
        <s-dialog-title>Swap tokens</s-dialog-title>
        <s-dialog-description>
          Swap your tokens for governance tokens
        </s-dialog-description>
      </s-dialog-header>
      <form @submit="onSubmit">
        <s-form-field v-slot="{ componentField }" name="token">
          <s-form-label> Token </s-form-label>
          <s-form-control>
            <s-select v-bind="componentField">
              <s-select-trigger>
                <s-select-value placeholder="Select a token" />
              </s-select-trigger>
              <s-select-content>
                <s-select-group>
                  <s-select-item
                    v-for="token in tokens"
                    :key="token.id"
                    :value="token.symbol"
                  >
                    {{ token.symbol }}
                  </s-select-item>
                </s-select-group>
              </s-select-content>
            </s-select>
          </s-form-control>
          <s-form-description> The token you want to swap. </s-form-description>
          <s-form-message />
        </s-form-field>
        <s-form-field v-slot="{ componentField }" name="amount">
          <s-form-label> Amount </s-form-label>
          <s-form-control>
            <s-input v-bind="componentField" type="number" />
          </s-form-control>
          <s-form-description>
            The amount you want to swap.
          </s-form-description>
          <s-form-message />
        </s-form-field>
        <s-form-field name="gained">
          <s-form-label> Gained </s-form-label>
          <s-form-control>
            <s-input v-model="gainedTokens" readonly />
          </s-form-control>
          <s-form-description> The amount you will gain. </s-form-description>
          <s-form-message />
        </s-form-field>
        <s-button class="w-full" type="submit"> Swap </s-button>
      </form>
    </s-dialog-content>
  </s-dialog>
</template>
<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import type { Token } from "~/types";

defineProps<{
  tokens: Token[];
}>();

const swapSchema = toTypedSchema(
  z.object({
    amount: z.number().positive(),
    token: z.string(),
  })
);

const { handleSubmit, values } = useForm({
  validationSchema: swapSchema,
  initialValues: {
    amount: 0,
    token: "",
  },
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

const gainedTokens = computed(() => {
  return (values.amount ?? 0) * 0.1;
});
</script>

<style></style>
