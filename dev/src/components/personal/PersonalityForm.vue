<script lang="ts">
  import {ref} from "vue";

  const FIELDS = [
    {fieldId: "last_name", label: "Фамилия"},
    {fieldId: "first_name", label: "Имя"},
    {fieldId: "middle_name", label: "Отчество"},
  ]

  const data = { 
    FIELDS,
    hasChanges: ref(false),
    user: {last_name: "Гетьман", first_name: "Михаил", middle_name: "Евгеньевич"},
    unchangedUser: {last_name: "Гетьман", first_name: "Михаил", middle_name: "Евгеньевич"} //only for test
  }


  export default {
    data() {
      return data
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
      hasChanges += Number(data.user[fieldId] != data.unchangedUser[fieldId])
    })

    return !!hasChanges;
  }


  
  function submit() {
    if(!data.hasChanges.value) return;
    alert("Сохранение данных")
  }


</script>



<template>
  <form id="personality-form">
    <h2>Личные данные</h2>

    <div class="field" v-for="field in FIELDS">
    
      <label>{{ field.label }}</label>
      
      <input 
        type="name"
        :placeholder="field.label"
        v-model="user[field.fieldId]"
        maxlength="100"
      />
    
    </div>

    <button 
      class="save"
      :class="{ disabled: !hasChanges }"
      @click.prevent="submit()">

      Сохранить личные данные
    </button>


  </form>
</template>

