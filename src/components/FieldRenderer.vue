<template>
  <div>
    <label class="block mb-1 text-xs text-gray-700 font-large">
      {{ field.label }}
    </label>

    <!-- Input Text -->
    <input
      v-if="field.type === 'textfield'"
      v-model="localValue"
      :placeholder="field.placeholder"
      type="text"
      class="block w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    />

    <!-- Input Textarea -->
    <textarea
      v-else-if="field.type === 'textarea'"
      v-model="localValue"
      :placeholder="field.placeholder"
      class="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    ></textarea>

    <!-- Input Radio -->
    <div v-else-if="field.type === 'radio'" class="flex items-center space-x-4">
      <div
        v-for="(option, index) in field.options"
        :key="index"
        class="flex items-center"
      >
        <!-- Wrap the radio button in a label to make the text clickable -->
        <label
          :for="'radio-' + field.label + '-' + index"
          class="flex items-center cursor-pointer"
        >
          <input
            type="radio"
            :id="'radio-' + field.label + '-' + index"
            :name="field.label"
            :value="option.value"
            v-model="localValue"
            class="w-4 h-4 text-blue-600 form-radio"
          />
          <span class="ml-2">{{ option.label }}</span>
        </label>
      </div>
    </div>

    <!-- Input Select (Autocomplete) -->
    <div v-else-if="field.type === 'autocomplete'" class="space-y-2">
      <select
        v-model="localValue"
        class="block w-full px-4 py-2 text-sm border border-gray-200 rounded-lg pe-9 focus:outline-none focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      >
        <option value="" disabled class="text-gray-400">
          {{ field.placeholder }}
        </option>

        <!-- Pilihan Opsi Lain -->
        <option
          v-for="(option, index) in field.options"
          :key="index"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    field: {
      type: Object,
      required: true,
    },
    modelValue: [String, Number, Boolean], // Binding nilai dari parent
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue; // Mengambil nilai dari parent
      },
      set(value) {
        this.$emit("update:modelValue", value); // Emit event binding dua arah
      },
    },
  },
};
</script>
