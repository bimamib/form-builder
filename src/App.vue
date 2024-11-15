<template>
  <div
    id="app"
    class="flex items-center justify-center min-h-screen bg-gray-50"
  >
    <MultiStepForm />
  </div>
</template>

<script>
import MultiStepForm from "./components/MultiStepForm.vue";
import "./style.css";

export default {
  components: {
    MultiStepForm,
  },
};
</script>
