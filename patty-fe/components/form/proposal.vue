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
        <s-form-field v-slot="{ componentField }" name="title">
          <s-form-item>
            <s-form-label>Title</s-form-label>
            <s-form-control>
              <s-input v-bind="componentField" />
            </s-form-control>
            <s-form-description>
              The title of your proposal.
            </s-form-description>
            <s-form-message />
          </s-form-item>
        </s-form-field>
        <s-form-field v-slot="{ componentField }" name="symbol">
          <s-form-item>
            <s-form-label>Symbol</s-form-label>
            <s-form-control>
              <s-input v-bind="componentField" />
            </s-form-control>
            <s-form-description>
              The symbol of your proposal.
            </s-form-description>
            <s-form-message />
          </s-form-item>
        </s-form-field>
        <s-form-field v-slot="{ componentField }" name="supply">
          <s-form-item>
            <s-form-label>Supply</s-form-label>
            <s-form-control>
              <s-input v-bind="componentField" type="number" />
            </s-form-control>
            <s-form-description>
              The supply of your proposal.
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
        <s-form-field v-slot="{ componentField }" name="image">
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
        </s-form-field>
        <s-button class="w-full mt-2" type="submit">Submit</s-button>
      </form>
    </s-card-content>
  </s-card>
</template>

<script lang="ts" setup>
import { toTypedSchema } from "@vee-validate/zod";
import { useAccount, useWriteContract } from "@wagmi/vue";
import { useForm } from "vee-validate";
import { encodeFunctionData, type Address } from "viem";
import * as z from "zod";
import { useLogger } from "~/composables/logger";
import { config } from "~/plugins/1.wagmi";
import { patDAOContract } from "~/utils/contracts/PatDAOContract";
import { patGovernorContract } from "~/utils/contracts/PatGovernorContract";

const { logger } = useLogger();

const proposalSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, "Title is required"),
    symbol: z
      .string()
      .min(1, "Symbol is required")
      .toUpperCase()
      .max(5, "Symbol must be less than 5 characters"),
    supply: z.number().int().positive("Supply must be positive"),
    description: z.string().min(1, "Description is required"),
    image: z.instanceof(File, {
      message: "Image is required",
    }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: proposalSchema,
  initialValues: {
    title: "",
    description: "",
    symbol: "",
    supply: 0,
  },
});

const { writeContractAsync } = useWriteContract({ config });

const { address } = useAccount();
const onSubmit = handleSubmit(async (values) => {
  const fd = new FormData();
  fd.append("image", values.image as Blob);
  const _jsonPath = await $fetch("/api/proposal/image", {
    method: "POST",
    body: fd,
  });
  const _name = values.title;
  const _symbol = values.symbol;
  const _description = values.description;
  const _feeRecipient = address.value as Address;
  const _supply = BigInt(values.supply);

  const targets: Address[] = [patDAOContract.address];
  const targetValues: bigint[] = [0n];
  const callData = [
    encodeFunctionData({
      abi: patDAOContract.abi,
      functionName: "createCampaign",
      args: [_name, _symbol, _jsonPath, _feeRecipient, _supply],
    }),
  ];

  try {
    await writeContractAsync({
      ...patGovernorContract,
      functionName: "propose",
      args: [targets, targetValues, callData, _description],
    });
  } catch (e) {
    logger.error(e);
  }
});
</script>

<style></style>
