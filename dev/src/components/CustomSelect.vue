<script lang="ts">

  export default {

    data() {
      return {
        value: null,
        label: null,
        optionsIsShowed: false,
      }
    },

    mounted() {
      let defaultOptions = this.$props.options[0]
      this.value = defaultOptions[0]
      this.label = defaultOptions[1]
    },

    updated() {
      if(this.optionsIsShowed == false) return;
      this.fitPositions();

      window.addEventListener('resize', this.fitPositions);
    },

    unmounted() {
      window.removeEventListener('resize', this.fitPositions)
    },

    methods: {
      changeSelectedOption: function(option:any) {
        let [value, label] = option
        
        this.value = value;
        this.label = label;

        this.switchOptionsList();
      },

      switchOptionsList() {
        let newValue = !this.optionsIsShowed    
        this.optionsIsShowed = newValue
      },


      fitPositions() {
        let optionsList = this.$el.querySelector('.options-list');
        let selectedField = this.$el.querySelector(".selected-field");

        let selectedFieldCords = selectedField.getBoundingClientRect();
        let offsetYForList = selectedFieldCords.bottom + document.documentElement.scrollTop;

        optionsList.style.top = offsetYForList + "px";
        optionsList.style.width = selectedFieldCords.width + 'px'
      }


    },

    /**Format of options: [[value, label], [value, label]...] */
    props: ['class', 'options'],
  }


</script>



<template>
  <div class="custom-select" :class="$props.class">
  
    <div class="selected-field" @click="switchOptionsList()">
      {{ label }}

      <img 
        class="svg-icon"
        :src=" `/src/assets/img/${optionsIsShowed ? 'icon_close.svg' : 'icon_arrow_down.svg'} ` "  
      />


    </div>


    <div class="options-list" v-if="optionsIsShowed">

      <div v-for="option in $props.options" 
        class="option" :class="{selected: value == option[0]}"
        @click="changeSelectedOption(option)">

        {{ option[1] }}
      </div>

    </div>
  
  
  </div> 

</template>



<style scoped lang="scss">
  @use "../assets/styles/vars.scss";

  .custom-select {
    widows: 100%;
    cursor: pointer;
    user-select: none;
    
    .selected-field {
      position: relative;
      display: flex;
      align-items: center;

      .svg-icon {
        height: 20px;
        aspect-ratio: 1;
        position: relative;
        margin-left: auto;
      }
    }

    .options-list {
      position: absolute;
      border-radius: 10px;
      overflow: hidden;

      .option {
        padding: .8em;
        font-size: .9em;
        background: rgb(232, 232, 232);
        transition: 200ms ease all;
        cursor: pointer;

        &:not(.selected):hover {
          background: vars.$highlight_light--color;
        }

        &.selected {
          background: vars.$main_dark--color;
        }
      }
    }
  }
</style>