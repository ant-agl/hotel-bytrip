<template>
  <InputField
    v-bind="$props"
    fieldId="password"
    type="password"
    title="Пароль"
    :placeholder="placeholder"
    :disabled="!inputsAreShowed"
  >
    <template v-slot:button>
      <button class="action-button" @click.prevent="switchInputsShow()">
        {{ inputsAreShowed ? "Отмена" : "Изменить пароль" }}
      </button>
    </template>
  </InputField>

  <Transition name="passwords-fade">
    <InputField
      v-show="inputsAreShowed"
      v-bind="$props"
      fieldId="repeatedPassword"
      type="password"
      placeholder="Повторите Новый пароль"
      title="Повтор пароля"
      :disabled="!inputsAreShowed"
    />
  </Transition>
</template>

<script>
import InputField from "./InputField.vue";

export default {
  data: () => ({
    inputsAreShowed: false,
  }),

  props: ["user", "onChange"],

  methods: {
    switchInputsShow() {
      let prev = this.inputsAreShowed;
      this.inputsAreShowed = !prev;

      if (this.inputsAreShowed == false) {
        this.$props.user.password = "";
        this.$props.user.repeatedPassword = "";
      }
    },
  },

  computed: {
    placeholder() {
      return this.inputsAreShowed
        ? "Новый пароль"
        : "Пароль был изменен 14.10.2023 в 19:24";
    },
  },

  components: {
    InputField,
  },
};
</script>

<style scoped lang="scss">
.passwords-fade-enter-active,
.passwords-fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.passwords-fade-enter-from,
.passwords-fade-leave-to {
  opacity: 0;
}
</style>
