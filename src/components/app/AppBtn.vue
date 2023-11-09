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
  border: 1px solid vars.$highlight_dark--color;
  color: vars.$main--color;

  &:hover {
    background: vars.$highlight--color;
    border-color: vars.$highlight--color;
  }

  &[disabled] {
    background: vars.$main--color;
    border-color: vars.$main--color;
    color: darken(vars.$main--color, 20%);
    cursor: no-drop;
  }

  &_danger {
    background-color: #fff;
    color: var(--color-red);
    border-color: var(--color-red);

    &:hover {
      color: #fff;
      background-color: var(--color-red);
      border-color: var(--color-red);
    }
  }

  &_outline {
    background-color: #fff;
    color: var(--color-primary2);
    border-color: var(--color-primary2);

    &:hover {
      color: #fff;
      background-color: var(--color-primary2);
      border-color: var(--color-primary2);
    }
  }

  &_100 {
    width: 100%;
  }
}
</style>
