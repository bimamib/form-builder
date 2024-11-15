<template>
  <div class="form-builder max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <!-- Tab Navigation -->
    <div class="flex border-b border-gray-200 mb-4">
      <button
        v-for="(step, index) in formConfig"
        :key="index"
        @click="currentStep = step.step"
        :class="[
          'px-4 py-2 text-sm font-medium border-b-2',
          currentStep === step.step
            ? 'border-blue-500 text-blue-500'
            : 'border-transparent text-gray-500 hover:text-gray-700',
        ]"
      >
        {{ step.title }}
      </button>
    </div>

    <!-- Step Content -->
    <h2 class="text-2xl font-bold mb-2">{{ currentStepData.title }}</h2>
    <p class="text-gray-600 mb-4">{{ currentStepData.description }}</p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-for="(field, index) in currentStepData.fields" :key="index">
        <FieldRenderer :field="field" v-model="formData[field.label]" />
      </div>

      <!-- Buttons for Next/Previous -->
      <div class="flex justify-between mt-6">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Next
        </button>
        <button
          v-if="currentStep === totalSteps"
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import formData from "../data/formData"; // Pastikan data JSON ada di sini
import FieldRenderer from "./FieldRenderer.vue";

export default {
  components: {
    FieldRenderer,
  },
  data() {
    return {
      formData: {}, // Data untuk menyimpan input pengguna
      currentStep: 1, // Menyimpan langkah yang aktif
      formConfig: formData, // Konfigurasi langkah-langkah
    };
  },
  computed: {
    currentStepData() {
      return this.formConfig.find((step) => step.step === this.currentStep); // Ambil langkah yang aktif
    },
    totalSteps() {
      return this.formConfig.length; // Total langkah
    },
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++; // Pindah ke langkah berikutnya
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--; // Kembali ke langkah sebelumnya
      }
    },
    handleSubmit() {
      console.log("Submitted Data:", this.formData); // Kirim data form
      alert("Form submitted successfully!");
    },
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
