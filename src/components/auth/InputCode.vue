<template>
  <div class="code">
    <input type="hidden" ref="code" :value="modelValue" />
    <input
      type="text"
      v-for="n in length"
      :key="n"
      class="code__input"
      :class="{ error: isError }"
      @input="updateCode"
      @focus="setCursor"
      @keydown.delete="deleteCode"
    />
  </div>
</template>

<script>
export default {
  props: {
    length: Number,
    isError: Boolean,
    modelValue: String,
  },
  data: () => ({
    code: "",
  }),
  computed: {
    inputs: () => document.querySelectorAll(".code__input"),
  },
  watch: {
    code(code) {
      code = code.slice(0, this.length);
      this.inputs.forEach((input, i) => {
        input.value = code[i] || "";
      });
      this.setCursor();

      this.$refs.code.value = code;
      this.$emit("update:modelValue", code);
    },
    modelValue(val) {
      this.code = val;
    },
  },
  methods: {
    updateCode() {
      let code = "";
      this.inputs.forEach((input) => {
        let val = input.value.replace(/\D/g, "");
        input.value = val;
        code += val;
      });
      this.code = code;
    },
    deleteCode() {
      this.code = this.code.slice(0, -1);
    },
    setCursor() {
      let idx = this.code.length;
      if (this.code.length >= this.length) idx = this.length - 1;
      this.inputs[idx].focus();
    },
  },
};
</script>

<style scoped>
.code {
  display: flex;
  gap: 16px;
}
.code__input {
  width: 100%;
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  padding: 20px 14px;
  border-radius: 12px;
  border: 2px solid var(--color-tile);
  background-color: var(--color-tile);
}
.code__input:focus {
  border-color: var(--color-primary2);
}
.code__input.error {
  background-color: var(--color-light-red);
  border-color: var(--color-light-red);
  animation: error 0.2s linear both;
}
@keyframes error {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  50% {
    transform: translateX(4px);
  }
  75% {
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
}
@media (max-width: 500px) {
  .code {
    gap: 5px;
  }
}
</style>
