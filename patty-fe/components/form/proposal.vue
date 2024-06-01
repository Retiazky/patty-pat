<template>
  <s-card>
    <s-card-header>
      <s-card-title>Create proposal</s-card-title>
      <s-card-description>
        Create proposal, where you can create new token for your pet to help
        him.
      </s-card-description>
    </s-card-header>
    <s-card-content>
      <form @submit="onSubmit">
        <s-form-field v-slot="{ componentField }" name="tokenName">
          <s-form-item>
            <s-form-label>Token Name</s-form-label>
            <s-form-control>
              <s-input v-bind="componentField" />
            </s-form-control>
            <s-form-description>
              The name of your proposal.
            </s-form-description>
            <s-form-message />
          </s-form-item>
        </s-form-field>
        <s-form-field v-slot="{ componentField }" name="description">
          <s-form-item>
            <s-form-label>Description</s-form-label>
            <s-form-control>
              <s-textarea v-bind="componentField" />
            </s-form-control>
            <s-form-description>
              The description of your proposal.
            </s-form-description>
            <s-form-message />
          </s-form-item>
        </s-form-field>

        <s-form-field v-slot="{ componentField }" name="symbol">
          <s-form-item>
            <s-form-label>Token Symbol</s-form-label>
            <s-form-control>
              <s-input v-bind="componentField" type="string" />
            </s-form-control>
            <s-form-description> The symbol of your token. </s-form-description>
            <s-form-message />
          </s-form-item>
        </s-form-field>

        <s-form-field v-slot="{ componentField }" name="feeRecipient">
          <s-form-item>
            <s-form-label>Fee Recipient</s-form-label>
            <s-form-control>
              <s-input v-bind="componentField" type="string" />
            </s-form-control>
            <s-form-description> The recipient address </s-form-description>
            <s-form-message />
          </s-form-item>
        </s-form-field>

        <s-form-field v-slot="{ componentField }" name="supply">
          <s-form-item>
            <s-form-label>Supply</s-form-label>
            <s-form-control>
              <s-input v-bind="componentField" type="string" />
            </s-form-control>
            <s-form-description>
              The supply of your proposal.
            </s-form-description>
            <s-form-message />
          </s-form-item>
        </s-form-field>

        <!-- <s-form-field v-slot="{ componentField }" name="image">
          <s-form-item>
            <s-form-label>Image</s-form-label>
            <s-form-control>
              <input
                class="w-full border border-gray-300 rounded-md p-2"
                type="file"
                accept="image/*"
                v-bind="componentField"
              />
            </s-form-control>
            <s-form-description>
              The image of your proposal.
            </s-form-description>
            <s-form-message />
          </s-form-item>
        </s-form-field> -->
        <s-button class="w-full mt-2" type="submit">Submit</s-button>
      </form>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';
import { useLogger } from '~/composables/logger';
import { config } from '~/plugins/wagmi';
import { patDAOContract } from '~/utils/contracts/PatDAOContract';

const { logger } = useLogger();

const proposalSchema = toTypedSchema(
  z.object({
    tokenName: z.string().min(1, 'Token name is required'),
    symbol: z.string().min(1, 'Symbol is required'),
    feeRecipient: z.string().min(1, 'Address is required'),
    supply: z.number().int().positive('Supply must be positive'),
    description: z.string().min(1, 'Description is required'),
  })
);

const { handleSubmit } = useForm({
  validationSchema: proposalSchema,
  initialValues: {
    tokenName: '',
    symbol: '',
    feeRecipient: '',
    supply: 0,
    description: '',
  },
});

const { writeContractAsync } = useWriteContract({ config });

const onSubmit = handleSubmit(async (values) => {
  console.log('Form submitted!', values);
  const fd = new FormData();
  // const imageUrl = await $fetch("/api/proposal/image", {
  //   method: "POST",
  //   body: fd,
  // });

  const newId = BigInt(`0x${crypto.randomUUID().split('-').join('')}`);
  const _tokenName = values.tokenName;
  const _description = values.description;
  const _symbol = values.symbol;
  const _feeRecipient = values.feeRecipient;
  const _supply = values.supply;

  await writeContractAsync({
    ...patDAOContract,
    functionName: 'createProposal',
    args: [newId, _tokenName, _description, _symbol, _feeRecipient, _supply],
  });
});
</script>

<style></style>
