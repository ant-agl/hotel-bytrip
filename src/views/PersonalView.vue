<template>
  <main id="personal-view">
    <PersonalityForm />
    <SecurityForm />
  </main>
</template>

<script>
import PersonalityForm from "@/components/personal/PersonalityForm";
import SecurityForm from "@/components/personal/SecurityForm";

export default {
  components: {
    PersonalityForm,
    SecurityForm,
  },

  data() {
    return {
      exitModalIsShowed: false,
    };
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/vars.scss";

$input--height: 54px;
$container--gap: 2%;
$container_button--width: 27%;

%input {
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 400;
  border: 2px solid vars.$main--color;
  background: vars.$main--color;
  color: vars.$main_contrast--color;
  border-radius: 12px;
  transition: all 0.2s ease-out;
  height: 100%;

  &[disabled] {
    padding: 0;
    background: transparent;
    padding-left: 0;
    border-color: transparent;
  }

  &:focus {
    border: 2px solid vars.$highlight--color;
  }
}

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
      font-size: 0.9em;
      width: 100%;

      label {
        font-weight: 600;
      }

      .selected-field {
        @extend %input;
      }

      .container {
        display: flex;
        flex-wrap: nowrap;
        height: $input--height;
        width: 100%;
        gap: $container--gap;
        justify-content: space-between;

        .input-interactive {
          height: 100%;
          position: relative;
          width: inherit;

          input {
            @extend %input;
          }

          .switch-watching {
            width: 20px;
            aspect-ratio: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 20px;
            top: 0;
            height: $input--height;
            cursor: pointer;
            transition: 100ms ease all;

            &:hover {
              opacity: 0.6;
            }

            img {
              width: 100%;
              aspect-ratio: 1;
            }
          }
        }
      }
    }

    .action-button {
      width: $container_button--width;
      border: 2px solid vars.$highlight--color;
      color: vars.$highlight--color;
      font-size: 0.8em;
      font-weight: 500;

      text-transform: uppercase;
      transition: all 0.2s ease;
      cursor: pointer;
      user-select: none;
      letter-spacing: 0.05em;
      border-radius: 12px;

      &:hover {
        background: vars.$highlight_dark--color;
        border: 2px solid vars.$highlight_dark--color;
        color: vars.$highlight_contrast--color;
      }
    }

    .save {
      border-radius: 100px;
      font-size: 0.7em;
      padding: 10px 0;
      font-weight: 500;
      line-height: 22px;
      text-transform: uppercase;
      transition: 0.2s;
      cursor: pointer;
      letter-spacing: 0.05em;
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
