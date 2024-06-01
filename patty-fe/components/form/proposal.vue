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

        <s-form-field v-slot="{ componentField }" name="budget">
          <s-form-item>
            <s-form-label>Budget</s-form-label>
            <s-form-control>
              <s-input v-bind="componentField" type="number" />
            </s-form-control>
            <s-form-description>
              The budget of your proposal.
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
import { useForm } from "vee-validate";
import * as z from "zod";
import { useLogger } from "~/composables/logger";
// import { patDAOContract } from "~/utils/contracts/PatDAOContract";

const { logger } = useLogger();

const proposalSchema = toTypedSchema(
  z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    budget: z.number().int().positive("Budget must be positive"),
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
    budget: 0,
  },
});

// const { writeContractAsync } = useWriteContract({ config });

const onSubmit = handleSubmit(async (values) => {
  console.log("Form submitted!", values);
  const fd = new FormData();
  fd.append("image", values.image as Blob);
  const imageUrl = await $fetch("/api/proposal/image", {
    method: "POST",
    body: fd,
  });

  const newId = BigInt(`0x${crypto.randomUUID().split("-").join("")}`);
  const _title = values.title;
  const _description = values.description;
  const _budget = BigInt(values.budget * 10000) * BigInt(10n ** 14n);

  logger.log("Creating lesson", {
    newId,
    _title,
    _description,
    _budget,
    imageUrl,
  });

  // await writeContractAsync({
  //   ...patDAOContract,
  //   functionName: "createLesson",
  //   args: [newId, _title, _description, _budget, imageUrl],
  // });
});
</script>

<style></style>
