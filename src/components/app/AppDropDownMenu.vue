<template>
  <Transition name="drop-down-menu-fade">
    <div id="app-drop-down-menu">
      <router-link to="/personal" class="open-profile">
        {{ $props.user.name }}
      </router-link>

      <a class="exit" @click="$props.showModal">Выйти</a>
    </div>
  </Transition>
</template>

<script>
export default {
  props: ["user", "showModal"],

  mounted() {
    this.fitPositions();
    window.addEventListener("resize", this.fitPositions);
  },

  unmounted() {
    window.removeEventListener("resize", this.fitPositions);
  },

  methods: {
    fitPositions() {
      let headerContainer = document.querySelector("#app-header .container");
      let headerContainerCors = headerContainer?.getBoundingClientRect();

      let offsetTop = headerContainerCors?.height;
      let offsetRight =
        document.documentElement.clientWidth -
        Number(headerContainerCors?.right);

      this.$el.style.top = Number(offsetTop) - 10 + "px";
      this.$el.style.right = offsetRight + 20 + "px";
    },
  },
};
</script>

<style lang="scss">
@use "@/assets/styles/vars.scss";

#app-drop-down-menu {
  position: absolute;
  background: white;
  box-shadow: 0 0 3px 1px #0000004d;
  width: 200px;
  border-radius: 10px;
  overflow: hidden;

  & > a {
    padding: 0.4em 1.3em;
    font-size: 0.8em;
    line-height: 1.4em;
    width: 100%;
    text-decoration: none;
    &:visited {
      color: inherit;
    }

    display: flex;
    gap: 0.5em;
    align-items: center;
    text-align: left;
    transition: 200ms ease all;
    height: 44px;
    cursor: pointer;

    &:hover {
      background: rgb(221, 221, 221);
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 30px;
        aspect-ratio: 1;
      }
    }
  }
}
</style>
