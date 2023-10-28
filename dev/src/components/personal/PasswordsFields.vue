<template>
  <InputField
    v-bind="$props"
    fieldId="password"
    type="password"
    :placeholder="inputsAreShowed ? 'Новый пароль' : 'Пароль был изменен 14.10.2023 в 19:24'"
    title= "Пароль"
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
      title= "Повтор пароля"
      :disabled="!inputsAreShowed"
    />

  </Transition>

</template>



<script lang="ts">
  
  import InputField from './InputField.vue';
  import {ref} from 'vue';


  const data = {
    inputsAreShowed: ref(false)
  }

  export default {

    data() {return data},

    props: ['user', 'onChange'],

    methods: {
      
      switchInputsShow() {
        let prev = data.inputsAreShowed.value;
        data.inputsAreShowed.value = !prev;

        if(data.inputsAreShowed.value == false) {
          this.$props.user.password = '';
          this.$props.user.repeatedPassword = '';
        }
      }

    },

    components: {
      InputField
    }
  }

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