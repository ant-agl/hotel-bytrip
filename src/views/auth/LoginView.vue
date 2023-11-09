<template>
  <Transition name="show" mode="out-in">
    <AuthContent
      v-if="!token"
      title="Авторизация в системе управления объектами размещения"
    >
      <form class="form-flex" @submit.prevent="sendForm">
        <AppInput
          v-model="login"
          placeholder="Логин"
          title="Номер телефона или почта"
          :isError="v$.login.$error"
          errorText="Неверный телефон или почта"
        />
        <AppInput
          v-model="password"
          type="password"
          placeholder="Пароль"
          title="Пароль"
          :isError="v$.password.$error"
          errorText="Пароль обязательный"
        />
        <router-link to="/forgot" class="link">Забыли пароль?</router-link>
        <AppBtn class="btn_100" type="submit">{{ textBtn }}</AppBtn>
      </form>
    </AuthContent>
    <AuthContent v-else title="Подтверждение почты">
      <ConfirmCode
        :loading="loading"
        :isError="confirmError"
        @sendCode="sendCode"
        @back="
          token = false;
          confirmError = false;
        "
      />
    </AuthContent>
  </Transition>
</template>

<script>
import AuthContent from "@/components/auth/AuthContent";
import AppInput from "@/components/app/AppInput";
import AppBtn from "@/components/app/AppBtn";
import ConfirmCode from "@/components/auth/ConfirmCode";

import { useVuelidate } from "@vuelidate/core";
import { required, email, or } from "@vuelidate/validators";

import api from "@/axios/api";

const phoneValidate = (value) => {
  const phone = value.replace(/\D/g, "");
  const isPhone = phone.length == 11 && (phone[0] == 7 || phone[0] == 8);
  return isPhone;
};

export default {
  components: { AuthContent, AppInput, AppBtn, ConfirmCode },
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    login: "",
    password: "",
    loading: false,
    token: false,
    confirmError: false,
    dataHah: {},
  }),
  computed: {
    textBtn() {
      return this.loading ? "Загрузка..." : "Войти";
    },
  },
  validations: {
    login: { required, loginValidate: or(email, phoneValidate) },
    password: { required },
  },
  methods: {
    async sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return false;
      }

      const data = {
        login: this.login,
        password: this.password,
      };
      console.log(data);

      this.loading = true;
      await this.$store
        .dispatch("login", data)
        .then((data) => {
          this.token = true;
          this.dataHah = data;
        })
        .catch(() => {
          alert("Ошика авторизации");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async sendCode(code) {
      const data = {
        code,
        ...this.dataHah,
      };
      console.log(data);

      this.loading = true;
      await this.$store
        .dispatch("confirmCode", data)
        .then((token) => {
          localStorage.token = token;
          api.defaults.headers["X-Auth"] = token;
          this.$router.push("/");
        })
        .catch(() => {
          this.confirmError = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
