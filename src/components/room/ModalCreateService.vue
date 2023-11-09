<template>
  <AppModal :showed="isActive" title="Создать услугу" @close="close">
    <form class="form-flex">
      <AppInput v-model="category" placeholder="Категория" title="Категория" />
      <AppInput v-model="name" placeholder="Название" title="Название" />
    </form>

    <template v-slot:footer>
      <span v-if="isLoading">Загрузка...</span>
      <AppBtn @click="sendForm" :disabled="isDisabled || isLoading">
        Создать
      </AppBtn>
    </template>
  </AppModal>
</template>

<script>
import AppModal from "@/components/app/AppModal";
import AppBtn from "@/components/app/AppBtn";
import AppInput from "@/components/app/AppInput";

export default {
  components: { AppModal, AppBtn, AppInput },
  props: {
    isActive: Boolean,
  },
  data: () => ({
    category: "",
    name: "",
    isLoading: false,
  }),
  computed: {
    isDisabled() {
      return this.category == "" || this.name == "";
    },
  },
  methods: {
    sendForm() {
      console.log("modal send");
      const data = {
        category: this.category,
        name: this.name,
      };
      console.log(data);

      this.isLoading = true;
      this.$store
        .dispatch("addService", data)
        .then(() => {
          this.close();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    close() {
      this.category = "";
      this.name = "";
      this.$emit("close");
    },
  },
};
</script>
