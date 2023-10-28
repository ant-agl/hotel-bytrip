<template>
  <form id="security-form">
    <h2>Безопасность</h2>

    <EmailField :user="user" :onChange="onChange"/>
    
    <InputField
      fieldId="phone"
      type="text"
      placeholder="Номер телефона"
      title= "Телефон"
      :user="user" 
      :onChange="onChange"
    />

    <PasswordsFields :user="user" :onChange="onChange"></PasswordsFields>

    <DoubleAuthField :user="user" :onChange="onChange"></DoubleAuthField>

    <button 
      class="save"
      :class="{ disabled: !hasChanges }"
      @click.prevent="submit()">

      Сохранить настройки безопасности
    </button>
  </form>

  <AppModal
    :showed="successModalIsShowed" 
    :title="`Данные сохранены`"
    @close="hideModal()">
  </AppModal>
</template>




<script lang="ts">
  import {ref} from "vue";
  import EmailField from "./EmailField.vue";
  import PasswordsFields from "./PasswordsFields.vue";
  import DoubleAuthField from "./DoubleAuthField.vue";
  import InputField from "./InputField.vue";
  import AppModal from "../app/AppModal.vue";

  const data = {
    hasChanges: ref(false),
    successModalIsShowed: ref(false),
    user: {email: "domain@example.com", phone: "+7928491237", password: '', repeatedPassword: '', doubleAuth: 'none'},
    unchangedUser: {email: "domain@example.com", phone: "+7928491237", password: '', repeatedPassword: '', doubleAuth: 'none'} //only for test
  }


  export default {
    data() {
      return data
    },

    components: {
    EmailField,
    PasswordsFields,
    DoubleAuthField,
    InputField,
    AppModal
},

    methods: {
      submit,

      onChange: function(event:any) {
        let {value, name: fieldId} = event.target;
        this.user[fieldId] = value;
        this.$forceUpdate()
      },

      hideModal() {
        this.successModalIsShowed = false
      }
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
    this.successModalIsShowed = true;
  }


</script>
