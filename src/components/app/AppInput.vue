<template>
  <div class="input-text__wrap">
    <h6 v-if="title" class="input-text__title">{{ title }}</h6>
    <div class="input-text">
      <input
        :type="currentType"
        :value="modelValue"
        class="input-text__input"
        :class="{ error: isError }"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
      />
      <button v-if="type == 'password'" class="eye" @click.prevent="changeType">
        <img
          v-if="currentType == 'password'"
          src="@/assets/img/icon_hide_password.svg"
        />
        <img
          v-if="currentType == 'text'"
          src="@/assets/img/icon_show_password.svg"
        />
      </button>
    </div>
    <div v-if="isError" class="input-text__error">{{ errorText }}</div>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  emit: ["update:modelValue"],
  props: {
    type: {
      type: String,
      default: "text",
    },
    placeholder: String,
    modelValue: [String, Number],
    isError: Boolean,
    errorText: String,
    disabled: Boolean,
    readonly: Boolean,
    title: String,
  },
  data: function () {
    return {
      currentType: this.type,
    };
  },
  methods: {
    changeType() {
      if (this.currentType == "password") this.currentType = "text";
      else this.currentType = "password";
    },
  },
};
</script>

<style lang="scss" scoped>
.input-text {
  position: relative;

  &__wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  &__title {
    font-size: 14px;
  }

  &__input {
    width: 100%;
    border: none;
    border-radius: 12px;
    background-color: var(--gray);
    padding: 18px 15px;
    font-size: 14px;
    position: relative;
    z-index: 1;

    &:focus {
      outline: none;
    }

    &[disabled] {
      opacity: 0.5;
    }

    &.error {
      background-color: var(--color-light-red);
    }
  }
}
.input-text__error {
  color: #ff4842;
  font-size: 12px;
  line-height: 18px;
}
.eye {
  position: absolute;
  right: 16px;
  top: 17px;
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 2;
}
</style>
