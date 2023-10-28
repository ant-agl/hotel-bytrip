<script lang="ts">
  import {ref} from "vue";
  import AppModalVue from "@/components/app/AppModal.vue";
  import InputField from "./InputField.vue";

  const FIELDS = [
    {fieldId: "last_name", label: "Фамилия"},
    {fieldId: "first_name", label: "Имя"},
    {fieldId: "middle_name", label: "Отчество"},
  ]

  const data = { 
    FIELDS,
    successModalIsShowed: ref(false),
    hasChanges: ref(false),
    user: {last_name: "Гетьман", first_name: "Михаил", middle_name: "Евгеньевич"},
    unchangedUser: {last_name: "Гетьман", first_name: "Михаил", middle_name: "Евгеньевич"} //only for test
  }


  export default {
    data() {
        return data;
    },
    methods: {
      submit,
        
      hideModal() {
        this.successModalIsShowed = false
      },


      onChange: function(event:any) {
        let {value, name: fieldId} = event.target; 
        this.user[fieldId] = value;
        this.$forceUpdate()
      }

    },
    updated() {
        data.hasChanges.value = checkChanges();
    },
    components: { AppModalVue, InputField }
}


  function checkChanges() {
    let hasChanges = 0;

    Object.keys(data.unchangedUser).map( fieldId => {
      hasChanges += Number(data.user[fieldId] != data.unchangedUser[fieldId])
    })

    return !!hasChanges;
  }


  
  function submit() {
    if(!data.hasChanges.value) return;
    data.successModalIsShowed.value = true;
  }


</script>



<template>
  <form id="personality-form">
    <h2>Личные данные</h2>
  
    <InputField v-for="field in FIELDS"
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
      @click.prevent="submit()">

      Сохранить личные данные
    </button>

    <AppModalVue
      :showed="successModalIsShowed"
      :title="`Данные сохранены`"
      @close="hideModal()">
    </AppModalVue>


  </form>
</template>

