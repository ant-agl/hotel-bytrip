<template>
  <form id="security-form">
    <h2>Безопасность</h2>

    <EmailField :user="user" :onChange="onChange" />

    <InputField
      fieldId="phone"
      type="text"
      placeholder="Номер телефона"
      title="Телефон"
      v-mask="'+7 (###) ###-##-##'"
      :user="user"
      :onChange="onChange"
    />

    <PasswordsFields :user="user" :onChange="onChange" />

    <DoubleAuthField :user="user" :onChange="onChange" />

    <button
      class="save"
      :class="{ disabled: !hasChanges }"
      @click.prevent="submit()"
    >
      Сохранить настройки безопасности
    </button>
  </form>

  <AppModal
    :showed="successModalIsShowed"
    title="Данные сохранены"
    @close="hideModal()"
  >
  </AppModal>
</template>

<script>
import EmailField from "./EmailField.vue";
import PasswordsFields from "./PasswordsFields.vue";
import DoubleAuthField from "./DoubleAuthField.vue";
import InputField from "./InputField.vue";
import AppModal from "../app/AppModal.vue";

import { mask } from "vue-the-mask";

const USER = {
  email: "domain@example.com",
  phone: "+79284912374",
  password: "",
  repeatedPassword: "",
  doubleAuth: "none",
};

export default {
  directives: { mask },
  data() {
    return {
      successModalIsShowed: false,
      user: Object.assign({}, USER),
      unchangedUser: Object.assign({}, USER), //only for test
    };
  },

  components: {
    EmailField,
    PasswordsFields,
    DoubleAuthField,
    InputField,
    AppModal,
  },

  methods: {
    submit() {
      if (!this.hasChanges) return;
      this.successModalIsShowed = true;
    },

    onChange: function (event) {
      let { value, name: fieldId } = event.target;
      this.user[fieldId] = value;
      this.$forceUpdate();
    },

    hideModal() {
      this.successModalIsShowed = false;
    },
  },

  computed: {
    hasChanges() {
      let hasChanges = false;

      Object.keys(this.unchangedUser).forEach((fieldId) => {
        if (this.user[fieldId] != this.unchangedUser[fieldId])
          hasChanges = true;
      });

      return hasChanges;
    },
  },
};
</script>
