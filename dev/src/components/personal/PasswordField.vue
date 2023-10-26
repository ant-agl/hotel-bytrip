<script lang="ts">
  import {ref} from 'vue';

  const data = {
    inputsAreShowed: ref(false)
  }

  export default {

    data() {return data},

    props: ['user'],

    methods: {
      switchInputsShow
    }
  }


  function switchInputsShow() {
    let prev = data.inputsAreShowed.value;
    data.inputsAreShowed.value = !prev;
  }

</script>



<template>
  <div class="field password-field">
    <label>Пароль</label>
    
    <div class="container">

      <input v-if="inputsAreShowed"
        type="password"
        placeholder="Новый пароль"
        v-model="$props.user.password"/>

      <div class="last-change-password-date" v-else>
        Пароль был изменен 14.10.2023 в 19:24
      </div>

      <button class="action-button" @click.prevent="switchInputsShow()">
        {{ inputsAreShowed ? "Отмена" : "Изменить пароль" }}
      </button>
    </div>
  </div>

  <div class="field repeated-password-field" v-if="inputsAreShowed">
    <label>Повтор пароля</label>
    
    <input
      type="password"
      placeholder="Повторите пароль"
      v-model="$props.user.repeatedPassword"
    />
  </div>

</template>