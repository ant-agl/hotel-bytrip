<script lang="ts">

  const ITEMS = [ 
    {title: "Заезды и отъезды",       url: "/",             icon: "icon_arrivals_departures.svg"},
    {title: "Общая информация",       url: "/general_info", icon: "icon_general_info.svg"},
    {title: "Статистика",             url: "/statistics",   icon: "icon_statistics.svg"},
    {title: "Тарифы",                 url: "/tarifs",       icon: "icon_tarifs.svg"},
    {title: "Бронирование",           url: "/booking",      icon: "icon_booking.svg"},
    {title: "Удобства и услуги",      url: "/facilities",   icon: "icon_facilities.svg"},
    {title: "Редактирование номеров", url: "/editing",      icon: 'icon_editing.svg'},
    {title: "Сообщения",              url: "/chats",        icon: "icon_chats.svg"}
  ]

  const getIconSrc = function(filename:string) {
    return `/src/assets/img/${filename}`
  }

  export default {
    data() {
      return {
        ITEMS
      }
    },

    methods: {
      getIconSrc
    }
  }

</script>


<template>
  
  <nav id="app-navbar">
    <div class="nav-item" v-for="item in ITEMS">
      <div class="icon">
        <img :src="getIconSrc(item.icon)" alt=""/>
      </div>
      <div class="title">{{ item.title }}</div>
    </div>
  </nav>

</template>



<style scoped lang="scss">
  @use "../../assets/styles/vars.scss";

  #app-navbar {
    display: flex;
    flex-direction: column;
    width: 100%;
    user-select: none;

    .nav-item {
      display: flex;
      gap: .5rem;
      padding: 1rem;
      align-items: center;
      width: 100%;
      cursor: pointer;


      .icon {
        height: 100%;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          height: 100%;
          aspect-ratio: 1;
        }
      }


      .title {
        color: vars.$highlight--color;
      }
    }
  }

</style>