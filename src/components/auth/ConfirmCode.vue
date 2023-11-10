<template>
  <form class="form-flex" @submit.prevent="sendCode">
    <p class="desc">{{ desc }}</p>
    <InputCode
      v-model="code"
      :isError="isError"
      :length="4"
      class="input-code"
    />

    <TryAgain :seconds="60" :active="true" @send="$emit('repeatSend')" />

    <div class="btns">
      <AppBtn class="btn_outline" @click.prevent="$emit('back')">Назад</AppBtn>
      <AppBtn type="submit">{{ textBtn }}</AppBtn>
    </div>
  </form>
</template>

<script>
import InputCode from "@/components/auth/InputCode";
import AppBtn from "@/components/app/AppBtn";
import TryAgain from "@/components/auth/TryAgain";

export default {
  components: { InputCode, AppBtn, TryAgain },
  emits: ["sendCode", "back", "repeatSend"],
  props: {
    typeConfirm: {
      type: String,
      default: "email",
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    isError: Boolean,
  },
  data: () => ({
    code: "",
  }),
  watch: {
    code(code) {
      if (code.length == 4) this.sendCode();
    },
  },
  computed: {
    desc() {
      switch (this.typeConfirm) {
        case "email":
          return "Мы отправили код на вашу почту";
        case "phone":
          return "Мы отправили код на ваш телефон";
        default:
          return "Мы отправили код";
      }
    },
    textBtn() {
      return this.loading ? "Загрузка..." : "Далее";
    },
  },
  methods: {
    sendCode() {
      this.$emit("sendCode", this.code);
    },
  },
};
</script>

<style lang="scss" scoped>
.form-flex {
  align-items: center;
}
.desc {
  text-align: center;
}
.input-code {
  max-width: 300px;
}
.btns {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;

  > * {
    width: 100%;
  }
}
</style>
