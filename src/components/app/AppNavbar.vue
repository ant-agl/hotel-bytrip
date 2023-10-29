<template>
  <nav id="app-navbar">
    <router-link
      :to="item.url"
      class="nav-item"
      v-for="item in ITEMS"
      :key="item.title"
    >
      <div class="icon">
        <img :src="getIconSrc(item.icon)" alt="" />
      </div>
      <div class="title">{{ item.title }}</div>
    </router-link>
  </nav>
</template>

<script>
const ITEMS = [
  { title: "Заезды и отъезды", url: "/", icon: "icon_arrivals_departures.svg" },
  {
    title: "Общая информация",
    url: "/general_info",
    icon: "icon_general_info.svg",
  },
  { title: "Статистика", url: "/statistics", icon: "icon_statistics.svg" },
  { title: "Тарифы", url: "/tarifs", icon: "icon_tarifs.svg" },
  { title: "Бронирование", url: "/booking", icon: "icon_booking.svg" },
  {
    title: "Удобства и услуги",
    url: "/facilities",
    icon: "icon_facilities.svg",
  },
  {
    title: "Редактирование номеров",
    url: "/editing",
    icon: "icon_editing.svg",
  },
  { title: "Сообщения", url: "/chats", icon: "icon_chats.svg" },
];

const getIconSrc = function (filename) {
  return `/img/${filename}`;
};

export default {
  data() {
    return {
      ITEMS,
    };
  },

  methods: {
    getIconSrc,
  },
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/vars.scss";

#app-navbar {
  display: flex;
  flex-direction: column;
  width: 100%;
  user-select: none;

  .nav-item {
    display: flex;
    gap: 0.5rem;
    padding: 1rem;
    align-items: center;
    width: 100%;
    cursor: pointer;
    text-decoration: none;

    &:visited {
      color: inherit;
    }

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

    &.router-link-active {
      border-radius: 20px;
      position: relative;
      cursor: default;

      &::after,
      &:before {
        content: "";
        position: absolute;
        display: block;
        border-radius: 20px;
        background-color: transparent;
        animation: border 0.3s ease forwards;
      }

      &:before {
        border-top: 1px solid #005382;
        border-left: 1px solid #005382;
        border-bottom: 1px solid transparent;
        border-right: 1px solid transparent;
        top: 0;
        left: 0;
      }

      &:after {
        border-bottom: 1px solid #005382;
        border-right: 1px solid #005382;
        border-top: 1px solid transparent;
        border-left: 1px solid transparent;
        bottom: 0;
        right: 0;
      }
    }
  }
}

@keyframes border {
  0% {
    width: 0;
    height: 0;
  }
  100% {
    width: 100%;
    height: 100%;
  }
}
</style>
