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
              <s-input type="file" v-bind="componentField" />
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

const proposalSchema = toTypedSchema(
  z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    budget: z.number().int().positive(),
    image: z.instanceof(File).nullable(),
  })
);

const { handleSubmit } = useForm({
  validationSchema: proposalSchema,
  initialValues: {
    title: "",
    description: "",
    budget: 0,
    image: null,
  },
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<style></style>
