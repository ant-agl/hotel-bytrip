<template>
  <div :class="className">
    <label>{{ $props.title }}</label>
    <div class="container">
      <div class="input-interactive">
        <input
          :type="inputType"
          :name="$props.fieldId"
          :placeholder="$props.placeholder"
          :value="$props.user[$props.fieldId]"
          :disabled="$props.disabled"
          @input="$props.onChange($event)"
        />
        <button
          v-if="$props.type == 'password' && $props.disabled == false"
          class="switch-watching"
          @click.prevent="switchPasswordInputType()"
        >
          <img :src="passwordIcon" />
        </button>
      </div>

      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "user",
    "onChange",
    "title",
    "placeholder",
    "fieldId",
    "type",
    "disabled",
  ],

  data() {
    return {
      inputType: this.$props.type,
      passwordIsShowed: false,
      className: `field ${this.$props.fieldId}-field`,
      passwordIcon: `/img/icon_${
        this.passwordIsShowed ? "hide_password" : "show_password"
      }.svg`,
    };
  },

  methods: {
    switchPasswordInputType() {
      this.passwordIsShowed = !this.passwordIsShowed;

      if (this.passwordIsShowed) {
        this.inputType = "text";
      } else {
        this.inputType = "password";
      }
    },
  },
};
</script>
