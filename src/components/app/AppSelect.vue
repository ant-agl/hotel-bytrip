<template>
  <div class="select-wrapper">
    <h6 v-if="title" class="title">{{ title }}</h6>
    <div class="select" :class="{ active: isActive }">
      <input type="hidden" :value="modelValue" />
      <div class="select__value" @mousedown="focusInput" ref="select">
        <input
          type="text"
          class="select__input"
          :placeholder="placeholder"
          v-model="input"
          ref="input"
          :readonly="!isSearch"
          @focus="isActive = true"
          @blur="isActive = false"
        />
        <div class="select__icon">
          <img src="@/assets/img/icons/arr-down.png" />
        </div>
      </div>

      <div class="select__list" ref="list">
        <TransitionGroup name="list">
          <div
            v-for="item in listView"
            :key="item.id"
            :data-id="item.id"
            class="select__item"
            @mousedown="selectItem"
          >
            {{ item.label }}
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    list: Array,
    placeholder: String,
    isSearch: Boolean,
    title: String,
  },
  data() {
    return {
      input: "",
      isActive: false,
    };
  },
  computed: {
    listView() {
      if (!this.isSearch) return this.list;

      let list = [];
      let val = this.input.toLowerCase();
      this.list.forEach((item) => {
        let label = item.label.toLowerCase();
        if (label.indexOf(val) !== -1) {
          list.push(item);
        }
      });
      return list;
    },
  },
  watch: {
    modelValue(id) {
      if (id == "") this.input = "";
      else this.input = this.list.find((i) => i.id == id).label;
    },
  },
  methods: {
    selectItem(e) {
      const id = e.target.getAttribute("data-id");
      const text = e.target.innerText;
      this.$emit("update:modelValue", id);
      this.input = text;
    },
    focusInput() {
      setTimeout(() => this.$refs.input.focus());
    },
    setWidthList() {
      const select = this.$refs.select;
      const list = this.$refs.list;
      list.style.width = select.clientWidth + "px";
    },
  },
  mounted() {
    if (this.modelValue != "")
      this.input = this.list.find((i) => i.id == this.modelValue).label;
  },
  updated() {
    this.setWidthList();
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;

  &-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  &__value {
    border-radius: 12px;
    background-color: var(--gray);
    padding: 18px 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
  }
  &__input {
    font-size: 14px;
    background-color: transparent;
    border: none;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
  &__icon {
    min-width: 20px;
    max-width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    opacity: 0.5;

    img {
      width: 20px;
    }
  }
  &__list {
    // position: absolute;
    // top: 100%;
    // left: 0;
    // right: 0;
    // width: 100%;
    position: fixed;
    transition: 0.2s;
    transform-origin: top center;
    transform: scaleY(0);
    opacity: 1;
    max-height: 230px;
    overflow-y: auto;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
    z-index: 10;
  }
  &__item {
    padding: 10px 15px;
    transition: 0.2s;
    cursor: pointer;
    background-color: #fff;
    font-size: 13px;

    &:not(:last-child) {
      border-bottom: 1px solid #eee;
    }

    &:hover {
      background-color: var(--light-blue);
    }
  }
  &.active &__icon {
    transform: rotate(180deg);
    opacity: 1;
  }
  &.active &__list {
    transform: scale(1);
    opacity: 1;
  }
}
.title {
  font-size: 14px;
}
</style>
