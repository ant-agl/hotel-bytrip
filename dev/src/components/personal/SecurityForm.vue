<script lang="ts">
  import {ref} from "vue";
  import EmailField from "./EmailField.vue";
  import PasswordField from "./PasswordField.vue";
  import DoubleAuthField from "./DoubleAuthField.vue";

  const data = {
    hasChanges: ref(false),
    user: {email: "domain@example.com", phone: "+7928491237", password: '', repeatedPassword: ''},
    unchangedUser: {email: "domain@example.com", phone: "+7928491237", password: '', repeatedPassword: ''} //only for test
  }


  export default {
    data() {
      return data
    },

    components: {
    EmailField,
    PasswordField,
    DoubleAuthField
},

    methods: {
      submit
    },

    updated() {
      data.hasChanges.value = checkChanges()
    }
  }


  function checkChanges() {
    let hasChanges = 0;

    Object.keys(data.unchangedUser).map( fieldId => {
      hasChanges +=  Number(data.user[fieldId] != data.unchangedUser[fieldId])
    })

    return !!hasChanges;
  }


  function submit() {
    if(!data.hasChanges.value) return;
    alert("Сохранение данных")
  }


</script>




<template>
  <form id="security-form">
    <h2>Безопасность</h2>

    <EmailField :user="user" />

    <div class="field phone-field">
    
      <label>Телефон</label>
      
      <input 
        type="text"
        placeholder="Номер телефона"
        v-model="user.phone"
      />
    
    </div>

    <PasswordField :user="user"/>

    <DoubleAuthField :user="user"></DoubleAuthField>

    <button 
      class="save"
      :class="{ disabled: !hasChanges }"
      @click.prevent="submit()">

      Сохранить настройки безопасности
    </button>


  </form>
</template>




<style lang="scss">
  @use "../../assets/styles/vars";

  $container--gap: 2%;
  $container_button--width: 20%;

  #security-form {
    .field {
      .container {
        display: flex;
        flex-wrap: nowrap;
        gap: $container--gap;
        
        input, .last-change-password-date {
          width: 100% - $container_button--width - $container--gap
        }

        .last-change-password-date {
          background: none;
          padding-left: 0;
          border: none;
        }
        
        button {
          width: $container_button--width;
          border: 2px solid vars.$highlight--color;
          color: vars.$highlight--color;
          font-size: .8em;
          font-weight: 500;
          text-transform: uppercase;
          transition: .2s;
          cursor: pointer;
          user-select: none;
          letter-spacing: .05em;
          border-radius: 12px;
        }
      }
    }
  }

</style>
