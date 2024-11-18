<template>
  <div class="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-md form-builder">
    <div class="flex mb-4 border-b border-gray-200">
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

    <h2 class="mb-2 text-2xl font-bold">{{ currentStepData.title }}</h2>
    <p class="mb-4 text-gray-600">{{ currentStepData.description }}</p>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div v-for="(field, index) in currentStepData.fields" :key="index">
        <FieldRenderer :field="field" v-model="formDataState[field.label]" />
      </div>

      <div class="flex justify-between mt-6">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="inline-flex items-center px-4 py-3 text-sm font-medium text-blue-800 bg-blue-100 border border-transparent rounded-lg gap-x-2 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Back
        </button>
        <button
          v-if="currentStep < totalSteps"
          @click="nextStep"
          class="inline-flex items-center px-4 py-3 text-sm font-medium text-blue-800 bg-blue-100 border border-transparent rounded-lg gap-x-2 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Next
        </button>
        <button
          v-if="currentStep === totalSteps"
          type="submit"
          class="inline-flex items-center px-4 py-3 text-sm font-medium text-green-800 bg-green-100 border border-transparent rounded-lg gap-x-2 hover:bg-green-200 focus:outline-none focus:bg-green-200 disabled:opacity-50 disabled:pointer-events-none"
        >
          Submit
        </button>
      </div>
    </form>

    <!-- Modal Alert -->
    <div
      v-if="formSubmitted"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50"
    >
      <div class="p-6 bg-white rounded-lg shadow-lg w-96">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800">
            Form Data Submitted
          </h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <p class="mt-2 text-gray-600">
          Berikut adalah data yang telah Anda masukkan:
        </p>
        <div class="mt-4">
          <ul class="space-y-2">
            <!-- Flexbox untuk label, titik dua, dan nilai sejajar -->
            <li class="flex text-gray-700">
              <span class="w-24 font-bold">Nama</span>
              <span class="ml-1">:</span>
              <span>{{ modalData.Name }}</span>
            </li>
            <li class="flex text-gray-700">
              <span class="w-24 font-bold">Gender</span>
              <span class="ml-1">:</span>
              <span>{{ modalData.Gender }}</span>
            </li>
            <li class="flex text-gray-700">
              <span class="w-24 font-bold">Description</span>
              <span class="ml-1">:</span>
              <span>{{ modalData.Description }}</span>
            </li>
            <li class="flex text-gray-700">
              <span class="w-24 font-bold">Title</span>
              <span class="ml-1">:</span>
              <span>{{ modalData.Title }}</span>
            </li>
          </ul>
        </div>
        <div class="mt-4">
          <button
            @click="closeModal"
            class="inline-flex items-center px-4 py-3 text-sm font-medium text-blue-800 bg-blue-100 border border-transparent rounded-lg gap-x-2 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import FieldRenderer from "./FieldRenderer.vue";
import formData from "../data/formData";

const formConfig = formData;
const formDataState = reactive({}); // Menyimpan data form yang diisi oleh pengguna
const currentStep = ref(1);
const formSubmitted = ref(false);

const currentStepData = computed(() =>
  formConfig.find((step) => step.step === currentStep.value)
);
const totalSteps = computed(() => formConfig.length);

// Modal data
const modalData = ref({});

function nextStep() {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

// Mengupdate formDataState ketika nilai input berubah
function handleSubmit() {
  // Simpan data yang diisi dalam modalData
  modalData.value = {
    Name: formDataState.Name || "Tidak diisi",
    Gender: formDataState.Gender || "Tidak diisi",
    Description: formDataState.Description || "Tidak diisi",
    Title: formDataState.Title || "Tidak diisi",
  };

  // Menampilkan data yang dimasukkan di konsol
  console.log("Submitted Data:", modalData.value);
  formSubmitted.value = true;
}

function closeModal() {
  formSubmitted.value = false;
}
</script>
