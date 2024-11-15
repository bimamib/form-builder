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
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Back
        </button>
        <button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Next
        </button>
        <button
          v-if="currentStep === totalSteps"
          type="submit"
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-100 text-green-800 hover:bg-green-200 focus:outline-none focus:bg-green-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Submit
        </button>
      </div>
    </form>

    <!-- Modal Alert -->
    <div
      v-if="formSubmitted"
      class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold text-gray-800">
            Form Submitted Successfully
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <p class="mt-2 text-gray-600">
          Your form data has been submitted successfully! We will get back to
          you shortly.
        </p>
        <div class="mt-4">
          <button
            @click="closeModal"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
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
      formSubmitted: false, // Flag untuk menampilkan modal
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
      this.formSubmitted = true; // Menandai bahwa form telah disubmit
    },
    closeModal() {
      this.formSubmitted = false; // Menutup modal
    },
  },
};
</script>

<style scoped>
/* Tambahkan styling jika diperlukan */
</style>
