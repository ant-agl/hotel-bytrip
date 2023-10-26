<script setup lang="ts">
  import CustomSelect from '../CustomSelect.vue';
</script>



<script lang="ts">
  export default {
    data() {
      return {

        options: [
          ['none', 'Не выбрано'],
          ['phone', 'Номер телефона'],
          ['email', 'Адрес электронной почты']
        ]


      }
    }
  }

</script>



<template>

  <div class="field">

    <label>Двойная аутентификация</label>

    <CustomSelect 
      :options="$data.options"
      class="field"
    />


  </div>

</template>
