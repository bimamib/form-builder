<template>
  <div>
    <label class="block mb-1 font-medium text-gray-700">{{
      field.label
    }}</label>

    <!-- Input Text -->
    <input
      v-if="field.type === 'textfield'"
      v-model="localValue"
      :placeholder="field.placeholder"
      type="text"
      class="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    />

    <!-- Input Textarea -->
    <textarea
      v-else-if="field.type === 'textarea'"
      v-model="localValue"
      :placeholder="field.placeholder"
      class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
    ></textarea>

    <!-- Input Radio (Horizontal Layout) -->
    <div v-else-if="field.type === 'radio'" class="space-x-4 flex items-center">
      <div
        v-for="(option, index) in field.options"
        :key="index"
        class="flex items-center"
      >
        <input
          type="radio"
          :name="field.label"
          :value="option.value"
          v-model="localValue"
          class="w-4 h-4 text-blue-600 form-radio"
        />
        <span class="ml-2">{{ option.label }}</span>
      </div>
    </div>

    <!-- Input Select (Autocomplete) -->
    <div v-else-if="field.type === 'autocomplete'" class="space-y-2">
      <select
        v-model="localValue"
        class="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:outline-blue-500 disabled:opacity-50 disabled:pointer-events-none"
      >
        <!-- Placeholder Option: Tampil Pertama Kali Sebelum Pilihan -->
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
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value); // Emit event binding dua arah
      },
    },
  },
};
</script>
