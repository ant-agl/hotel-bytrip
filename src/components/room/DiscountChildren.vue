<template>
  <form class="form">
    <label class="label">
      <span>Можно ли с детьми</span>
      <AppCheckbox
        :modelValue="isChild"
        @update:modelValue="$emit('updateIsChild', $event)"
      />
    </label>

    <transition name="show">
      <div v-if="isChild" class="discount">
        <div class="discount__list">
          <TransitionGroup name="list">
            <div
              v-for="(discount, i) in discounts"
              :key="i"
              class="discount__item"
            >
              <span>
                До
                <AppInput
                  type="number"
                  :modelValue="discounts[i].to"
                  @update:modelValue="
                    $emit('updateDiscount', { to: $event, index: i })
                  "
                  :min="discounts[i].from"
                  :max="17"
                  class="discount__input"
                />
                лет — скидка
                <AppInput
                  type="number"
                  :min="0"
                  :max="100"
                  :modelValue="discounts[i].value"
                  @update:modelValue="
                    $emit('updateDiscount', { value: $event, index: i })
                  "
                  class="discount__input"
                />
                %
              </span>
              <div class="discount__remove" @click="$emit('deleteDiscount', i)">
                <img src="@/assets/img/icons/cross.svg" />
              </div>
            </div>
          </TransitionGroup>
        </div>
        <button v-if="isAdd" class="link" @click.prevent="addDiscount">
          Добавить скидку для детей
        </button>
      </div>
    </transition>
  </form>
</template>

<script>
import AppCheckbox from "@/components/app/AppCheckbox";
import AppInput from "@/components/app/AppInput";

export default {
  components: { AppCheckbox, AppInput },
  emits: ["addDiscount", "updateDiscount", "deleteDiscount", "updateIsChild"],
  props: {
    discounts: Array,
    isChild: Boolean,
  },
  computed: {
    isAdd() {
      const lenDiscount = this.discounts.length;
      if (lenDiscount > 0 && this.discounts[lenDiscount - 1].to >= 17)
        return false;

      return true;
    },
  },
  methods: {
    addDiscount() {
      let to = 0;
      const lenDiscount = this.discounts.length;
      if (lenDiscount > 0) to = this.discounts[lenDiscount - 1].to;
      this.$emit("addDiscount", to + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-top: 20px;
}
.label {
  display: flex;
  align-items: center;
  gap: 10px;
}
.discount {
  width: 100%;

  &__list {
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.2s;
    padding: 10px;

    &:hover {
      background-color: var(--light-blue);
    }

    span {
      display: flex;
      align-items: center;
      gap: 10px;
      white-space: nowrap;
    }
  }
  &__input {
    width: 60px;

    :deep(input) {
      padding: 10px;
      text-align: center;
    }
  }
  &__remove {
    width: 25px;
    opacity: 0;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      opacity: 1 !important;
    }
  }
  &__item:hover &__remove {
    opacity: 0.5;
  }
}
</style>
