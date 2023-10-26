<script lang="ts">
  import PersonalityForm from "../components/personal/PersonalityForm.vue";
  import SecurityForm from "../components/personal/SecurityForm.vue";
  
  export default {
    components: {
      PersonalityForm,
      SecurityForm,
    },

    data() {
      return {
        exitModalIsShowed: false
      }
    }
  }
</script>


<template>
  <main 
    id="personal-view"
    class="router-view">

    <PersonalityForm/>
    <SecurityForm/>
    
  </main>

</template>


<style lang="scss">
  @use "../assets/styles/vars.scss";

  #personal-view {
    display: flex;
    flex-direction: column;
    gap: vars.$app_content--gap;


    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;

      padding: 2.5rem;
      background: white;
      border-radius: 1em;
      align-self: start;

      .field {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        font-size: .9em;

        label {
          font-weight: 600;
        }

        input, .last-change-password-date, .selected-field {
          width: 100%;
          padding: 1rem;
          box-sizing: border-box;
          font-size: 15px;
          font-weight: 400;
          border: 2px solid vars.$main--color;
          background: vars.$main--color;
          color: vars.$main_contrast--color;
          border-radius: 12px;
          transition: all .2s ease-out;
          height: 54px;

          &:focus {
            border: 2px solid vars.$highlight--color;
          }
        }
      }

      .save {
        border-radius: 100px;
        font-size: .7em;
        padding: 10px 0;
        font-weight: 500;
        line-height: 22px;
        text-transform: uppercase;
        transition: .2s;
        cursor: pointer;
        letter-spacing: .05em;
        width: 100%;
        background: vars.$highlight_dark--color;
        border: 2px solid vars.$highlight_dark--color;
        color: vars.$main--color;


        &:hover {
          background: vars.$highlight--color;
          border: 2px solid vars.$highlight--color;
        }


        &.disabled {
          background: vars.$main--color;
          border: 2px solid vars.$main--color;
          color: darken(vars.$main--color, 20%);
          cursor: no-drop;

          &:hover {
            background: darken(vars.$main--color, 20%);
            border: 2px solid darken(vars.$main--color, 20%);
            color: darken(vars.$main--color, 40%);
          }
        }
      }

    }
  }

</style>