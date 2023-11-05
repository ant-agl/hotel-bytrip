<template>
  <form id="personality-form">
    <h2>Личные данные</h2>
    <InputField
      v-for="field in FIELDS"
      :key="field.fieldId"
      :fieldId="field.fieldId"
      :user="user"
      :onChange="onChange"
      :title="field.label"
      :placeholder="field.label"
      type="name"
    />

    <button
      class="save"
      :class="{ disabled: !hasChanges }"
      @click.prevent="submit()"
    >
      Сохранить личные данные
    </button>

    <AppModalVue
      :showed="successModalIsShowed"
      :title="`Данные сохранены`"
      @close="hideModal()"
    >
    </AppModalVue>
  </form>
</template>

<script>
import AppModalVue from "@/components/app/AppModal.vue";
import InputField from "./InputField.vue";

const FIELDS = [
  { fieldId: "last_name", label: "Фамилия" },
  { fieldId: "first_name", label: "Имя" },
  { fieldId: "middle_name", label: "Отчество" },
];

const USER = {
  last_name: "Гетьман",
  first_name: "Михаил",
  middle_name: "Евгеньевич",
};

export default {
  data() {
    return {
      FIELDS,
      successModalIsShowed: false,
      user: Object.assign({}, USER),
      unchangedUser: Object.assign({}, USER), //only for test
    };
  },

  methods: {
    submit() {
      if (!this.hasChanges) return;
      this.successModalIsShowed = true;
    },
    hideModal() {
      this.successModalIsShowed = false;
    },
    onChange: function (event) {
      let { value, name: fieldId } = event.target;
      this.user[fieldId] = value;
      this.$forceUpdate();
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

  components: { AppModalVue, InputField },
};
</script>
