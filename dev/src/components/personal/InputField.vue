<template>

  <div :class=" `field ${$props.fieldId}-field` ">
    
    <label>{{ $props.title }}</label>
    
    <div class="container">    
      
      <div class="input-interactive">
        <input 
          :type="inputType"
          :name="$props.fieldId"
          :placeholder="$props.placeholder"
          :value="$props.user[$props.fieldId]"
          @input="$props.onChange($event)"
          :disabled="$props.disabled"
        />
        
        <button v-if="$props.type == 'password' && $props.disabled == false"
          class="switch-watching"
          @click.prevent="switchPasswordInputType()">
          <img :src=" `src/assets/img/icon_${passwordIsShowed ? 'hide_password' : 'show_password'}.svg` "/>
        </button>
      </div>

      <slot name="button"></slot>
    
    </div>
  

  </div>

</template>



<script lang="ts">
  export default {
    props: ['user', 'onChange', 'title', 'placeholder', 'fieldId', "type", 'disabled'],

    data() {
      console.log(this.$props)

      return {
        inputType: this.$props.type,
        passwordIsShowed: false
      }
    },


    methods: {
      switchPasswordInputType() {

        this.passwordIsShowed = !this.passwordIsShowed

        if(this.passwordIsShowed)
          this.inputType = 'text'
        else
          this.inputType = 'password'
      }
    }
  }

</script>