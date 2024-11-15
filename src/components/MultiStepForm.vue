<template>
  <div class="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-md form-builder">
    <h2 class="mb-2 text-2xl font-bold">{{ currentStepData.title }}</h2>
    <p class="mb-4 text-gray-600">{{ currentStepData.description }}</p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-for="(field, index) in currentStepData.fields" :key="index">
        <FieldRenderer :field="field" v-model="formData[field.label]" />
      </div>

      <div class="flex justify-between mt-6">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Next
        </button>
        <button
          v-if="currentStep === totalSteps"
          type="submit"
          class="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import formData from "../data/formData";
import FieldRenderer from "./FieldRenderer.vue";

export default {
  components: { FieldRenderer },
  data() {
    return {
      formData: {},
      currentStep: 1,
      formConfig: formData,
    };
  },
  computed: {
    currentStepData() {
      return this.formConfig.find((step) => step.step === this.currentStep);
    },
    totalSteps() {
      return this.formConfig.length;
    },
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    handleSubmit() {
      console.log("Submitted Data:", this.formData);
      alert("Form submitted successfully!");
    },
  },
};
</script>
