<template>
  <button type="button" class="btn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/vars.scss";
.btn {
  border-radius: 100px;
  font-size: 12px;
  padding: 7px 15px;
  font-weight: 500;
  line-height: 22px;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;
  letter-spacing: 0.05em;
  background: vars.$highlight_dark--color;
  border: 2px solid vars.$highlight_dark--color;
  color: vars.$main--color;

  &:hover {
    background: vars.$highlight--color;
    border: 2px solid vars.$highlight--color;
  }

  &[disabled] {
    background: vars.$main--color;
    border: 2px solid vars.$main--color;
    color: darken(vars.$main--color, 20%);
    cursor: no-drop;

    // &:hover {
    //   background: darken(vars.$main--color, 20%);
    //   border: 2px solid darken(vars.$main--color, 20%);
    //   color: darken(vars.$main--color, 40%);
    // }
  }
}
</style>
