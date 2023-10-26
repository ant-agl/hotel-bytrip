<script lang="ts">

  export default {
    props: ['user']
  }
  
</script>


<template>
  <div class="field email-field">
    <label>Почта</label>
    
    <div class="container">
      <input 
        type="email"
        placeholder="Почта"
        v-model="$props.user.email"
      />

      <button class="action-button">Подтвердить</button>
    </div>
  </div>

</template>