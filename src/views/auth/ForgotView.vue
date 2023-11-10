<template>
  <AuthContent title="Восстановление пароля">
    <form class="form-flex" @submit.prevent="sendForm">
      <AppInput
        v-model="login"
        v-mask="'+7 (###) ###-##-##'"
        placeholder="Номер телефона"
        title="Номер телефона"
      />
      <div class="btns">
        <AppBtn class="btn_outline" @click="$router.push('/login')">
          Назад
        </AppBtn>
        <AppBtn type="submit" :disabled="isDisabled">Далее</AppBtn>
      </div>
    </form>
  </AuthContent>
</template>

<script>
import AuthContent from "@/components/auth/AuthContent";
import AppInput from "@/components/app/AppInput";
import AppBtn from "@/components/app/AppBtn";

import { mask } from "vue-the-mask";

export default {
  components: { AuthContent, AppInput, AppBtn },
  directives: { mask },
  data: () => ({
    login: "",
  }),
  computed: {
    isDisabled() {
      return this.login.length != 18;
    },
  },
  methods: {
    sendForm() {
      console.log("send");
    },
  },
};
</script>

<style lang="scss" scoped>
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
